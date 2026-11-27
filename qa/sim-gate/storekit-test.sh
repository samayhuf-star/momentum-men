#!/usr/bin/env bash
# Wire qa/MomentumMen.storekit into the shared scheme and run PaywallGate.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
cd "$ROOT"
UDID="${1:?udid}"
OUT="${2:?out dir}"
DERIVED="$ROOT/qa-out/derived"
STOREKIT="$ROOT/qa/MomentumMen.storekit"

if ! gem list -i xcodeproj >/dev/null 2>&1; then
  gem install xcodeproj --no-document || sudo gem install xcodeproj --no-document
fi
ruby qa/scripts/prepare-xcode-qa.rb | tee "$OUT/prepare-xcode.log"
ruby qa/sim-gate/add_paywall_test.rb | tee -a "$OUT/prepare-xcode.log"

WORKSPACE=$(head -n 1 "$ROOT/qa-out/workspace.txt")
SCHEME=$(head -n 1 "$ROOT/qa-out/scheme.txt")
RESOLVED=$(python3 - "$WORKSPACE" "$STOREKIT" <<'PY'
import os, sys
workspace, storekit = sys.argv[1], sys.argv[2]
proj = workspace[:-len(".xcworkspace")] + ".xcodeproj"
ident = "../../qa/MomentumMen.storekit"
resolved = os.path.normpath(os.path.join(proj, ident))
print(resolved)
if not os.path.isfile(resolved):
    raise SystemExit(f"scheme storekit path does not exist: {resolved}")
PY
)
echo "scheme storekit resolves to $RESOLVED"

export NODE_BINARY="$(command -v node)"
export NODE_ENV=production
export RCT_NO_LAUNCH_PACKAGER=1

xcodebuild build-for-testing \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration Release \
  -sdk iphonesimulator \
  -destination "platform=iOS Simulator,id=$UDID" \
  -derivedDataPath "$DERIVED" \
  CODE_SIGNING_ALLOWED=YES \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY=- \
  COMPILER_INDEX_STORE_ENABLE=NO \
  | tee "$ROOT/qa-out/logs/xcodebuild-test-build.log"

xcrun simctl uninstall "$UDID" com.samayvashsht.momentummen || true

TEST_RUNNER_SIM_QA_OUT="$OUT" \
TEST_RUNNER_STOREKIT_CONFIG="$STOREKIT" \
xcodebuild test-without-building \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration Release \
  -sdk iphonesimulator \
  -destination "platform=iOS Simulator,id=$UDID" \
  -derivedDataPath "$DERIVED" \
  -only-testing:MomentumMenQATests/PaywallGate/testPaywallWithStoreKit \
  CODE_SIGNING_ALLOWED=YES \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY=- \
  | tee "$ROOT/qa-out/logs/xcodebuild-test.log"
