import { Linking, Platform } from 'react-native';
import Purchases, { PURCHASES_ERROR_CODE } from 'react-native-purchases';
import { PRODUCT_CATALOG } from './pro';

// RevenueCat-backed store layer. Public API is unchanged from the previous expo-iap
// version (initIAP / loadPlans / refreshEntitlements / onEntitlementChange / buy /
// manageSubscriptions / restore) so ProContext and PaywallScreen need no changes.
//
// Config is intentionally tolerant of however the RevenueCat project is set up:
// - "premium" = ANY active entitlement (so the entitlement identifier can be anything).
// - plans are matched to PRODUCT_CATALOG by the store product identifier, so the
//   offering/package identifiers in RevenueCat can be named freely.
// Requires env at build time: EXPO_PUBLIC_RC_IOS_KEY (iOS) / EXPO_PUBLIC_RC_ANDROID_KEY (Android).

const UNIT_DAYS = { DAY: 1, WEEK: 7, MONTH: 30, YEAR: 365 };
let configured = false;
const entitlementListeners = new Set();

const emitPremium = (isPremium) => entitlementListeners.forEach((cb) => cb(isPremium));
const isPremium = (customerInfo) => Object.keys(customerInfo?.entitlements?.active ?? {}).length > 0;

const logErr = (action, e) => {
  const err = e || {};
  console.log('[momentum-iap]', `${action} failed`, { code: err?.code, message: err?.message, underlyingErrorMessage: err?.underlyingErrorMessage });
};

function apiKey() {
  return Platform.OS === 'ios' ? process.env.EXPO_PUBLIC_RC_IOS_KEY : process.env.EXPO_PUBLIC_RC_ANDROID_KEY;
}

export async function initIAP() {
  if (configured) return true;
  const key = apiKey();
  if (!key) {
    logErr('configure', { message: 'missing RevenueCat API key (EXPO_PUBLIC_RC_IOS_KEY)' });
    return false;
  }
  try {
    Purchases.configure({ apiKey: key });
    Purchases.addCustomerInfoUpdateListener((info) => emitPremium(isPremium(info)));
    configured = true;
    return true;
  } catch (e) {
    logErr('configure', e);
    return false;
  }
}

function introDays(product) {
  const ip = product?.introPrice;
  if (!ip || ip.price !== 0) return null; // only a *free* trial counts
  const per = UNIT_DAYS[ip.periodUnit] ?? 0;
  const days = per * (ip.periodNumberOfUnits || 1) * (ip.cycles || 1);
  return days > 0 ? days : null;
}

async function trialEligible(productId) {
  if (Platform.OS !== 'ios') return true;
  try {
    const map = await Purchases.checkTrialOrIntroductoryPriceEligibility([productId]);
    const status = map?.[productId]?.status;
    return status !== 1; // 1 = INELIGIBLE; unknown/eligible both allowed
  } catch (e) {
    logErr('checkTrialEligibility', e);
    return true;
  }
}

export async function loadPlans() {
  if (!(await initIAP())) {
    return { plans: [], error: 'Plans unavailable right now. Please try again shortly.' };
  }
  let packages = [];
  try {
    const offerings = await Purchases.getOfferings();
    packages = offerings?.current?.availablePackages ?? [];
  } catch (e) {
    logErr('getOfferings', e);
  }
  const byProductId = new Map();
  for (const pkg of packages) {
    const id = pkg?.product?.identifier;
    if (id) byProductId.set(id, pkg);
  }
  const plans = [];
  for (const def of PRODUCT_CATALOG) {
    const pkg = byProductId.get(def.id);
    if (!pkg) continue;
    const product = pkg.product;
    let trialDays = null;
    if (def.kind !== 'lifetime') {
      const days = introDays(product);
      trialDays = days && (await trialEligible(def.id)) ? days : null;
    }
    plans.push({ ...def, price: product.priceString, product, package: pkg, trialDays });
  }
  if (!plans.length) {
    return { plans: [], error: 'Plans unavailable right now. Please try again shortly.' };
  }
  return { plans, error: null };
}

export async function refreshEntitlements() {
  if (!(await initIAP())) return false;
  try {
    return isPremium(await Purchases.getCustomerInfo());
  } catch (e) {
    logErr('getCustomerInfo', e);
    return false;
  }
}

export function onEntitlementChange(cb) {
  entitlementListeners.add(cb);
  return () => entitlementListeners.delete(cb);
}

export async function buy(plan) {
  if (!(await initIAP())) return 'error';
  if (!plan?.package) return 'error';
  try {
    const { customerInfo } = await Purchases.purchasePackage(plan.package);
    const entitled = isPremium(customerInfo);
    emitPremium(entitled);
    return entitled ? 'purchased' : 'error';
  } catch (e) {
    if (e?.userCancelled) return 'cancelled';
    if (e?.code === PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR) return 'pending';
    logErr('purchasePackage', e);
    return 'error';
  }
}

export async function manageSubscriptions() {
  const url = Platform.OS === 'ios'
    ? 'https://apps.apple.com/account/subscriptions'
    : 'https://play.google.com/store/account/subscriptions';
  try {
    await Linking.openURL(url);
    return true;
  } catch (e) {
    logErr('manageSubscriptions', e);
    return false;
  }
}

export async function restore() {
  if (!(await initIAP())) return false;
  try {
    const entitled = isPremium(await Purchases.restorePurchases());
    emitPremium(entitled);
    return entitled;
  } catch (e) {
    logErr('restorePurchases', e);
    return false;
  }
}
