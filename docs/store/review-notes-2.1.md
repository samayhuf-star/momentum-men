# App Review notes — Guideline 2.1

For Momentum – Men's Workout, version 1.0.0, build 3 (`app.json` `ios.buildNumber` is 3, `supportsTablet` is false). No login is required. Prices match `qa/MomentumMen.storekit` and `PRICING.md`.

## 1. What the app is

Momentum – Men's Workout is a training app for guided strength sessions on iPhone. Home opens on today's session. Each exercise has a timer or a rep counter and a short form cue. The download is free (US $0.00).

## 2. No account

No account and no login. The first screen has one button, Continue as Guest. There is no email field and no password. Progress is stored on the device only. It is not uploaded to a server of ours. On Home, the word Guest is the sign-out control. Tapping it returns to the guest screen. Guideline 5.1.1 account deletion does not apply, because there is no account.

## 3. How to move through the app

1. Launch the app.
2. Tap Continue as Guest.
3. Home shows Day N of 30 for the Beginner plan, the session length, the exercise count, and a Start button. Start opens the workout player. Beginner stays available without a purchase.
4. Scroll to Plans. Each card shows the day count, minutes, level, and equipment.
   - Beginner opens the workout player.
   - Intermediate and Advanced show a Pro badge. Tapping either one while Pro is inactive opens the paywall.
5. On the workout screen the header reads Exercise X of Y and the time left in the session. Timer and Reps switch the counter. Start and Pause run the timer. Previous goes back one exercise. Next moves forward. Finish on the last exercise saves the session on the device and returns to Home.
6. The Progress tab shows the streak ring, workout count, minutes, this week, and recent dates.
7. The Generator tab is the custom session builder. Pick a duration and a focus, then select exercises. The start button opens the paywall when Pro is inactive. With Pro active, it opens the same workout player.
8. About and Credits is a link under Plans. It is not required to use the app.

The app is not a hard paywall. Beginner, the workout player, and Progress work with no purchase.

## 4. Where the paywall and Restore are

Open the paywall from any of these:

- The Pro pill at the top of Home
- Intermediate or Advanced on the Plans list, when Pro is inactive
- The start button on the Generator tab, when Pro is inactive

Close is at the top of the paywall.

Restore purchases is on the paywall, under the three product buttons. It is not on Home, Progress, or the workout screen.

Terms, Privacy, and the Apple standard EULA are linked at the bottom of the paywall.

## 5. In-app purchases

Sold through Apple In-App Purchase (StoreKit 2). US prices:

- `com.samayvashsht.momentummen.monthly` — $2.99 a month, 7-day free trial for eligible new subscribers
- `com.samayvashsht.momentummen.yearly` — $19.99 a year, 7-day free trial for eligible new subscribers
- `com.samayvashsht.momentummen.lifetime` — $39.99 one-time, no trial, does not renew

The download is free. After the 7-day trial, the monthly or yearly subscription starts unless it is cancelled at least 24 hours before the trial ends. The price shown in the app is the App Store price for the reviewer's storefront. When the store reports an eligible trial, the subscription buttons say "7 days free, then <price>, cancel anytime". Lifetime does not use trial wording.

There is no other payment processor.

## 6. Services

Workout history stays on the device. Purchases are with Apple. Privacy, terms, and support open in the browser:

- Privacy: https://samayhuf-star.github.io/app-legal/momentum-men/privacy.html
- Terms: https://samayhuf-star.github.io/app-legal/momentum-men/terms.html
- Support: https://samayhuf-star.github.io/app-legal/momentum-men/support.html

This build does not read or write Apple Health.

## 7. Review access

Demo account: not required.

Contact: Samay Vashsht, samayhuf@gmail.com. Phone: [phone placeholder].
