import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { visibleExercises, exercisesForPlan } from '../data/workouts';
import { useProgress } from '../context/ProgressContext';
import ExerciseMedia from '../components/ExerciseMedia';

export default function WorkoutScreen({ route, navigation }) {
  const { plan, custom, exercises: customIds } = route.params || {};
  const { completeWorkout } = useProgress();

  const getExercises = () => {
    if (custom && customIds?.length) {
      return visibleExercises.filter((e) => customIds.includes(e.id));
    }
    return exercisesForPlan(plan);
  };

  const list = getExercises();
  const [index, setIndex] = useState(0);
  const exercise = list[index] || list[0];

  const [mode, setMode] = useState('timer');
  const [timeLeft, setTimeLeft] = useState(exercise?.duration || 40);
  const [reps, setReps] = useState(exercise?.reps || 12);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(exercise?.duration || 40);
    setReps(exercise?.reps || 12);
    setIsRunning(false);
  }, [index]);

  useEffect(() => {
    let interval;
    if (isRunning && mode === 'timer' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, mode, timeLeft]);

  const next = async () => {
    if (index + 1 < list.length) {
      setIndex(index + 1);
    } else {
      await completeWorkout();
      Alert.alert('Done', 'Workout complete. Progress saved on this device.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.goBack()} testID="close-workout">
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.cue}>No exercises in this session.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} testID="workout">
      <View style={styles.header}>
        <Text style={styles.day}>
          {index + 1} / {list.length}
        </Text>
        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.goBack()} testID="close-workout">
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.cue}>{exercise.cue}</Text>

      <ExerciseMedia id={exercise.id} name={exercise.name} muscle={exercise.muscle} dark />

      <View style={styles.modeRow}>
        <TouchableOpacity accessibilityRole="button" style={[styles.modeBtn, mode === 'timer' && styles.modeActive]} onPress={() => setMode('timer')}>
          <Text style={styles.modeText}>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={[styles.modeBtn, mode === 'reps' && styles.modeActive]} onPress={() => setMode('reps')}>
          <Text style={styles.modeText}>Reps</Text>
        </TouchableOpacity>
      </View>

      {mode === 'timer' ? (
        <Text style={styles.timer}>
          {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
        </Text>
      ) : (
        <View style={styles.repRow}>
          <TouchableOpacity accessibilityRole="button" onPress={() => setReps((r) => Math.max(1, r - 1))}>
            <Text style={styles.repBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.reps}>{reps}</Text>
          <TouchableOpacity accessibilityRole="button" onPress={() => setReps((r) => r + 1)}>
            <Text style={styles.repBtn}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.btnRow}>
        <TouchableOpacity accessibilityRole="button" style={styles.skipBtn} onPress={() => setIsRunning(!isRunning)}>
          <Text style={styles.skipText}>{isRunning ? 'PAUSE' : 'START'}</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={styles.nextBtn} onPress={next}>
          <Text style={styles.nextText}>{index + 1 < list.length ? 'NEXT' : 'FINISH'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  day: { color: '#a3e635', fontSize: 14, fontWeight: '600' },
  close: { color: '#a1a1aa', fontSize: 16, fontWeight: '600' },
  cue: { color: '#a1a1aa', marginTop: 12, fontSize: 15 },
  modeRow: { flexDirection: 'row', marginTop: 16, gap: 12 },
  modeBtn: { flex: 1, padding: 12, borderRadius: 12, backgroundColor: '#27272a', alignItems: 'center' },
  modeActive: { backgroundColor: '#a3e635' },
  modeText: { color: '#fff', fontWeight: '600' },
  timer: { color: '#fff', fontSize: 56, fontWeight: 'bold', textAlign: 'center', marginVertical: 12 },
  repRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 12, gap: 24 },
  reps: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
  repBtn: { color: '#a3e635', fontSize: 40, fontWeight: 'bold' },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  skipBtn: { flex: 1, padding: 16, borderRadius: 16, backgroundColor: '#27272a', alignItems: 'center' },
  skipText: { color: '#fff', fontWeight: '700' },
  nextBtn: { flex: 1, padding: 16, borderRadius: 16, backgroundColor: '#a3e635', alignItems: 'center' },
  nextText: { color: '#000', fontWeight: '700' },
});
