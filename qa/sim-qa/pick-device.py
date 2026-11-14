#!/usr/bin/env python3
"""Boot an iPhone simulator whose screenshot is exactly 1290x2796.

Prints the chosen UDID on stdout. Prefers device types that are 430x932
points at 3x (iPhone 14/15 Pro Max and the Plus models of that size).
"""
import json
import struct
import subprocess
import sys
from pathlib import Path

PREFERRED = [
    "iPhone 15 Pro Max",
    "iPhone 14 Pro Max",
    "iPhone 16 Plus",
    "iPhone 15 Plus",
    "iPhone 14 Plus",
    "iPhone 13 Pro Max",
]


def simctl(*args, check=True):
    return subprocess.run(["xcrun", "simctl", *args], check=check, capture_output=True, text=True)


def load_json(args):
    return json.loads(simctl(*args).stdout)


def png_size(path):
    data = Path(path).read_bytes()[:32]
    return struct.unpack(">II", data[16:24])


def latest_runtime():
    runtimes = load_json("list", "runtimes", "-j").get("runtimes", [])
    ios = [r for r in runtimes if r.get("isAvailable") and "iOS" in r.get("name", "")]
    if not ios:
        raise SystemExit("no available iOS runtime")
    ios.sort(key=lambda r: r.get("version", ""))
    return ios[-1]


def ensure_device(name, runtime):
    devices = load_json("list", "devices", "available", "-j")["devices"]
    for group in devices.values():
        for device in group:
            if device.get("name") == name and device.get("isAvailable", True):
                return device["udid"]
    types = load_json("list", "devicetypes", "-j").get("devicetypes", [])
    match = next((t for t in types if t.get("name") == name), None)
    if not match:
        return None
    created = simctl("create", f"momentum-{name}", match["identifier"], runtime["identifier"])
    return created.stdout.strip()


def boot(udid):
    simctl("boot", udid, check=False)
    subprocess.run(["xcrun", "simctl", "bootstatus", udid, "-b"], check=True)
    simctl(
        "status_bar",
        udid,
        "override",
        "--time",
        "9:41",
        "--batteryState",
        "charged",
        "--batteryLevel",
        "100",
        check=False,
    )


def probe(udid, out):
    path = Path(out) / f"probe-{udid}.png"
    simctl("io", udid, "screenshot", str(path))
    return png_size(path)


def main():
    fallback = sys.argv[1]
    out = sys.argv[2]
    Path(out).mkdir(parents=True, exist_ok=True)
    runtime = latest_runtime()
    print(f"runtime: {runtime.get('name')}", file=sys.stderr)
    chosen = None
    for name in PREFERRED:
        udid = ensure_device(name, runtime)
        if not udid:
            print(f"missing device type: {name}", file=sys.stderr)
            continue
        boot(udid)
        width, height = probe(udid, out)
        print(f"probed {name} {udid} {width}x{height}", file=sys.stderr)
        if (width, height) == (1290, 2796):
            chosen = udid
            break
    if not chosen:
        print(f"no simulator produced 1290x2796 (workflow device was {fallback})", file=sys.stderr)
        raise SystemExit(1)
    print(chosen)


if __name__ == "__main__":
    main()
