#!/usr/bin/env python3
"""Best-effort copy of MomentumMen.storekit into the booted simulator.

Maestro launches with simctl. simctl does not read an Xcode scheme's StoreKit
configuration, so this looks for storekitd's on-disk config and copies the
repo file there. The paywall XCTest is the path that actually loads the file
through SKTestSession.
"""
import os
import shutil
import subprocess
import sys
from pathlib import Path


def main():
    udid, storekit, bundle = sys.argv[1], Path(sys.argv[2]), sys.argv[3]
    if not storekit.is_file():
        raise SystemExit(f"missing storekit file: {storekit}")
    data = Path.home() / "Library/Developer/CoreSimulator/Devices" / udid / "data"
    print(f"storekit={storekit}")
    print(f"device data={data} exists={data.is_dir()}")
    if not data.is_dir():
        return
    try:
        found = subprocess.run(
            [
                "find",
                str(data),
                "-maxdepth",
                "7",
                "(",
                "-name",
                "storeSystem.db",
                "-o",
                "-name",
                "Octane",
                "-o",
                "-iname",
                "*storekit*",
                ")",
                "-print",
            ],
            check=False,
            capture_output=True,
            text=True,
            timeout=25,
        )
    except subprocess.TimeoutExpired:
        print("find timed out; skipping file injection")
        return
    paths = [line for line in found.stdout.splitlines() if line.strip()]
    print(f"matches={len(paths)}")
    for line in paths[:40]:
        print(f"  {line}")
    targets = []
    for line in paths:
        path = Path(line)
        if path.name == "storeSystem.db":
            octane = path.parent / "Octane" / bundle
            targets.append(octane / "Configuration.storekit")
        elif path.is_dir() and path.name == "Octane":
            targets.append(path / bundle / "Configuration.storekit")
        elif path.is_dir():
            targets.append(path / "Configuration.storekit")
    if not targets:
        fallback = data / "Library" / "StoreKit" / bundle
        targets.append(fallback / "Configuration.storekit")
        targets.append(fallback / storekit.name)
    written = 0
    for target in targets:
        try:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(storekit, target)
            print(f"copied {target}")
            written += 1
        except OSError as error:
            print(f"skip {target}: {error}")
    print(f"copied_count={written}")


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    main()
