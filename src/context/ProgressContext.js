import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [completedDays, setCompletedDays] = useState([]);
  const [streak, setStreak] = useState(0);
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
        setStreak(p.streak || 0);
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
    const today = new Date().toISOString().split('T')[0];
    if (completedDays.includes(today)) return;

    const added = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
    const nextDays = [...completedDays, today];
    const nextStreak = streak + 1;
    const nextTotal = totalWorkouts + 1;
    const nextSeconds = totalSeconds + added;

    setCompletedDays(nextDays);
    setStreak(nextStreak);
    setTotalWorkouts(nextTotal);
    setTotalSeconds(nextSeconds);

    await save({
      completedDays: nextDays,
      streak: nextStreak,
      totalWorkouts: nextTotal,
      totalSeconds: nextSeconds,
    });
  };

  return (
    <ProgressContext.Provider value={{ completedDays, streak, totalWorkouts, totalSeconds, completeWorkout, loading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
