import AsyncStorage from '@react-native-async-storage/async-storage';
import { OneSignal } from 'react-native-onesignal';

// OneSignal push. App ID comes from env at build time (EXPO_PUBLIC_ONESIGNAL_APP_ID).
// Consent first: the SDK is initialised with consent required, so nothing is sent to
// OneSignal until the user opts in on the onboarding reminders screen (grantPushConsent).
// Safe no-op if the id is missing, so the app still runs without push configured.
const CONSENT_KEY = 'pushConsent';
let started = false;

function appId() {
  return process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID;
}

export async function initOneSignal() {
  if (started || !appId()) return;
  try {
    OneSignal.setConsentRequired(true);
    OneSignal.initialize(appId());
    started = true;
    if ((await AsyncStorage.getItem(CONSENT_KEY)) === 'yes') OneSignal.setConsentGiven(true);
  } catch (e) {
    console.log('[momentum-onesignal] init failed', e?.message);
  }
}

/** User tapped "Turn on reminders": record consent, release the SDK, ask iOS for permission. */
export async function grantPushConsent() {
  try {
    await AsyncStorage.setItem(CONSENT_KEY, 'yes');
    await initOneSignal();
    if (!started) return false;
    OneSignal.setConsentGiven(true);
    return await OneSignal.Notifications.requestPermission(true);
  } catch (e) {
    console.log('[momentum-onesignal] consent failed', e?.message);
    return false;
  }
}
