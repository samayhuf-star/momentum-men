# In-App Purchase Setup

Purchases run through RevenueCat (`react-native-purchases` and `react-native-purchases-ui`) on top of Apple In-App Purchase.

## Product IDs (App Store Connect)
- `com.samayvashsht.momentummen.weekly` — $2.99/week, 7-day free trial for eligible new subscribers
- `com.samayvashsht.momentummen.monthly` — $5.99/month, 7-day free trial for eligible new subscribers
- `com.samayvashsht.momentummen.yearly` — $29.99/year, 7-day free trial for eligible new subscribers
- `com.samayvashsht.momentummen.lifetime` — $39.99 one-time non-consumable, no trial

## RevenueCat
- Entitlement: `premium`. All four products must be attached to it.
- Offering: `default`, marked current, with the four products as packages and a published paywall.
- Public iOS SDK key is in `src/lib/pro.js` (`RC_IOS_KEY`), or `EXPO_PUBLIC_RC_IOS_KEY` at build time.

## In the app
- `src/lib/purchases.js` configures RevenueCat, reads the `premium` entitlement, restores purchases and opens Customer Center.
- `src/screens/PaywallScreen.js` shows RevenueCat's hosted paywall (price, period, trial, Restore, Terms, Privacy).
- Goal, level and days per week are sent to RevenueCat as subscriber attributes. Height, weight and age range stay on the device.
