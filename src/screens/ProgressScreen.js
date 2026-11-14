import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useProgress } from '../context/ProgressContext';

export default function ProgressScreen() {
  const { streak, totalWorkouts, completedDays, loading } = useProgress();

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Consistency beats perfection</Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{loading ? '-' : streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{loading ? '-' : totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Week</Text>
          <View style={styles.weekRow}>
            {weekDays.map((d, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (adjustedToday - i));
              const key = date.toISOString().split('T')[0];
              const done = completedDays.includes(key);
              return (
                <View key={i} style={[styles.day, done && styles.dayDone]}>
                  <Text style={[styles.dayText, done && { color: '#000' }]}>{d}</Text>
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
            completedDays.slice(-5).reverse().map((d) => (
              <Text key={d} style={styles.metric}>
                {d}
              </Text>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  title: { color: '#fff', fontSize: 32, fontWeight: 'bold', padding: 20 },
  subtitle: { color: '#a1a1aa', paddingHorizontal: 20, marginBottom: 20 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 12 },
  stat: { flex: 1, backgroundColor: '#18181b', padding: 20, borderRadius: 16, alignItems: 'center' },
  statNum: { color: '#a3e635', fontSize: 28, fontWeight: 'bold' },
  statLabel: { color: '#a1a1aa', marginTop: 4 },
  card: { backgroundColor: '#18181b', margin: 20, padding: 16, borderRadius: 16 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginBottom: 12 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  day: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#27272a', alignItems: 'center', justifyContent: 'center' },
  dayDone: { backgroundColor: '#a3e635' },
  dayText: { color: '#a1a1aa', fontWeight: '600' },
  metric: { color: '#fff', marginVertical: 4 },
  hint: { color: '#a1a1aa', marginTop: 4, fontSize: 14 },
});
