#!/usr/bin/env bash
# Boot one simulator, install the Release .app, run the Maestro tour from a
# fresh install, then run the StoreKit paywall UI test against the same build.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
cd "$ROOT"
SLUG="${DEVICE_SLUG:?set DEVICE_SLUG}"
NAME="${DEVICE_NAME:?set DEVICE_NAME}"
FALLBACK="${DEVICE_FALLBACK:-}"
OUT="$ROOT/qa-out/men/$SLUG"
mkdir -p "$OUT" "$ROOT/qa-out/logs"

export DEVICE_RECORD="$OUT/device.txt"
UDID=$(python3 qa/sim-gate/pick_device.py "$NAME" "$FALLBACK")
echo "udid=$UDID" | tee -a "$OUT/device.txt"

APP=$(cat "$ROOT/qa-out/app-path.txt")
BUNDLE_ID=com.samayvashsht.momentummen
STOREKIT="$ROOT/qa/MomentumMen.storekit"
test -d "$APP"
test -f "$STOREKIT"

echo "==> Boot $UDID"
xcrun simctl shutdown all || true
xcrun simctl boot "$UDID" || true
xcrun simctl bootstatus "$UDID" -b
xcrun simctl status_bar "$UDID" override \
  --time "9:41" \
  --batteryState charged \
  --batteryLevel 100 || true

echo "==> Permissions in the built Info.plist"
plutil -p "$APP/Info.plist" | grep -E 'UsageDescription|Privacy|NS[A-Z]' > "$OUT/permissions.txt" || true
if [ ! -s "$OUT/permissions.txt" ]; then
  echo "No usage-description or privacy purpose strings in the simulator app." > "$OUT/permissions.txt"
fi
cat "$OUT/permissions.txt"

echo "==> Fresh install"
xcrun simctl uninstall "$UDID" "$BUNDLE_ID" || true
xcrun simctl install "$UDID" "$APP"
python3 qa/sim-gate/inject_storekit.py "$UDID" "$STOREKIT" "$BUNDLE_ID" | tee "$OUT/storekit-inject.log"

echo "==> Maestro"
export PATH="$PATH:$HOME/.maestro/bin"
MAESTRO_RC=0
set +e
maestro --device "$UDID" test \
  --debug-output "$OUT/maestro-debug" \
  --flatten-debug-output \
  --format JUNIT \
  --output "$OUT/junit.xml" \
  "$ROOT/qa/sim-gate/momentum.yaml" \
  | tee "$OUT/maestro.log"
MAESTRO_RC=${PIPESTATUS[0]}
set -e
echo "maestro_exit=$MAESTRO_RC" | tee "$OUT/maestro-exit.txt"
if [ "$MAESTRO_RC" -ne 0 ]; then
  xcrun simctl io "$UDID" screenshot "$OUT/99-maestro-failure.png" || true
fi
python3 qa/sim-gate/collect_shots.py "$OUT" "$OUT/maestro-debug"

echo "==> StoreKit paywall test (same Release app, qa/MomentumMen.storekit)"
STOREKIT_RC=0
set +e
bash qa/sim-gate/storekit-test.sh "$UDID" "$OUT" | tee "$OUT/storekit-xcodebuild.log"
STOREKIT_RC=${PIPESTATUS[0]}
set -e
echo "storekit_exit=$STOREKIT_RC" | tee "$OUT/storekit-exit.txt"
python3 qa/sim-gate/collect_shots.py "$OUT" "$OUT/maestro-debug"

{
  echo "# sim-qa-gate $SLUG"
  echo
  echo "device: $(grep '^name=' "$OUT/device.txt" | head -n 1 || true)"
  echo "udid: $UDID"
  echo "maestro_exit: $MAESTRO_RC"
  echo "storekit_exit: $STOREKIT_RC"
  echo
  echo "## screenshots"
  echo
  if [ -f "$OUT/screenshots.txt" ]; then
    sed 's/^/- /' "$OUT/screenshots.txt"
  fi
} > "$OUT/summary.md"

# The tour itself is the gate. A StoreKit harness failure is recorded above
# and still uploads its screenshots.
exit "$MAESTRO_RC"
