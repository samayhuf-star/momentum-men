# App Store listing draft — Momentum – Men's Workout

Draft for dev 1. Do not paste into App Store Connect from this file until Samay says the build 2 binary is the one to submit. Do not add outcome claims when pasting. Character counts are Unicode code points.

Checked 14 Nov 2026 against `app.json`, `src/lib/pro.js`, `src/screens/CreditsScreen.js`, `PRICING.md`, `IAP_SETUP.md`, and `qa/MomentumMen.storekit`.

## Identity

| Field | Value | Count | Limit |
| --- | --- | --- | --- |
| Name | Momentum – Men's Workout | 24 | 30 |
| Subtitle | Workouts with timer or reps | 27 | 30 |
| Category | Health & Fitness | | primary |
| Bundle ID | `com.samayvashsht.momentummen` | | |
| Version | 1.0.0 (TestFlight build 2) | | |

The name uses an en dash, the same character as `app.json`. Copyright line for the record: 2026 Samay Vashsht.

Secondary category was suggested earlier as Lifestyle. That is optional.

## Promo text

170 characters maximum. This draft is 159.

Short strength sessions with a timer or a rep counter, plus form cues and a simple plan. Start free, then go Pro for every plan and the custom session builder.

## Keywords

100 characters maximum. This draft is 68. Commas, no spaces.

workout,fitness,gym,training,exercise,strength,timer,reps,home,plans

## Description

Momentum – Men's Workout is a training app for short strength sessions on iPhone.

Pick a plan and train each exercise with a timer or a rep counter. A short form cue stays on the screen. Your streak and completed workouts stay on this device.

The download is free. A 7-day free trial is available on the monthly and yearly plans. Then Momentum Pro is:

- $2.99 a month
- $19.99 a year
- $39.99 lifetime

Lifetime is a one-time purchase and does not renew. After a trial, a subscription starts unless you cancel at least 24 hours before the trial ends. Cancel or manage a subscription in your Apple ID settings. Prices in the app are the App Store price for your storefront.

## URLs

Checked with HTTP GET on 14 Nov 2026. Each returned 200 and an HTML page for this app.

| Use | URL | Result |
| --- | --- | --- |
| Privacy | https://samayhuf-star.github.io/app-legal/momentum-men/privacy.html | 200, 3356 bytes |
| Support | https://samayhuf-star.github.io/app-legal/momentum-men/support.html | 200, 3586 bytes |
| Terms (also linked in the app) | https://samayhuf-star.github.io/app-legal/momentum-men/terms.html | 200, 4300 bytes |

Privacy and support are the URLs to put on the version. The same three addresses are in `src/lib/pro.js` (privacy, terms) and `src/screens/CreditsScreen.js` (privacy, terms, support).

## Pricing check (no code change)

Requested price: free download, 7-day free trial, then $2.99 a month, $19.99 a year, or $39.99 lifetime.

| Product ID | Kind | Price in repo | Trial in repo |
| --- | --- | --- | --- |
| `com.samayvashsht.momentummen.monthly` | auto-renewable subscription | $2.99 (`qa/MomentumMen.storekit` `displayPrice` `2.99`, period P1M) | 7 days (`introductoryOffer` paymentMode `free`, period P1W) |
| `com.samayvashsht.momentummen.yearly` | auto-renewable subscription | $19.99 (displayPrice `19.99`, period P1Y) | 7 days (same intro shape) |
| `com.samayvashsht.momentummen.lifetime` | non-consumable | $39.99 (displayPrice `39.99`) | none |

`src/lib/pro.js` builds those three IDs from `com.samayvashsht.momentummen` plus `.monthly`, `.yearly`, and `.lifetime`. `PRICING.md` and `IAP_SETUP.md` use the same IDs and the same US prices. The paywall does not hardcode a dollar amount. It shows the store `displayPrice`. Trial text is shown only when the store reports an eligible trial. Lifetime copy has no trial.

The simulator paywall captured in `docs/sim-screenshots/03-paywall.png` (sim-qa run 43585054476, commit `69df668`) shows "$19.99/year", "$2.99/month", and "$39.99" with trial lines only on the two subscriptions.

No product-id or price mismatch found in the repo. App Store Connect itself was not opened.

One copy detail, not a price mismatch: `ctaText` in `src/lib/introOffer.js` says the words "7 days free" whenever any trial length is eligible. `planLine` uses the length the store returns. The StoreKit file's intro is 7 days, so both lines match today.
