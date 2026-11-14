import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { visibleExercises } from '../data/workouts';
import { usePro } from '../context/ProContext';
import { colors, hit, space, type } from '../theme';

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
        <Text style={styles.eyebrow}>Custom</Text>
        <Text style={styles.title}>Generator</Text>
        <Text style={styles.subtitle}>Pick a duration and exercises from the list</Text>

        <Text style={styles.label}>Duration</Text>
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

        <Text style={styles.label}>Focus</Text>
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

        <Text style={styles.label}>Exercises · {selected.length} selected</Text>
        {shown.map((exercise) => {
          const on = selected.includes(exercise.id);
          return (
            <TouchableOpacity
              accessibilityRole="button"
              key={exercise.id}
              style={[styles.exCard, on && styles.exSelected]}
              onPress={() => toggle(exercise.id)}
            >
              <Text style={styles.exName}>{exercise.name}</Text>
              <Text style={styles.exLevel}>{exercise.level}</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity accessibilityRole="button" style={styles.startBtn} onPress={startCustom}>
          <Text style={styles.startText}>
            {isPro ? `Start ${duration} min session (${selected.length})` : `Pro · Start ${duration} min session`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: space.xxl },
  eyebrow: { color: colors.lime, fontSize: type.caption, fontWeight: '700', paddingHorizontal: space.xl, paddingTop: space.lg },
  title: { color: colors.text, fontSize: type.display, fontWeight: '800', paddingHorizontal: space.xl },
  subtitle: { color: colors.muted, fontSize: type.body, paddingHorizontal: space.xl, marginTop: space.sm, lineHeight: 24 },
  label: { color: colors.text, fontSize: type.label, fontWeight: '700', paddingHorizontal: space.xl, marginTop: space.xl },
  durRow: { flexDirection: 'row', paddingHorizontal: space.xl, gap: space.sm, marginTop: space.md },
  durBtn: {
    flex: 1,
    minHeight: 64,
    backgroundColor: colors.raised,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  durActive: { backgroundColor: colors.lime },
  durText: { color: colors.text, fontWeight: '800', fontSize: 20 },
  durUnit: { color: colors.faint, fontSize: type.caption, fontWeight: '700' },
  durTextActive: { color: colors.ink },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, paddingHorizontal: space.xl, marginTop: space.md },
  chip: {
    minHeight: hit,
    paddingHorizontal: space.lg,
    borderRadius: 999,
    backgroundColor: colors.raised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: colors.lime },
  chipText: { color: colors.text, fontWeight: '700', fontSize: type.label },
  chipTextActive: { color: colors.ink },
  exCard: {
    minHeight: 56,
    backgroundColor: colors.card,
    marginHorizontal: space.xl,
    marginTop: space.sm,
    paddingHorizontal: space.lg,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exSelected: { borderWidth: 2, borderColor: colors.lime },
  exName: { color: colors.text, fontWeight: '700', fontSize: type.label, flex: 1, paddingRight: space.sm },
  exLevel: { color: colors.faint, textTransform: 'capitalize', fontSize: type.caption },
  startBtn: {
    minHeight: 56,
    backgroundColor: colors.lime,
    marginHorizontal: space.xl,
    marginTop: space.xl,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.lg,
  },
  startText: { color: colors.ink, fontWeight: '800', fontSize: type.body },
});
