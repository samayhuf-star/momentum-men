# In-App Purchase Setup

Purchases use Apple StoreKit 2 through `expo-iap`. Do not add RevenueCat or `react-native-purchases`.

## Product IDs (App Store Connect)
- `com.samayvashsht.momentummen.monthly` — $2.99/month, 7-day free trial for eligible new subscribers
- `com.samayvashsht.momentummen.yearly` — $19.99/year, 7-day free trial for eligible new subscribers
- `com.samayvashsht.momentummen.lifetime` — $39.99 one-time non-consumable, no trial

## In the app
- `src/lib/purchases.js` loads store prices, checks intro-offer eligibility, and restores purchases.
- The paywall shows "7 days free, then &lt;store price&gt;/period, cancel anytime" only when the store reports an eligible trial. Lifetime never shows trial text.
- Simulator testing uses `qa/MomentumMen.storekit` (wired by `qa/sim-qa/prepare.sh`).
