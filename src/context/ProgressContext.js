import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currentStreak, localDayKey } from '../lib/days';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [completedDays, setCompletedDays] = useState([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await AsyncStorage.getItem('progress');
      if (data) {
        const p = JSON.parse(data);
        setCompletedDays(p.completedDays || []);
        setTotalWorkouts(p.totalWorkouts || 0);
        setTotalSeconds(p.totalSeconds || 0);
      }
    } catch (e) {
      console.log('Progress load error', e);
    } finally {
      setLoading(false);
    }
  };

  const save = async (next) => {
    await AsyncStorage.setItem('progress', JSON.stringify(next));
  };

  const completeWorkout = async (seconds = 0) => {
    const today = localDayKey();
    const added = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
    const nextDays = completedDays.includes(today) ? completedDays : [...completedDays, today];
    const nextTotal = totalWorkouts + 1;
    const nextSeconds = totalSeconds + added;

    setCompletedDays(nextDays);
    setTotalWorkouts(nextTotal);
    setTotalSeconds(nextSeconds);

    try {
      await save({ completedDays: nextDays, totalWorkouts: nextTotal, totalSeconds: nextSeconds });
    } catch (e) {
      console.log('Progress save error', e);
    }
  };

  // The streak is worked out from the saved days, so it resets after a missed day.
  const streak = currentStreak(completedDays);

  return (
    <ProgressContext.Provider value={{ completedDays, streak, totalWorkouts, totalSeconds, completeWorkout, loading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
