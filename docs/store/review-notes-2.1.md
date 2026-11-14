# App Review notes — Guideline 2.1

Draft for Momentum – Men's Workout, version 1.0.0, TestFlight build 2. Paste only if that binary is the one in review. No login is required. Prices below match `qa/MomentumMen.storekit` and `PRICING.md`.

## 1. What the app is

Momentum – Men's Workout is a training app for guided strength sessions on iPhone. Each exercise has a timer or a rep counter and a short form cue. The download is free (US $0.00).

## 2. No account

No account and no login. The first screen has one button, Continue as Guest. There is no email field and no password. Progress is stored on the device only (AsyncStorage). It is not uploaded to a server of ours. Home shows "Guest · Sign out". Sign out returns to the guest screen. Guideline 5.1.1 account deletion does not apply, because there is no account.

## 3. How to move through the app

1. Launch the app.
2. Tap Continue as Guest.
3. Home lists three plans.
   - Beginner 30-Day opens the workout player. It stays available without a purchase.
   - Intermediate 30-Day and Advanced 30-Day are labeled Pro. Tapping either one while Pro is inactive opens the paywall.
4. On the workout screen, the exercise name, form cue, and illustration are on that same screen. Timer and Reps switch the counter. START and PAUSE run the timer. NEXT goes to the next exercise. FINISH on the last exercise saves the session on the device and returns to Home.
5. The Progress tab shows the day streak, workout count, this week, and recent dates from that on-device record.
6. The Generator tab is the custom session builder. Start Custom Workout opens the paywall when Pro is inactive. With Pro active, it opens the same workout player with the chosen exercises.
7. About and Credits is a link on Home. It is not required to use the app. It lists illustration credits and the privacy, terms, and support links.

The app is not a hard paywall. Beginner, the workout player, and Progress work with no purchase.

## 4. Where the paywall and Restore are

Open the paywall from any of these:

- Unlock Pro on Home
- Intermediate 30-Day or Advanced 30-Day on Home, when Pro is inactive
- Start Custom Workout on the Generator tab, when Pro is inactive

Close is at the top of the paywall.

Restore purchases is on the paywall, under the three product buttons. It is not on Home, Progress, or the workout screen.

Terms, Privacy, and the Apple standard EULA are linked at the bottom of the paywall.

## 5. In-app purchases

Sold through Apple In-App Purchase (StoreKit 2 via expo-iap). US prices:

- `com.samayvashsht.momentummen.monthly` — $2.99 a month, 7-day free trial for eligible new subscribers
- `com.samayvashsht.momentummen.yearly` — $19.99 a year, 7-day free trial for eligible new subscribers
- `com.samayvashsht.momentummen.lifetime` — $39.99 one-time, no trial, does not renew

The download is free. After the 7-day trial, the monthly or yearly subscription starts unless it is cancelled at least 24 hours before the trial ends. The price shown in the app is the App Store price for the reviewer's storefront. When the store reports an eligible trial, the subscription buttons say "7 days free, then <price>, cancel anytime". Lifetime does not use trial wording. It says the price is one-time and does not renew.

There is no other payment processor.

## 6. Services

Workout history stays on the device. Purchases are with Apple. Privacy and terms open in the browser:

- Privacy: https://samayhuf-star.github.io/app-legal/momentum-men/privacy.html
- Terms: https://samayhuf-star.github.io/app-legal/momentum-men/terms.html
- Support: https://samayhuf-star.github.io/app-legal/momentum-men/support.html

This build does not read or write Apple Health. There is no analytics SDK in the project.

## 7. Review access

Demo account: not required.

Contact: Samay Vashsht, samayhuf@gmail.com.
