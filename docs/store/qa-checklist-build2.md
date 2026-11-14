# QA checklist — Momentum Men, TestFlight build 2

Date: 14 Nov 2026.

Scope: docs and assets only. No EAS cloud build, no App Store Connect write, no submit, no merge, no new GitHub Actions run.

## Where the checklist comes from

`docs/launch-archive` on `main` (commits `00e6557` through `a414c8c`) is the plan `momentum-plan-2026-11-14.md` and the review-notes draft. It does not contain a separate numbered checklist or the screenshot binaries the commit message describes. The items below are the men's release checks in that plan (code gaps, legal URLs, sim QA flow) plus the steps in `qa/MomentumMenQATests/SimQATests.swift` and `qa/sim-qa/flow.sh`.

App source on this branch matches `69df668`, which is the commit the local iOS upload built as **CFBundleVersion 2** (sim-qa-runner run [43585194337](https://github.com/AI-Samay/sim-qa-runner/actions/runs/43585194337), `macos-latest`, upload succeeded, log line `build: 2`). Later commits on `store-assets` are docs only. `app.json` in git still says `"buildNumber": "1"` because that workflow's override is committed only on the runner.

This session could not start an iOS Simulator (Linux). Checks that ran here used the repo's syntax script and a react-native-web render of the real screens (see `screenshots/README.md`). StoreKit purchase and restore completion still need a device or simulator. An earlier simulator run on this same source already passed its scripted flow; that evidence is cited where it is used, and it was not re-run.

## Release items

| Item | Result | Evidence |
| --- | --- | --- |
| Third-party GIFs removed; stills are the licensed map | PASS | No `assets/gifs/` files. `assets/exercise-media/LICENSE-SOURCES.md` maps stills to Open Exercise Illustrations (CC0) and Everkinetic (CC BY-SA 4.0). `src/lib/exerciseMediaMap.js` uses static `require()`s. Hidden exercises are omitted by `visibleExercises`. |
| CoreForge strings gone from the app | PASS | No `CoreForge` match under `src/`, `App.js`, `app.json`, `README.md`, or `STORE_LISTING.md`. Home logo is "Momentum". |
| Guest only, no account, no email login | PASS | `src/screens/AuthScreen.js` has Continue as Guest and the line "No account is required." Web render showed that button and, after the tap, Home with "Guest · Sign out". |
| HealthKit removed | PASS | `app.json` plugins are `expo-iap` and `expo-splash-screen` only. No `react-native-health`, no `healthSync` file, no Health usage string. |
| Soft paywall, not a hard gate | PASS | `planRequiresPro` is only `intermediate` and `advanced`. Beginner calls `navigation.navigate('Workout')`. Generator calls the paywall only when `isPro` is false. Home and the workout player rendered without a purchase. |
| expo-iap products, Restore, terms, privacy, trial rules | PASS for the binary under test. Completing a buy or a restore was not re-run. | Code: `src/lib/purchases.js`, `src/screens/PaywallScreen.js` (`testID` `restore`, `buy-${kind}`, Terms, Privacy, Apple EULA). `introOffer.js` adds trial text only when `trialDays > 0`, and lifetime never takes that branch. Simulator capture `docs/sim-screenshots/03-paywall.png` from run [43585054476](https://github.com/AI-Samay/sim-qa-runner/actions/runs/43585054476) (commit `69df668`, workflow success) shows Close, Yearly $19.99 with "7 days free", Monthly $2.99 with "7 days free", Lifetime $39.99 with "one-time, no subscription", and Restore purchases. **Needs a device or simulator** to tap through a sandbox purchase and a restore. This session did not open the paywall in the web render, because listing shots must not show Restore, and the web stub does not load StoreKit. |
| Product IDs and US prices match the locked price | PASS | See the table in `listing-draft.md`. IDs `com.samayvashsht.momentummen.monthly` / `.yearly` / `.lifetime`. StoreKit file: 2.99, 19.99, 39.99. Intro offer P1W on monthly and yearly only. No mismatch to change. App Store Connect was not read. |
| Legal pages live | PASS | GET on 14 Nov 2026: privacy, terms, and support under `https://samayhuf-star.github.io/app-legal/momentum-men/` each returned HTTP 200. |
| Encryption flag, Expo owner, project id, store profile, lockfile, gitignore | PASS | `ITSAppUsesNonExemptEncryption` false. `owner` `krosz`. EAS project `1b924162-652d-4c7b-975f-de90836a4106`. `eas.json` production iOS `distribution` `store`, `ascAppId` `6834676114`. `package-lock.json` and `.gitignore` are present. |
| `ios.buildNumber` in git vs the uploaded binary | PASS for build 2, with a follow-up | Uploaded IPA from `69df668` is build 2 (log `build: 2`). The file in git is still `"1"`. The next archive from this tree, without the runner override, would try to upload build 1 again. **Needs Samay or dev 1** before any new binary. Not changed here. |
| Icon 1024, RGB, no alpha | PASS | `assets/icon.png` is 1024×1024, PNG color type 2 (truecolor, no alpha). Splash is 1284×1913, color type 2. |
| No ellipsis character and no medical or outcome claim in UI strings | PASS | No U+2026 in `src/`. `...` hits are spread syntax, not copy. No diagnosis, treatment, or weight-loss wording in `src/`. "Consistency beats perfection" on Progress is the only slogan; it is not a result claim. |
| Syntax check (`npm run lint` / `typecheck`) | PASS | `node qa/scripts/syntax-check.mjs` with `@babel/parser`: `syntax ok (19 files)`. There is no Jest script and no `tsc` script in `package.json`. |
| iPad / `supportsTablet` | NEEDS A DECISION | `app.json` `supportsTablet` is `true`. The plan said to turn it off for v1 or supply an iPad screenshot set. It is still true. These 6.9" shots do not cover iPad. |

## Simulator flow from `SimQATests`

The scripted flow is guest, home, start, workout, exercise detail, paywall, restore, yearly product. Run 43585054476 completed with success on `69df668`, and `flow.sh` exits non-zero if any step fails or `results.json` is missing. This session did not download a fresh `results.json`. The archived simulator PNGs and the web render agree with the steps that do not need StoreKit.

| Step | Result | Evidence |
| --- | --- | --- |
| Guest | PASS | Web: tapped `continue-as-guest`, Home appeared. Same control is in `AuthScreen.js`. |
| Home | PASS | Web shot `01-home.png`. Simulator shot `docs/sim-screenshots/01-home.png` shows the same plans and Unlock Pro. |
| Start workout | PASS | Web: `start-workout` opened the player at 1/6, Dumbbell Bench Press. |
| Exercise detail | PASS | Web shot `03-exercise-detail.png` shows `testID` `exercise-detail` with the CC0 close-grip pulldown still, the cue, and the rep counter. |
| Paywall opens and lists store prices | PASS on the 14 Nov simulator run. Not re-run here. | `03-paywall.png` as cited above. **Needs a device** if review must see the live App Store price rather than the StoreKit file. |
| Restore control | PASS that the control is on the paywall. Restore success was not executed. | Button visible on the simulator paywall shot and `testID="restore"` in `PaywallScreen.js`. **Needs a device or simulator** to confirm a successful restore. |
| Yearly product loaded | PASS on the 14 Nov simulator run. | The yearly card rendered with $19.99, so `buy-yearly` was on screen. The test only asserts that element exists. |
| Progress | PASS | Web shot `04-progress.png` is `ProgressScreen` after a `progress` record was stored the way the app stores it. The tab is not in the XCUITest. **Needs a device** if you want the post-FINISH alert path checked again. The web render did not tap FINISH, because that path raises `Alert.alert`. |

## What this session ran

- Syntax check, above.
- Web render of Home, workout, exercise detail, Progress, and Generator, saved at 1290×2796 except the Generator note in `screenshots/README.md` (the Generator file is included).
- HTTP checks of the three legal URLs.
- Read-only lookup of GitHub Actions. No workflow was dispatched.

## GitHub Actions macOS runners

`samayhuf-star/momentum-men` has no `.github/workflows` and the Actions API reports `total_count` 0. There is no billing-lock message on this repo, because nothing has run here.

iOS builds and simulator QA for this app run on `AI-Samay/sim-qa-runner`, label `macos-latest`. Recent momentum-men jobs, not triggered by this session:

| Run | Workflow | Commit | Result |
| --- | --- | --- | --- |
| [43585194337](https://github.com/AI-Samay/sim-qa-runner/actions/runs/43585194337) | iOS Local Build, upload=true | `69df668` | success, runner started, IPA build 2 uploaded |
| [43585054476](https://github.com/AI-Samay/sim-qa-runner/actions/runs/43585054476) | iOS Simulator QA | `69df668` | success, runner started |
| [43562512427](https://github.com/AI-Samay/sim-qa-runner/actions/runs/43562512427) | iOS Local Build, upload=true | `0319b80` | success. Build-number override step was skipped. |
| [43562503515](https://github.com/AI-Samay/sim-qa-runner/actions/runs/43562503515) | iOS Simulator QA | `0319b80` | failure in "Run flow", after the runner was acquired |
| [43559414704](https://github.com/AI-Samay/sim-qa-runner/actions/runs/43559414704) | iOS Simulator QA | `main` (that day) | failure in "Build Release simulator app", after the runner was acquired |

No job in that history failed with a billing-lock or "payments have failed" start error. The runners are accepting `macos-latest` work. Failures that exist are build or test failures, and the latest momentum-men sim QA and upload succeeded.

## Not a submission blocker, still worth a look

- Tab bar icons are the navigation placeholder glyph, on device and in the new shots.
- Progress dates render as `YYYY-MM-DD`.
- Generator subtitle says "core session" while the list is the full visible library.
- Active Timer/Reps label style is white (`#fff`) on `#a3e635`. Primary buttons such as Unlock Pro use black text on the same green.
