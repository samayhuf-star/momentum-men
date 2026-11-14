# App Store listing draft — Momentum – Men's Workout

Draft for the publisher. Do not paste into App Store Connect from this file until the build 3 binary is the one in review. Do not add outcome claims when pasting. Character counts are Unicode code points.

Checked against `app.json` on `main` (`ios.buildNumber` 3, `supportsTablet` false), `src/lib/pro.js`, `src/screens/HomeScreen.js`, `src/screens/PaywallScreen.js`, `PRICING.md`, and `qa/MomentumMen.storekit`.

## Identity

| Field | Value | Count | Limit |
| --- | --- | --- | --- |
| Name | Momentum – Men's Workout | 24 | 30 |
| Subtitle | Workouts with timer or reps | 27 | 30 |
| Category | Health & Fitness | | primary |
| Bundle ID | `com.samayvashsht.momentummen` | | |
| Version | 1.0.0 (build 3 in `app.json`) | | |

The name uses an en dash, the same character as `app.json`. Copyright: 2026 Samay Vashsht.

Secondary category, optional: Lifestyle.

## Promo text

170 characters maximum. This draft is 128.

Open today's session in one tap. Train with a timer or a rep counter, follow a 30-day plan, or build your own. Free to download.

## Keywords

100 characters maximum. This draft is 68. Commas, no spaces.

workout,fitness,gym,training,exercise,strength,timer,reps,home,plans

## Description

Momentum – Men's Workout is a training app for short strength sessions on iPhone.

Home opens on today's session. Tap Start for the free Beginner plan, or pick Intermediate or Advanced from the plan list. Each exercise has a timer or a rep counter and a short form cue. Your streak and completed workouts stay on this device. The Generator lets you choose a duration and the exercises you want.

The download is free. A 7-day free trial is available on the monthly and yearly plans. Then Momentum Pro is:

- $2.99 a month
- $19.99 a year
- $39.99 lifetime

Lifetime is a one-time purchase and does not renew. After a trial, a subscription starts unless you cancel at least 24 hours before the trial ends. Cancel or manage a subscription in your Apple ID settings. Prices in the app are the App Store price for your storefront.

## URLs

Support and privacy were checked with HTTP GET on 14 Nov 2026. Both returned 200. There is no separate marketing page that returns 200. Use the support page if a marketing URL is required.

| Use | URL | Result |
| --- | --- | --- |
| Privacy | https://samayhuf-star.github.io/app-legal/momentum-men/privacy.html | 200 |
| Support | https://samayhuf-star.github.io/app-legal/momentum-men/support.html | 200 |
| Marketing | https://samayhuf-star.github.io/app-legal/momentum-men/support.html | 200, same page as support |
| Terms | https://samayhuf-star.github.io/app-legal/momentum-men/terms.html | 200 |

## Pricing check

Free download, 7-day free trial, then $2.99 a month, $19.99 a year, or $39.99 lifetime.

| Product ID | Kind | Price in repo | Trial in repo |
| --- | --- | --- | --- |
| `com.samayvashsht.momentummen.monthly` | auto-renewable subscription | $2.99 | 7 days |
| `com.samayvashsht.momentummen.yearly` | auto-renewable subscription | $19.99 | 7 days |
| `com.samayvashsht.momentummen.lifetime` | non-consumable | $39.99 | none |

No product-id or price mismatch in the repo. The paywall shows the store's price. It does not hardcode a dollar amount. The paywall review images use these US prices so the three options are visible.

## Screenshots

See `screenshots/README.md`. Store sets are `screenshots/ios-6.9/` and `screenshots/ios-6.5/`. Paywall review images are `screenshots/iap-review/`.
