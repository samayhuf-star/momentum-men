import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProgress } from '../context/ProgressContext';
import { formatProgressDate } from '../lib/formatProgressDate';
import { colors, eyebrow, radius, shadow, space, type } from '../theme';

const TAB_EDGES = ['top', 'left', 'right'];
const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function ProgressScreen() {
  const { streak, totalWorkouts, totalSeconds, completedDays, loading } = useProgress();
  const minutes = Math.round((totalSeconds || 0) / 60);
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1;

  const weekDays = WEEK.map((label, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (adjustedToday - index));
    const key = date.toISOString().split('T')[0];
    return { label, index, date, done: completedDays.includes(key), isToday: index === adjustedToday };
  });
  const doneThisWeek = weekDays.filter((d) => d.done).length;

  return (
    <SafeAreaView style={styles.container} edges={TAB_EDGES}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>On this device</Text>
        <Text style={styles.title}>Progress</Text>

        <View style={styles.hero}>
          <Text style={styles.heroLabel}>DAY STREAK</Text>
          <Text style={styles.heroNum}>{loading ? '–' : streak}</Text>
          <View style={styles.heroChip}>
            <Ionicons name="flame" size={13} color={colors.onAccent} />
            <Text style={styles.heroChipText}>{doneThisWeek} of 7 this week</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>WORKOUTS</Text>
            <Text style={styles.statNum}>{loading ? '–' : totalWorkouts}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>MINUTES</Text>
            <Text style={styles.statNum}>{loading ? '–' : minutes}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>This week</Text>
          <View style={styles.weekRow}>
            {weekDays.map(({ label, index, date, done, isToday }) => (
              <View key={`${label}-${index}`} style={styles.dayCol}>
                <View style={[styles.day, done && styles.dayDone, isToday && !done && styles.dayToday]}>
                  {done ? (
                    <Ionicons name="checkmark" size={16} color={colors.onAccent} />
                  ) : (
                    <Text style={[styles.dayText, isToday && styles.dayTextToday]}>{label}</Text>
                  )}
                </View>
                <Text style={styles.dayNum}>{date.getDate()}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.section}>Recent</Text>
        {completedDays.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.hint}>Complete a workout to start tracking.</Text>
          </View>
        ) : (
          completedDays.slice(-5).reverse().map((dayKey) => (
            <View key={dayKey} style={styles.row}>
              <View style={styles.rowIcon}>
                <Ionicons name="barbell" size={20} color={colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.metric}>Workout complete</Text>
                <Text style={styles.metricSub}>{formatProgressDate(dayKey)}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={20} color={colors.beginner} />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: space.xxl },
  eyebrow: { ...eyebrow, paddingHorizontal: space.xl, paddingTop: space.lg },
  title: { color: colors.text, fontSize: type.display, fontWeight: '800', paddingHorizontal: space.xl, marginTop: 2 },
  hero: {
    backgroundColor: colors.accent,
    borderRadius: radius.card,
    marginHorizontal: space.xl,
    marginTop: space.lg,
    padding: space.xl,
  },
  heroLabel: { color: 'rgba(255,255,255,0.8)', fontSize: type.micro, fontWeight: '800', letterSpacing: 1 },
  heroNum: { color: colors.onAccent, fontSize: 72, fontWeight: '800', marginTop: space.xs, lineHeight: 80 },
  heroChip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    paddingVertical: 5,
    marginTop: space.sm,
  },
  heroChipText: { color: colors.onAccent, fontSize: type.caption, fontWeight: '700' },
  statsRow: { flexDirection: 'row', paddingHorizontal: space.xl, gap: space.md, marginTop: space.md },
  stat: { flex: 1, backgroundColor: colors.card, padding: space.lg, borderRadius: radius.tile, ...shadow },
  statNum: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: space.sm },
  statLabel: { ...eyebrow, fontSize: 10 },
  card: {
    backgroundColor: colors.card,
    marginHorizontal: space.xl,
    marginTop: space.md,
    padding: space.xl,
    borderRadius: radius.card,
    ...shadow,
  },
  cardTitle: { color: colors.text, fontSize: type.body, fontWeight: '800', marginBottom: space.lg },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCol: { alignItems: 'center', gap: space.sm },
  day: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.raised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDone: { backgroundColor: colors.accent },
  dayToday: { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.accent },
  dayText: { color: colors.faint, fontWeight: '700', fontSize: type.caption },
  dayTextToday: { color: colors.accent },
  dayNum: { color: colors.faint, fontSize: type.caption },
  section: {
    color: colors.text,
    fontSize: type.title,
    fontWeight: '800',
    paddingHorizontal: space.xl,
    marginTop: space.xl,
    marginBottom: space.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: colors.card,
    marginHorizontal: space.xl,
    marginBottom: space.sm,
    padding: space.md,
    borderRadius: radius.tile,
    ...shadow,
  },
  rowIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
  metric: { color: colors.text, fontSize: type.body, fontWeight: '700' },
  metricSub: { color: colors.faint, fontSize: type.caption, marginTop: 2 },
  hint: { color: colors.muted, fontSize: type.label, lineHeight: 22 },
});
