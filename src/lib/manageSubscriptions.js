export const APPLE_SUBSCRIPTIONS_URL = 'https://apps.apple.com/account/subscriptions';

/** Opens Apple's subscription manager. The store sheet is tried on iOS first. */
export async function openManageSubscriptions({ platform, showManage, openUrl }) {
  if (platform === 'ios' && typeof showManage === 'function') {
    try {
      await showManage();
      return 'store';
    } catch {
      // The sheet can fail off-device or before StoreKit is ready.
    }
  }
  await openUrl(APPLE_SUBSCRIPTIONS_URL);
  return 'url';
}
