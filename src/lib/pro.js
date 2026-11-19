export const BUNDLE_ID = 'com.samayvashsht.momentummen';

export const PRODUCT_IDS = {
  monthly: `${BUNDLE_ID}.monthly`,
  yearly: `${BUNDLE_ID}.yearly`,
  lifetime: `${BUNDLE_ID}.lifetime`,
};

// RevenueCat: entitlement and public iOS SDK key (public keys are safe to ship).
export const ENTITLEMENT_ID = 'premium';
export const RC_IOS_KEY =
  process.env.EXPO_PUBLIC_RC_IOS_KEY || 'appl_qzfcxHXVTbggESSWMHAtHPnicUf';

export const PRIVACY_URL = 'https://samayhuf-star.github.io/app-legal/momentum-men/privacy.html';
export const TERMS_URL = 'https://samayhuf-star.github.io/app-legal/momentum-men/terms.html';
export const APPLE_EULA_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export const FREE_FEATURES = [
  'Beginner 30-day plan',
  'Workout player with timer or reps',
  'Form cues on every exercise',
  'Streak and workout count on this device',
];

export const PRO_FEATURES = [
  'Intermediate and Advanced 30-day plans',
  'Custom workout generator',
];

export function planRequiresPro(planKey) {
  return planKey === 'intermediate' || planKey === 'advanced';
}
