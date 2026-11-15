#!/usr/bin/env bash
# Release simulator build with the JS bundle embedded in the .app.
# Discovers the Expo prebuild workspace. Does not call EAS.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
cd "$ROOT"
IOS="$ROOT/ios"
DERIVED="$ROOT/qa-out/derived"
mkdir -p "$ROOT/qa-out/logs" "$DERIVED"

WORKSPACE=$(find "$IOS" -maxdepth 1 -name '*.xcworkspace' -print | head -n 1)
PROJ=$(find "$IOS" -maxdepth 1 -name '*.xcodeproj' -type d -print | head -n 1)
if [ -z "${WORKSPACE:-}" ] || [ -z "${PROJ:-}" ]; then
  echo "expo prebuild did not produce an Xcode workspace" >&2
  find "$IOS" -maxdepth 2 -type d | head -50
  exit 1
fi
SCHEME=$(basename "$PROJ" .xcodeproj)
echo "workspace=$WORKSPACE"
echo "scheme=$SCHEME"

export NODE_BINARY="$(command -v node)"
export NODE_ENV=production
export RCT_NO_LAUNCH_PACKAGER=1
echo "NODE_BINARY=$NODE_BINARY"

xcodebuild \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration Release \
  -sdk iphonesimulator \
  -destination "generic/platform=iOS Simulator" \
  -derivedDataPath "$DERIVED" \
  CODE_SIGNING_ALLOWED=YES \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY=- \
  COMPILER_INDEX_STORE_ENABLE=NO \
  build | tee "$ROOT/qa-out/logs/xcodebuild-build.log"

APP=$(find "$DERIVED/Build/Products" -type d -path '*Release-iphonesimulator*' -name '*.app' ! -name '*Tests*' | head -n 1)
if [ -z "${APP:-}" ]; then
  echo "no Release simulator .app was produced" >&2
  find "$DERIVED/Build/Products" -name '*.app' -maxdepth 4
  exit 1
fi
echo "app=$APP"
echo "$APP" > "$ROOT/qa-out/app-path.txt"
echo "$SCHEME" > "$ROOT/qa-out/scheme.txt"
echo "$WORKSPACE" > "$ROOT/qa-out/workspace.txt"

BUNDLE=$(find "$APP" \( -name 'main.jsbundle' -o -name '*.hbc' \) -print)
if [ -z "$BUNDLE" ]; then
  echo "JS bundle is not inside $APP" >&2
  find "$APP" -type f | head -80
  exit 1
fi
echo "$BUNDLE" | tee "$ROOT/qa-out/logs/js-bundle.txt"
while IFS= read -r bundle; do
  ls -lh "$bundle" | tee -a "$ROOT/qa-out/logs/js-bundle.txt"
done <<< "$BUNDLE"
echo "embedded JS bundle ok"
