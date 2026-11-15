#!/usr/bin/env python3
"""Copy Maestro screenshots into men/<device>/ and write a file manifest."""
import os
import shutil
import sys
from pathlib import Path


def main():
    out = Path(sys.argv[1])
    debug = Path(sys.argv[2]) if len(sys.argv) > 2 else out / "maestro-debug"
    copied = []
    if debug.is_dir():
        for path in sorted(debug.rglob("*.png")):
            # Flatten Maestro's debug names. Keep the takeScreenshot stem.
            name = path.name
            target = out / name
            if path.resolve() == target.resolve():
                copied.append(name)
                continue
            if target.exists() and target.stat().st_size >= path.stat().st_size:
                continue
            shutil.copy2(path, target)
            copied.append(name)
    pngs = sorted(item.name for item in out.glob("*.png"))
    manifest = out / "screenshots.txt"
    manifest.write_text("\n".join(pngs) + ("\n" if pngs else ""), encoding="utf-8")
    print(f"screenshots={len(pngs)}")
    for name in pngs:
        print(f"  {name}")


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    main()
