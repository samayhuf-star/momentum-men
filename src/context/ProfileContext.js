import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PROFILE } from '../lib/personalize';

const KEY = 'profile.v1';

const ProfileContext = createContext({
  profile: DEFAULT_PROFILE,
  loading: true,
  save: async () => {},
  reset: async () => {},
  pendingPaywall: false,
  setPendingPaywall: () => {},
});

// Height, weight and age range are stored only on this device (AsyncStorage). They are never sent anywhere.
export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);
  const [pendingPaywall, setPendingPaywall] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(raw) });
      } catch (e) {
        console.log('Profile load error', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const save = useCallback(async (patch) => {
    let merged;
    setProfile((current) => {
      merged = { ...current, ...patch };
      return merged;
    });
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify({ ...DEFAULT_PROFILE, ...(merged || patch) }));
    } catch (e) {
      console.log('Profile save error', e);
    }
  }, []);

  const reset = useCallback(async () => {
    setProfile(DEFAULT_PROFILE);
    await AsyncStorage.removeItem(KEY);
  }, []);

  const value = useMemo(
    () => ({ profile, loading, save, reset, pendingPaywall, setPendingPaywall }),
    [profile, loading, save, reset, pendingPaywall]
  );
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export const useProfile = () => useContext(ProfileContext);
