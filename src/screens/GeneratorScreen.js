import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { visibleExercises } from '../data/workouts';
import { usePro } from '../context/ProContext';
import { Ionicons } from '@expo/vector-icons';
import { colors, eyebrow, hit, radius, shadow, space, type } from '../theme';

const TAB_EDGES = ['top', 'left', 'right'];
const DURATIONS = [10, 15, 20, 25];
const FOCUSES = [
  { id: 'all', label: 'All' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'shoulders', label: 'Shoulders' },
  { id: 'core', label: 'Core' },
];

export default function GeneratorScreen({ navigation }) {
  const { isPro } = usePro();
  const [selected, setSelected] = useState([]);
  const [duration, setDuration] = useState(15);
  const [focus, setFocus] = useState('all');

  const toggle = (id) => {
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const shown = focus === 'all' ? visibleExercises : visibleExercises.filter((exercise) => exercise.muscle === focus);

  const startCustom = () => {
    if (!isPro) {
      navigation.navigate('Paywall');
      return;
    }
    if (selected.length === 0) return;
    navigation.navigate('Workout', { custom: true, exercises: selected, duration });
  };

  return (
    <SafeAreaView style={styles.container} edges={TAB_EDGES}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.eyebrow}>CUSTOM</Text>
        <Text style={styles.title}>Build</Text>
        <Text style={styles.subtitle}>Pick a duration and exercises from the list</Text>

        <Text style={styles.label}>DURATION</Text>
        <View style={styles.durRow}>
          {DURATIONS.map((minutes) => {
            const active = duration === minutes;
            return (
              <TouchableOpacity
                accessibilityRole="button"
                key={minutes}
                style={[styles.durBtn, active && styles.durActive]}
                onPress={() => setDuration(minutes)}
              >
                <Text style={[styles.durText, active && styles.durTextActive]}>{minutes}</Text>
                <Text style={[styles.durUnit, active && styles.durTextActive]}>min</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>FOCUS</Text>
        <View style={styles.chipRow}>
          {FOCUSES.map((item) => {
            const active = focus === item.id;
            return (
              <TouchableOpacity
                accessibilityRole="button"
                key={item.id}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setFocus(item.id)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>EXERCISES · {selected.length} SELECTED</Text>
        {shown.map((exercise) => {
          const on = selected.includes(exercise.id);
          return (
            <TouchableOpacity
              accessibilityRole="button"
              key={exercise.id}
              style={[styles.exCard, on && styles.exSelected]}
              onPress={() => toggle(exercise.id)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.exName}>{exercise.name}</Text>
                <Text style={styles.exLevel}>{exercise.level}</Text>
              </View>
              <View style={[styles.check, on && styles.checkOn]}>
                {on ? <Ionicons name="checkmark" size={16} color={colors.onAccent} /> : null}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity accessibilityRole="button" style={styles.startBtn} onPress={startCustom}>
          <Text style={styles.startText}>
            {isPro ? `START ${duration} MIN SESSION (${selected.length})` : `PRO · START ${duration} MIN SESSION`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: space.xxl },
  eyebrow: { ...eyebrow, paddingHorizontal: space.xl, paddingTop: space.lg },
  title: { color: colors.text, fontSize: type.display, fontWeight: '800', paddingHorizontal: space.xl, marginTop: 2 },
  subtitle: { color: colors.muted, fontSize: type.label, paddingHorizontal: space.xl, marginTop: space.sm, lineHeight: 22 },
  label: { ...eyebrow, paddingHorizontal: space.xl, marginTop: space.xl },
  durRow: { flexDirection: 'row', paddingHorizontal: space.xl, gap: space.sm, marginTop: space.md },
  durBtn: {
    flex: 1,
    minHeight: 64,
    backgroundColor: colors.card,
    borderRadius: radius.tile,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  durActive: { backgroundColor: colors.accent },
  durText: { color: colors.text, fontWeight: '800', fontSize: 20 },
  durUnit: { color: colors.faint, fontSize: type.caption, fontWeight: '700' },
  durTextActive: { color: colors.onAccent },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, paddingHorizontal: space.xl, marginTop: space.md },
  chip: {
    minHeight: 40,
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.raised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: colors.accent },
  chipText: { color: colors.muted, fontWeight: '700', fontSize: type.label },
  chipTextActive: { color: colors.onAccent },
  exCard: {
    minHeight: 60,
    backgroundColor: colors.card,
    marginHorizontal: space.xl,
    marginTop: space.sm,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderRadius: radius.tile,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadow,
  },
  exSelected: { borderColor: colors.accent },
  exName: { color: colors.text, fontWeight: '700', fontSize: type.label },
  exLevel: { color: colors.faint, textTransform: 'capitalize', fontSize: type.caption, marginTop: 2 },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  startBtn: {
    minHeight: 56,
    backgroundColor: colors.accent,
    marginHorizontal: space.xl,
    marginTop: space.xl,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.lg,
  },
  startText: { color: colors.onAccent, fontWeight: '800', fontSize: type.caption, letterSpacing: 1 },
});
