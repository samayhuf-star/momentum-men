import { Linking, Platform } from 'react-native';
import {
  currentEntitlementIOS,
  ErrorCode,
  fetchProducts,
  finishTransaction,
  getActiveSubscriptions,
  getAvailablePurchases,
  hasActiveSubscriptions,
  initConnection,
  isEligibleForIntroOfferIOS,
  isTransactionVerifiedIOS,
  isUserCancelledError,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  restorePurchases as storeRestore,
  showManageSubscriptionsIOS,
  syncIOS,
} from 'expo-iap';
import { openManageSubscriptions } from './manageSubscriptions';
import { ALL_PRODUCT_IDS, IAP_PRODUCT_IDS, SUB_PRODUCT_IDS, isKnownProduct, PRODUCT_CATALOG } from './pro';
import { freeTrialDays } from './introOffer';

async function introEligible(product) {
  if (Platform.OS !== 'ios') return true;
  const group = product.subscriptionGroupIdIOS;
  if (!group) return false;
  try {
    return !!(await isEligibleForIntroOfferIOS(group));
  } catch (e) {
    logErr('isEligibleForIntroOfferIOS', e);
    return false;
  }
}

let connected = false;
let listeners = false;
const entitlementListeners = new Set();
let purchaseWaiter = null;

const emitPremium = (isPremium) => {
  entitlementListeners.forEach((cb) => cb(isPremium));
};

const logErr = (action, e) => {
  const err = e || {};
  console.log('[momentum-iap]', `${action} failed`, {
    code: err?.code,
    message: err?.message,
    debugMessage: err?.debugMessage,
  });
};

async function ensureConnected() {
  if (connected) return true;
  try {
    connected = !!(await initConnection());
  } catch (e) {
    logErr('initConnection', e);
    connected = false;
  }
  return connected;
}

async function verifyOnDevice(purchase) {
  if (purchase.purchaseState === 'pending') return false;
  if ('isSuspendedAndroid' in purchase && purchase.isSuspendedAndroid) return false;
  if (!isKnownProduct(purchase.productId)) return false;

  if (Platform.OS === 'ios') {
    try {
      if (await isTransactionVerifiedIOS(purchase.productId)) return true;
    } catch (e) {
      logErr('isTransactionVerifiedIOS', e);
    }
    try {
      const entitlement = await currentEntitlementIOS(purchase.productId);
      if (entitlement) return true;
    } catch (e) {
      logErr('currentEntitlementIOS', e);
    }
    return purchase.purchaseState === 'purchased' || purchase.purchaseState === 'unknown';
  }

  return purchase.purchaseState === 'purchased' || purchase.purchaseState === 'unknown';
}

async function verifyAndFinish(purchase) {
  if (purchase.purchaseState === 'pending') return false;
  const ok = await verifyOnDevice(purchase);
  if (!ok) return false;
  try {
    await finishTransaction({ purchase, isConsumable: false });
  } catch (e) {
    logErr('finishTransaction', e);
  }
  return true;
}

function attachListeners() {
  if (listeners) return;
  listeners = true;
  purchaseUpdatedListener(async (purchase) => {
    if (purchase.purchaseState === 'pending') {
      purchaseWaiter?.('pending');
      purchaseWaiter = null;
      return;
    }
    const ok = await verifyAndFinish(purchase);
    if (ok) {
      const entitled = await refreshEntitlements();
      emitPremium(entitled);
    }
    purchaseWaiter?.(ok ? 'purchased' : 'error');
    purchaseWaiter = null;
  });
  purchaseErrorListener((error) => {
    logErr('purchaseError', error);
    if (isUserCancelledError(error) || error.code === ErrorCode.UserCancelled) {
      purchaseWaiter?.('cancelled');
    } else if (error.code === ErrorCode.Pending || error.code === ErrorCode.DeferredPayment) {
      purchaseWaiter?.('pending');
    } else {
      purchaseWaiter?.('error');
    }
    purchaseWaiter = null;
  });
}

export async function initIAP() {
  attachListeners();
  return ensureConnected();
}

