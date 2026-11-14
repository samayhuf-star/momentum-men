#!/usr/bin/env bash
# Momentum flow for .github/workflows/sim-qa.yml.
# Env from the workflow: UDID, BUNDLE_ID, SCHEME, WORKSPACE, DERIVED_DATA, OUT.
# Picks a simulator whose framebuffer is 1290x2796, installs the app, then runs
# MomentumMenQATests: guest, home, workout, reps exercise, progress, generator,
# paywall and Restore. Listing shots are the five main screens only.
set -euo pipefail
: "${UDID:?}" "${BUNDLE_ID:?}" "${SCHEME:?}" "${WORKSPACE:?}" "${DERIVED_DATA:?}" "${OUT:?}"
mkdir -p "$OUT"

echo "==> Choose a 1290x2796 simulator"
PICKED=$(python3 qa/sim-qa/pick-device.py "$UDID" "$OUT")
echo "simulator udid: $PICKED"
export UDID="$PICKED"
if [ -n "${GITHUB_ENV:-}" ]; then
  echo "UDID=$PICKED" >> "$GITHUB_ENV"
fi

echo "==> Install"
APP=$(find "$DERIVED_DATA/Build/Products" -maxdepth 2 -name "$SCHEME.app" -path '*Release-iphonesimulator*' | head -n1)
echo "app: $APP"
xcrun simctl install "$UDID" "$APP"

echo "==> XCUITest flow"
mkdir -p /tmp/momentum-sk
cp qa/MomentumMen.storekit /tmp/momentum-sk/MomentumMen.storekit
set +e
TEST_RUNNER_SIM_QA_OUT="$OUT" TEST_RUNNER_STOREKIT_CONFIG="/tmp/momentum-sk/MomentumMen.storekit" \
xcodebuild test-without-building -workspace "$WORKSPACE" -scheme "$SCHEME" -configuration Release \
  -destination "platform=iOS Simulator,id=$UDID" -derivedDataPath "$DERIVED_DATA" \
  -resultBundlePath "$OUT/flow.xcresult" -only-testing:MomentumMenQATests/SimQATests/testMomentumFlow \
  > "$OUT/xcodebuild-test.log" 2>&1
RC=$?
set -e
tail -n 80 "$OUT/xcodebuild-test.log"
grep "\[momentum-qa\]" "$OUT/xcodebuild-test.log" || true

mkdir -p "$OUT/attachments"
xcrun xcresulttool export attachments --path "$OUT/flow.xcresult" --output-path "$OUT/attachments" >/dev/null 2>&1 || true

python3 - "$OUT" "$RC" <<'PY'
import json, os, struct, sys
out, rc = sys.argv[1], int(sys.argv[2])
p = os.path.join(out, "results.json")
steps = json.load(open(p)).get("steps", []) if os.path.exists(p) else []
lines = ["# Momentum iOS Simulator QA", "", f"xcodebuild test exit: {rc}", "", "| Step | Result | Detail |", "| --- | --- | --- |"]
for s in steps:
    lines.append(f"| {s['step']}. {s['name']} | {'PASS' if s['pass'] else 'FAIL'} | {str(s['detail']).replace('|', '/')} |")
if not steps:
    lines.append("| none | FAIL | results.json missing |")

wanted = [
    "01-home.png",
    "02-workout.png",
    "03-exercise-detail.png",
    "04-progress.png",
    "05-generator.png",
]
shot_ok = True
lines += ["", "| Screenshot | Pixels |", "| --- | --- |"]
for name in wanted:
    path = os.path.join(out, name)
    if not os.path.exists(path):
        lines.append(f"| {name} | MISSING |")
        shot_ok = False
        continue
    data = open(path, "rb").read(32)
    w, h = struct.unpack(">II", data[16:24])
    ok = (w, h) == (1290, 2796)
    lines.append(f"| {name} | {w}x{h} {'OK' if ok else 'WRONG'} |")
    if not ok:
        shot_ok = False

open(os.path.join(out, "summary.md"), "w").write("\n".join(lines) + "\n")
print("\n".join(lines))
failed = [s for s in steps if not s.get("pass")]
if not steps or failed or rc != 0 or not shot_ok:
    raise SystemExit(rc if rc else 1)
PY
exit $?
