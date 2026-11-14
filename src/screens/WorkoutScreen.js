import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { visibleExercises, exercisesForPlan } from '../data/workouts';
import { useProgress } from '../context/ProgressContext';
import ExerciseMedia from '../components/ExerciseMedia';
import { clock, remainingSeconds } from '../lib/sessionPlan';
import { colors, hit, space, type } from '../theme';

export default function WorkoutScreen({ route, navigation }) {
  const { plan, custom, exercises: customIds } = route.params || {};
  const { completeWorkout } = useProgress();

  const getExercises = () => {
    if (custom && customIds?.length) {
      return visibleExercises.filter((exercise) => customIds.includes(exercise.id));
    }
    return exercisesForPlan(plan);
  };

  const list = getExercises();
  const [index, setIndex] = useState(0);
  const exercise = list[index] || list[0];
  const upcoming = list[index + 1];

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
      interval = setInterval(() => setTimeLeft((value) => value - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, mode, timeLeft]);

  const finish = async () => {
    const seconds = list.reduce((sum, item) => sum + (item.duration || 0), 0);
    await completeWorkout(seconds);
    Alert.alert('Done', 'Workout complete. Progress saved on this device.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const next = async () => {
    if (index + 1 < list.length) setIndex(index + 1);
    else await finish();
  };

  const previous = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.closeHit} testID="close-workout">
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.cue}>No exercises in this session.</Text>
      </SafeAreaView>
    );
  }

  const left = remainingSeconds(list, index, timeLeft, mode);

  return (
    <SafeAreaView style={styles.container} testID="workout">
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Exercise {index + 1} of {list.length}</Text>
          <Text style={styles.timeLeft}>{clock(left)} left in session</Text>
        </View>
        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.closeHit} testID="close-workout">
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.segments}>
        {list.map((item, itemIndex) => (
          <View
            key={item.id}
            style={[styles.segment, itemIndex <= index && styles.segmentDone, itemIndex === index && styles.segmentCurrent]}
          />
        ))}
      </View>

      <Text style={styles.cue}>{exercise.cue}</Text>
      <ExerciseMedia id={exercise.id} name={exercise.name} muscle={exercise.muscle} dark />

      <View style={styles.modeRow}>
        <TouchableOpacity
          accessibilityRole="button"
          style={[styles.modeBtn, mode === 'timer' && styles.modeActive]}
          onPress={() => setMode('timer')}
        >
          <Text style={[styles.modeText, mode === 'timer' && styles.modeTextActive]}>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          style={[styles.modeBtn, mode === 'reps' && styles.modeActive]}
          onPress={() => setMode('reps')}
          testID="mode-reps"
        >
          <Text style={[styles.modeText, mode === 'reps' && styles.modeTextActive]}>Reps</Text>
        </TouchableOpacity>
      </View>

      {mode === 'timer' ? (
        <Text style={styles.timer}>
          {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
        </Text>
      ) : (
        <View style={styles.repRow}>
          <TouchableOpacity accessibilityRole="button" style={styles.repHit} onPress={() => setReps((value) => Math.max(1, value - 1))}>
            <Text style={styles.repBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.reps}>{reps}</Text>
          <TouchableOpacity accessibilityRole="button" style={styles.repHit} onPress={() => setReps((value) => value + 1)}>
            <Text style={styles.repBtn}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.nextUp}>
        <Text style={styles.nextLabel}>{upcoming ? 'Next up' : 'Last exercise'}</Text>
        <Text style={styles.nextName}>{upcoming ? upcoming.name : exercise.name}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Previous exercise"
          style={[styles.sideBtn, index === 0 && styles.sideDisabled]}
          onPress={previous}
          disabled={index === 0}
        >
          <Text style={styles.sideText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.primary}
          onPress={() => setIsRunning(!isRunning)}
        >
          <Text style={styles.primaryText}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" style={styles.sideBtn} onPress={next} testID="next-exercise">
          <Text style={styles.sideText}>{index + 1 < list.length ? 'Next' : 'Finish'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: space.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kicker: { color: colors.lime, fontSize: type.label, fontWeight: '700' },
  timeLeft: { color: colors.muted, fontSize: type.caption, marginTop: space.xs },
  closeHit: { minHeight: hit, minWidth: hit, alignItems: 'center', justifyContent: 'center' },
  close: { color: colors.muted, fontSize: type.label, fontWeight: '700' },
  cue: { color: colors.muted, marginTop: space.md, fontSize: type.body, lineHeight: 24 },
  segments: { flexDirection: 'row', gap: 4, marginTop: space.md },
  segment: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.raised },
  segmentDone: { backgroundColor: colors.lime },
  segmentCurrent: { backgroundColor: colors.lime },
  modeRow: { flexDirection: 'row', marginTop: space.md, gap: space.md },
  modeBtn: { flex: 1, minHeight: hit, borderRadius: 12, backgroundColor: colors.raised, alignItems: 'center', justifyContent: 'center' },
  modeActive: { backgroundColor: colors.lime },
  modeText: { color: colors.text, fontWeight: '700', fontSize: type.label },
  modeTextActive: { color: colors.ink },
  timer: { color: colors.text, fontSize: 56, fontWeight: '800', textAlign: 'center', marginVertical: space.sm },
  repRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: space.sm, gap: space.lg },
  reps: { color: colors.text, fontSize: 48, fontWeight: '800', minWidth: 72, textAlign: 'center' },
  repHit: { minWidth: hit, minHeight: hit, alignItems: 'center', justifyContent: 'center' },
  repBtn: { color: colors.lime, fontSize: 36, fontWeight: '700' },
  nextUp: { backgroundColor: colors.card, borderRadius: 16, padding: space.md, marginTop: space.sm },
  nextLabel: { color: colors.faint, fontSize: type.caption, fontWeight: '700' },
  nextName: { color: colors.text, fontSize: type.body, fontWeight: '700', marginTop: space.xs },
  controls: { flexDirection: 'row', gap: space.sm, marginTop: space.md },
  sideBtn: {
    flex: 1,
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: colors.raised,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.sm,
  },
  sideDisabled: { opacity: 0.4 },
  sideText: { color: colors.text, fontWeight: '800', fontSize: type.label },
  primary: {
    flex: 1.3,
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: colors.ink, fontWeight: '800', fontSize: 18 },
});
