import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import { ENTITLEMENT_ID, RC_IOS_KEY } from './pro';

const listeners = new Set();
let configured = false;
let listening = false;

const logErr = (where, e) => {
  if (__DEV__) console.warn(`[purchases] ${where}`, e?.message ?? e);
};

const isEntitled = (info) => !!info?.entitlements?.active?.[ENTITLEMENT_ID];

export async function initIAP() {
  if (configured) return true;
  if (Platform.OS !== 'ios' || !RC_IOS_KEY) return false;
  try {
    if (__DEV__) Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    Purchases.configure({ apiKey: RC_IOS_KEY });
    configured = true;
    if (!listening) {
      listening = true;
      Purchases.addCustomerInfoUpdateListener((info) => {
        const entitled = isEntitled(info);
        listeners.forEach((cb) => cb(entitled));
      });
    }
    try {
      Purchases.enableAdServicesAttributionTokenCollection?.();
    } catch (e) {
      logErr('adservices', e);
    }
    return true;
  } catch (e) {
    logErr('configure', e);
    return false;
  }
}

export async function refreshEntitlements() {
  if (!(await initIAP())) return false;
  try {
    return isEntitled(await Purchases.getCustomerInfo());
  } catch (e) {
    logErr('getCustomerInfo', e);
    return false;
  }
}

export function onEntitlementChange(cb) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export async function restore() {
  if (!(await initIAP())) return false;
  try {
    return isEntitled(await Purchases.restorePurchases());
  } catch (e) {
    logErr('restorePurchases', e);
    return false;
  }
}

// RevenueCat Customer Center: manage or cancel, restore, refunds, support.
export async function manageSubscriptions() {
  if (!(await initIAP())) return;
  try {
    await RevenueCatUI.presentCustomerCenter();
  } catch (e) {
    logErr('customerCenter', e);
  }
}

export async function setUserAttributes(attrs = {}) {
  if (!(await initIAP())) return;
  try {
    const clean = {};
    for (const [k, v] of Object.entries(attrs)) if (v != null && v !== '') clean[k] = String(v);
    if (Object.keys(clean).length) await Purchases.setAttributes(clean);
  } catch (e) {
    logErr('setAttributes', e);
  }
}
