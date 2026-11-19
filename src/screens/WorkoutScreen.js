import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { visibleExercises, exercisesForPlan } from '../data/workouts';
import { useProgress } from '../context/ProgressContext';
import ExerciseMedia from '../components/ExerciseMedia';
import Ring from '../components/Ring';
import { clock, remainingSeconds } from '../lib/sessionPlan';
import { colors, eyebrow, hit, radius, shadow, space, type } from '../theme';

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
      <SafeAreaView style={[styles.container, { padding: space.lg }]}>
        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.closeHit} testID="close-workout">
          <Ionicons name="close" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.cue}>No exercises in this session.</Text>
      </SafeAreaView>
    );
  }

  const left = remainingSeconds(list, index, timeLeft, mode);
  const total = exercise.duration || 40;
  const progress = total > 0 ? 1 - timeLeft / total : 0;
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container} testID="workout">
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Close workout"
            onPress={() => navigation.goBack()}
            style={styles.closeHit}
            testID="close-workout"
          >
            <Ionicons name="close" size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.sessionPill}>
            <Text style={styles.sessionLabel}>SESSION LEFT</Text>
            <Text style={styles.sessionTime}>{clock(left)}</Text>
          </View>
          <View style={styles.spacer} />
        </View>

        <View style={styles.segments}>
          {list.map((item, itemIndex) => (
            <View key={item.id} style={[styles.segment, itemIndex <= index && styles.segmentDone]} />
          ))}
        </View>
        <Text style={styles.kicker}>EXERCISE {index + 1} OF {list.length}</Text>

        <ExerciseMedia id={exercise.id} name={exercise.name} muscle={exercise.muscle} dark={false} />
        <Text style={styles.cue}>{exercise.cue}</Text>

        <View style={styles.modeRow}>
          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.modeBtn, mode === 'timer' && styles.modeActive]}
            onPress={() => setMode('timer')}
          >
            <Text style={[styles.modeText, mode === 'timer' && styles.modeTextActive]}>TIMER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.modeBtn, mode === 'reps' && styles.modeActive]}
            onPress={() => setMode('reps')}
            testID="mode-reps"
          >
            <Text style={[styles.modeText, mode === 'reps' && styles.modeTextActive]}>REPS</Text>
          </TouchableOpacity>
        </View>

        {mode === 'timer' ? (
          <View style={styles.ringWrap}>
            <Ring size={176} thickness={10} progress={progress} color={colors.accent} track={colors.raised}>
              <Text style={styles.ringLabel}>{isRunning ? 'GO' : 'READY'}</Text>
              <Text style={styles.timer}>{mm}:{ss}</Text>
            </Ring>
          </View>
        ) : (
          <View style={styles.repRow}>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Fewer reps" style={styles.repHit} onPress={() => setReps((value) => Math.max(1, value - 1))}>
              <Ionicons name="remove" size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.repCenter}>
              <Text style={styles.ringLabel}>REPS</Text>
              <Text style={styles.reps}>{reps}</Text>
            </View>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="More reps" style={styles.repHit} onPress={() => setReps((value) => value + 1)}>
              <Ionicons name="add" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.nextUp}>
          <View style={styles.nextIcon}>
            <Ionicons name="play-forward" size={16} color={colors.faint} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.nextLabel}>{upcoming ? 'UP NEXT' : 'LAST EXERCISE'}</Text>
            <Text style={styles.nextName}>{upcoming ? upcoming.name : exercise.name}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Previous exercise"
            style={[styles.iconBtn, index === 0 && styles.sideDisabled]}
            onPress={previous}
            disabled={index === 0}
          >
            <Ionicons name="play-back" size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" style={styles.sideBtn} onPress={() => setIsRunning(!isRunning)}>
            <Ionicons name={isRunning ? 'pause' : 'play'} size={16} color={colors.text} />
            <Text style={styles.sideText}>{isRunning ? 'PAUSE' : 'START'}</Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" style={styles.primary} onPress={next} testID="next-exercise">
            <Ionicons name={index + 1 < list.length ? 'arrow-forward' : 'checkmark-circle'} size={18} color={colors.onAccent} />
            <Text style={styles.primaryText}>{index + 1 < list.length ? 'NEXT' : 'FINISH'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: space.lg, paddingBottom: space.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  closeHit: {
    width: hit,
    height: hit,
    borderRadius: hit / 2,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  spacer: { width: hit, height: hit },
  sessionPill: {
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    paddingVertical: space.sm,
    paddingHorizontal: space.xl,
    alignItems: 'center',
    ...shadow,
  },
  sessionLabel: { ...eyebrow, fontSize: 9 },
  sessionTime: { color: colors.text, fontSize: type.title, fontWeight: '800', marginTop: 2 },
  segments: { flexDirection: 'row', gap: 4, marginTop: space.lg },
  segment: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.line },
  segmentDone: { backgroundColor: colors.accent },
  kicker: { ...eyebrow, color: colors.accent, marginTop: space.md },
  cue: { color: colors.muted, marginTop: space.md, fontSize: type.label, lineHeight: 22, textAlign: 'center' },
  modeRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: space.lg,
    backgroundColor: colors.raised,
    borderRadius: radius.pill,
    padding: 4,
  },
  modeBtn: { minHeight: 36, minWidth: 96, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  modeActive: { backgroundColor: colors.card, ...shadow },
  modeText: { color: colors.faint, fontWeight: '800', fontSize: type.caption, letterSpacing: 1 },
  modeTextActive: { color: colors.text },
  ringWrap: { alignItems: 'center', marginTop: space.lg },
  ringLabel: { ...eyebrow },
  timer: { color: colors.text, fontSize: 44, fontWeight: '800', marginTop: 2, fontVariant: ['tabular-nums'] },
  repRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: space.lg, gap: space.xl, minHeight: 176 },
  repCenter: { alignItems: 'center', minWidth: 110 },
  reps: { color: colors.text, fontSize: 64, fontWeight: '800', marginTop: 2 },
  repHit: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  nextUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: colors.card,
    borderRadius: radius.tile,
    padding: space.md,
    marginTop: space.lg,
    ...shadow,
  },
  nextIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  nextLabel: { ...eyebrow, fontSize: 10 },
  nextName: { color: colors.text, fontSize: type.body, fontWeight: '700', marginTop: 2 },
  controls: { flexDirection: 'row', gap: space.sm, marginTop: space.lg },
  iconBtn: {
    width: 56,
    minHeight: 56,
    borderRadius: radius.button,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  sideBtn: {
    flex: 1,
    minHeight: 56,
    borderRadius: radius.button,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: space.sm,
    ...shadow,
  },
  sideDisabled: { opacity: 0.4 },
  sideText: { color: colors.text, fontWeight: '800', fontSize: type.caption, letterSpacing: 1 },
  primary: {
    flex: 1.2,
    minHeight: 56,
    borderRadius: radius.button,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: space.sm,
  },
  primaryText: { color: colors.onAccent, fontWeight: '800', fontSize: type.caption, letterSpacing: 1 },
});
