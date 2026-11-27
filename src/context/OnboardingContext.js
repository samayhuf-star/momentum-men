import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ONBOARDING_DONE_KEY } from '../screens/OnboardingScreen';

const OnboardingContext = createContext({ done: true, loading: false, finish: async () => {} });

export function OnboardingProvider({ children }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_DONE_KEY)
      .then((v) => setDone(v === 'yes'))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const finish = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_DONE_KEY, 'yes');
    } catch {}
    setDone(true);
  };

  return <OnboardingContext.Provider value={{ done, loading, finish }}>{children}</OnboardingContext.Provider>;
}

export const useOnboarding = () => useContext(OnboardingContext);
