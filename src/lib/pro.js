export const BUNDLE_ID = 'com.samayvashsht.momentummen';

export const PRODUCT_IDS = {
  monthly: `${BUNDLE_ID}.monthly`,
  yearly: `${BUNDLE_ID}.yearly`,
  lifetime: `${BUNDLE_ID}.lifetime`,
};

export const PRODUCT_CATALOG = [
  { id: PRODUCT_IDS.yearly, kind: 'yearly', type: 'subs', label: 'Yearly', period: 'year' },
  { id: PRODUCT_IDS.monthly, kind: 'monthly', type: 'subs', label: 'Monthly', period: 'month' },
  { id: PRODUCT_IDS.lifetime, kind: 'lifetime', type: 'in-app', label: 'Lifetime', period: null },
];

export const SUB_PRODUCT_IDS = [PRODUCT_IDS.yearly, PRODUCT_IDS.monthly];
export const IAP_PRODUCT_IDS = [PRODUCT_IDS.lifetime];
export const ALL_PRODUCT_IDS = PRODUCT_CATALOG.map((p) => p.id);
export const isKnownProduct = (id) => !!id && ALL_PRODUCT_IDS.includes(id);

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