export async function loadPlans() {
  if (!(await ensureConnected())) {
    return { plans: [], error: 'Plans unavailable right now. Please try again shortly.' };
  }
  const byId = new Map();
  try {
    const subs = (await fetchProducts({ skus: SUB_PRODUCT_IDS, type: 'subs' })) ?? [];
    for (const product of subs) {
      if (product?.id && product.displayPrice) byId.set(product.id, product);
    }
  } catch (e) {
    logErr('fetchProducts subs', e);
  }
  try {
    const items = (await fetchProducts({ skus: IAP_PRODUCT_IDS, type: 'in-app' })) ?? [];
    for (const product of items) {
      if (product?.id && product.displayPrice) byId.set(product.id, product);
    }
  } catch (e) {
    logErr('fetchProducts in-app', e);
  }
  const plans = [];
  for (const def of PRODUCT_CATALOG) {
    const product = byId.get(def.id);
    if (!product) continue;
    if (def.kind === 'lifetime') {
      plans.push({ ...def, price: product.displayPrice, product, trialDays: null });
      continue;
    }
    const days = freeTrialDays(product);
    const trialDays = days && (await introEligible(product)) ? days : null;
    plans.push({ ...def, price: product.displayPrice, product, trialDays });
  }
  if (!plans.length) {
    return { plans: [], error: 'Plans unavailable right now. Please try again shortly.' };
  }
  return { plans, error: null };
}

export async function refreshEntitlements() {
  if (!(await ensureConnected())) return false;
  try {
    if (Platform.OS === 'ios') {
      for (const id of ALL_PRODUCT_IDS) {
        try {
          if (await currentEntitlementIOS(id)) return true;
        } catch (e) {
          logErr(`currentEntitlementIOS ${id}`, e);
        }
      }
    }
    try {
      if (await hasActiveSubscriptions(SUB_PRODUCT_IDS)) return true;
    } catch (e) {
      logErr('hasActiveSubscriptions', e);
    }
    try {
      const active = await getActiveSubscriptions(SUB_PRODUCT_IDS);
      if (active.some((s) => s.isActive)) return true;
    } catch (e) {
      logErr('getActiveSubscriptions', e);
    }
    try {
      const purchases = await getAvailablePurchases({ onlyIncludeActiveItemsIOS: true });
      for (const purchase of purchases) {
        if (isKnownProduct(purchase.productId) && (await verifyOnDevice(purchase))) return true;
      }
    } catch (e) {
      logErr('getAvailablePurchases entitlements', e);
    }
    return false;
  } catch (e) {
    logErr('refreshEntitlements', e);
    return false;
  }
}

export function onEntitlementChange(cb) {
  entitlementListeners.add(cb);
  return () => {
    entitlementListeners.delete(cb);
  };
}

export async function buy(plan) {
  if (!(await ensureConnected())) return 'error';
  const result = new Promise((resolve) => {
    purchaseWaiter = resolve;
  });
  try {
    await requestPurchase({
      request: {
        apple: { sku: plan.id },
        google: { skus: [plan.id] },
      },
      type: plan.type,
    });
  } catch (e) {
    purchaseWaiter = null;
    if (isUserCancelledError(e) || e?.code === ErrorCode.UserCancelled) return 'cancelled';
    if (e?.code === ErrorCode.Pending || e?.code === ErrorCode.DeferredPayment) {
      return 'pending';
    }
    logErr('requestPurchase', e);
    return 'error';
  }
  return result;
}

export async function manageSubscriptions() {
  return openManageSubscriptions({
    platform: Platform.OS,
    showManage: showManageSubscriptionsIOS,
    openUrl: (url) => Linking.openURL(url),
  });
}

export async function restore() {
  if (!(await ensureConnected())) return false;
  if (Platform.OS === 'ios') {
    try {
      await syncIOS();
    } catch (e) {
      logErr('syncIOS restore', e);
    }
  }
  try {
    await storeRestore();
  } catch (e) {
    logErr('restorePurchases', e);
  }
  try {
    const purchases = await getAvailablePurchases({ onlyIncludeActiveItemsIOS: false });
    for (const purchase of purchases) {
      if (purchase.purchaseState === 'pending') continue;
      if (!isKnownProduct(purchase.productId)) continue;
      try {
        if (await verifyOnDevice(purchase)) {
          await finishTransaction({ purchase, isConsumable: false });
        }
      } catch (e) {
        logErr('restore finish', e);
      }
    }
  } catch (e) {
    logErr('restore getAvailablePurchases', e);
  }
  const entitled = await refreshEntitlements();
  emitPremium(entitled);
  return entitled;
}
