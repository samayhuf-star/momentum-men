import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgress } from '../context/ProgressContext';
import { formatProgressDate } from '../lib/formatProgressDate';
import { colors, space, type } from '../theme';

const TAB_EDGES = ['top', 'left', 'right'];
const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function ProgressScreen() {
  const { streak, totalWorkouts, totalSeconds, completedDays, loading } = useProgress();
  const minutes = Math.round((totalSeconds || 0) / 60);
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1;

  return (
    <SafeAreaView style={styles.container} edges={TAB_EDGES}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.eyebrow}>On this device</Text>
        <Text style={styles.title}>Your progress</Text>

        <View style={styles.ringWrap}>
          <View style={styles.ring}>
            <Text style={styles.ringNum}>{loading ? '–' : streak}</Text>
            <Text style={styles.ringLabel}>day streak</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{loading ? '–' : totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{loading ? '–' : minutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>This week</Text>
          <View style={styles.weekRow}>
            {WEEK.map((label, index) => {
              const date = new Date();
              date.setDate(date.getDate() - (adjustedToday - index));
              const key = date.toISOString().split('T')[0];
              const done = completedDays.includes(key);
              const isToday = index === adjustedToday;
              return (
                <View key={`${label}-${index}`} style={styles.dayCol}>
                  <View style={[styles.day, done && styles.dayDone, isToday && styles.dayToday]}>
                    <Text style={[styles.dayText, done && styles.dayTextDone]}>{label}</Text>
                  </View>
                  <Text style={styles.dayNum}>{date.getDate()}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent</Text>
          {completedDays.length === 0 ? (
            <Text style={styles.hint}>Complete a workout to start tracking.</Text>
          ) : (
            completedDays.slice(-5).reverse().map((dayKey) => (
              <Text key={dayKey} style={styles.metric}>
                {formatProgressDate(dayKey)}
              </Text>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: space.xxl },
  eyebrow: { color: colors.lime, fontSize: type.caption, fontWeight: '700', paddingHorizontal: space.xl, paddingTop: space.lg },
  title: { color: colors.text, fontSize: type.display, fontWeight: '800', paddingHorizontal: space.xl, marginTop: space.xs },
  ringWrap: { alignItems: 'center', marginTop: space.xl },
  ring: {
    width: 148,
    height: 148,
    borderRadius: 74,
    borderWidth: 10,
    borderColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  ringNum: { color: colors.text, fontSize: 42, fontWeight: '800' },
  ringLabel: { color: colors.muted, fontSize: type.caption, fontWeight: '700' },
  statsRow: { flexDirection: 'row', paddingHorizontal: space.xl, gap: space.md, marginTop: space.xl },
  stat: { flex: 1, backgroundColor: colors.card, padding: space.lg, borderRadius: 18, alignItems: 'center' },
  statNum: { color: colors.lime, fontSize: 28, fontWeight: '800' },
  statLabel: { color: colors.muted, marginTop: space.xs, fontSize: type.label },
  card: { backgroundColor: colors.card, marginHorizontal: space.xl, marginTop: space.lg, padding: space.lg, borderRadius: 18 },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: space.md },
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
  dayDone: { backgroundColor: colors.lime },
  dayToday: { borderWidth: 2, borderColor: colors.text },
  dayText: { color: colors.muted, fontWeight: '700' },
  dayTextDone: { color: colors.ink },
  dayNum: { color: colors.faint, fontSize: type.caption },
  metric: { color: colors.text, marginVertical: space.xs, fontSize: type.body },
  hint: { color: colors.muted, fontSize: type.label, lineHeight: 22 },
});
