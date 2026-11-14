# App Store screenshots (iPhone 6.9")

Listing art for Momentum – Men's Workout. These are not the simulator QA captures in `docs/sim-screenshots/` (that set includes the paywall). Do not upload permission, settings, or restore screens. The paywall is not in this folder.

## Build 3 capture is not in these files yet

The PNG files below are still the 14 Nov 2026 web renders of the build 2 screens. They do not show the build 3 tab icons, the formatted progress dates, or the new generator subtitle. Do not upload them as build 3 listing art.

`release/build3` teaches the simulator flow to boot a device whose framebuffer is 1290×2796 and to save `01-home.png`, `02-workout.png`, `03-exercise-detail.png`, `04-progress.png`, and `05-generator.png` from `XCUIScreen`. That job has to run on `AI-Samay/sim-qa-runner`. The token available for this session received HTTP 403 when it tried to dispatch the workflow, so these files were not replaced. When that run exists, replace the five PNGs with the artifact and change this README to say they are simulator captures.

Canvas size for every file: **1290 × 2796** (6.9" portrait).

| File | Screen | Caption | What it shows |
| --- | --- | --- | --- |
| `ios-6.9/01-home.png` | Home | Pick a plan and start | Beginner plan (free), Intermediate and Advanced marked Pro, Unlock Pro, About and Credits. Guest is signed in. |
| `ios-6.9/02-workout.png` | Workout player | Train with a timer | Exercise 1 of 6, Dumbbell Bench Press, timer at 00:40. Illustration is the Open Exercise Illustrations still `dumbbell-chest-press-start.webp` (CC0). |
| `ios-6.9/03-exercise-detail.png` | Same workout screen, next exercise, Reps mode | Form cue on every exercise | Exercise 2 of 6, Close Grip Pulldown, 12 reps. There is no separate exercise-detail route; the illustration, name, and cue are `ExerciseMedia` on the workout screen (`testID` `exercise-detail`). Illustration is `close-grip-lat-pulldown-start.webp` (CC0). |
| `ios-6.9/04-progress.png` | Progress | Saved on this device | Streak 3, workouts 3, week marks, and the three saved dates. Counts come from the on-device `progress` record the screen already reads. |
| `ios-6.9/05-generator.png` | Generator | Build your own session | Duration choices and the top of the exercise list. The in-app subtitle still says "Build your own core session" while the list includes chest moves. See the note below. |

## How they were made

Rendered on 14 Nov 2026 from the app source at `69df668` (the commit uploaded as TestFlight build 2). No app code was changed to take the shots.

iOS Simulator is not available on this Linux machine, and a new macOS Actions run was not started. The screens were bundled from the real `App.js` and screen components with [react-native-web](https://github.com/necolas/react-native-web) (the same web renderer Expo web uses). Expo CLI was not started. `expo-iap` was replaced with a stub that connects and returns no products, so the bundle can load. These five screens do not call StoreKit. Images are the files `require()`'d in `src/lib/exerciseMediaMap.js`, copied unchanged into the page.

Chrome headless drew the page at 430 × 932 CSS pixels with a device scale factor of 3, then the frame was saved. A 72px caption band sits above the app. The band is not part of the app. Safe-area insets were 0 because this Chrome build reports none, so the web shots do not show the status-bar clock or the home indicator. The earlier simulator captures in `docs/sim-screenshots/` do.

The Progress shot was taken after writing a `progress` value the real `ProgressContext` loads on launch: completed days `2026-11-11`, `2026-11-13`, and `2026-11-14`, streak 3, workouts 3. Those are the dates the screen prints. Empty progress would show "Complete a workout to start tracking."

## Pictures

Only licence-safe stills already in the repo are visible:

- Open Exercise Illustrations, CC0 1.0, pinned in `assets/exercise-media/LICENSE-SOURCES.md`. The two workout shots use the dumbbell chest press and close-grip lat pulldown stills from that set.
- No Everkinetic (CC BY-SA) stills are in these frames. No GIFs, stock photos, or generated images.

## Before these go to App Store Connect

- Tab icons are React Navigation's `MissingIcon` glyph (U+23F7). The app does not set `tabBarIcon`. The same glyph is on the simulator home capture from run 43585054476, so build 2 looks like this on device.
- `05-generator.png` is optional listing art. The screen is real. The subtitle "core session" does not match the mixed exercise list. Leave it out of the upload if that line should change first.
- `app.json` has `supportsTablet: true`. These files do not cover iPad. iPad shots, or a build with tablet support turned off, are still needed before submission.
