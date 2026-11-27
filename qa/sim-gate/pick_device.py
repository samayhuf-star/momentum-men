#!/usr/bin/env python3
"""Find or create one iPhone simulator. Prints its UDID on stdout."""
import json
import os
import subprocess
import sys


def simctl(*args, check=True):
    return subprocess.run(
        ["xcrun", "simctl", *args],
        check=check,
        capture_output=True,
        text=True,
    )


def runtimes():
    data = json.loads(simctl("list", "runtimes", "-j").stdout)
    ios = [
        runtime
        for runtime in data.get("runtimes", [])
        if runtime.get("isAvailable") and "iOS" in runtime.get("name", "")
    ]

    def version_key(runtime):
        parts = []
        for piece in str(runtime.get("version", "0")).split("."):
            parts.append(int(piece) if piece.isdigit() else piece)
        return parts

    ios.sort(key=version_key)
    return ios


def available_devices():
    data = json.loads(simctl("list", "devices", "available", "-j").stdout)
    found = []
    for runtime, group in data.get("devices", {}).items():
        if "iOS" not in runtime:
            continue
        for device in group:
            if device.get("isAvailable", True):
                found.append((runtime, device))
    return found


def ensure(name):
    matches = [(runtime, device) for runtime, device in available_devices() if device.get("name") == name]
    if matches:
        runtime, device = matches[-1]
        print(f"found {name} {device['udid']} runtime={runtime}", file=sys.stderr)
        return device["udid"]
    installed = runtimes()
    if not installed:
        print("no available iOS runtime", file=sys.stderr)
        return None
    runtime = installed[-1]
    types = json.loads(simctl("list", "devicetypes", "-j").stdout).get("devicetypes", [])
    match = next((item for item in types if item.get("name") == name), None)
    if not match:
        print(f"device type not installed: {name}", file=sys.stderr)
        return None
    created = simctl("create", name, match["identifier"], runtime["identifier"])
    udid = created.stdout.strip()
    print(f"created {name} {udid} on {runtime.get('name')}", file=sys.stderr)
    return udid


def dump_iphones():
    types = json.loads(simctl("list", "devicetypes", "-j").stdout).get("devicetypes", [])
    print("installed iPhone device types:", file=sys.stderr)
    for item in types:
        if "iPhone" in item.get("name", ""):
            print(f"  {item['name']}", file=sys.stderr)


def main():
    name = sys.argv[1]
    fallback = sys.argv[2] if len(sys.argv) > 2 else ""
    udid = ensure(name)
    used = name
    if not udid and fallback and fallback != name:
        udid = ensure(fallback)
        used = fallback
    if not udid:
        dump_iphones()
        raise SystemExit(f"could not find or create {name!r} (fallback {fallback!r})")
    record = os.environ.get("DEVICE_RECORD")
    if record:
        with open(record, "w", encoding="utf-8") as handle:
            handle.write(f"name={used}\nudid={udid}\nrequested={name}\n")
    github_env = os.environ.get("GITHUB_ENV")
    if github_env:
        with open(github_env, "a", encoding="utf-8") as handle:
            handle.write(f"UDID={udid}\nDEVICE_ACTUAL={used}\n")
    print(udid)


if __name__ == "__main__":
    main()
