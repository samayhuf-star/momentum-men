import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [completedDays, setCompletedDays] = useState([]);
  const [streak, setStreak] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
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

  const completeWorkout = async () => {
    const today = new Date().toISOString().split('T')[0];
    if (completedDays.includes(today)) return;

    const nextDays = [...completedDays, today];
    const nextStreak = streak + 1;
    const nextTotal = totalWorkouts + 1;

    setCompletedDays(nextDays);
    setStreak(nextStreak);
    setTotalWorkouts(nextTotal);

    await save({ completedDays: nextDays, streak: nextStreak, totalWorkouts: nextTotal });
  };

  return (
    <ProgressContext.Provider value={{ completedDays, streak, totalWorkouts, completeWorkout, loading }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
