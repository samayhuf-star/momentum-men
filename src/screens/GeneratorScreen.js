import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { visibleExercises } from '../data/workouts';
import { usePro } from '../context/ProContext';

export default function GeneratorScreen({ navigation }) {
  const { isPro } = usePro();
  const [selected, setSelected] = useState([]);
  const [duration, setDuration] = useState(15);

  const toggle = (id) => {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };

  const startCustom = () => {
    if (!isPro) {
      navigation.navigate('Paywall');
      return;
    }
    if (selected.length === 0) return;
    navigation.navigate('Workout', { custom: true, exercises: selected, duration });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Custom Generator</Text>
        <Text style={styles.subtitle}>Build your own core session</Text>

        <Text style={styles.label}>Duration: {duration} min</Text>
        <View style={styles.durRow}>
          {[10, 15, 20, 25].map(d => (
            <TouchableOpacity key={d} style={[styles.durBtn, duration === d && styles.durActive]} onPress={() => setDuration(d)}>
              <Text style={styles.durText}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Select Exercises</Text>
        {visibleExercises.map(ex => (
          <TouchableOpacity
            key={ex.id}
            style={[styles.exCard, selected.includes(ex.id) && styles.exSelected]}
            onPress={() => toggle(ex.id)}
          >
            <Text style={styles.exName}>{ex.name}</Text>
            <Text style={styles.exLevel}>{ex.level}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.startBtn} onPress={startCustom}>
          <Text style={styles.startText}>Start Custom Workout ({selected.length})</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  title: { color: '#fff', fontSize: 32, fontWeight: 'bold', padding: 20 },
  subtitle: { color: '#a1a1aa', paddingHorizontal: 20, marginBottom: 16 },
  label: { color: '#fff', fontSize: 16, fontWeight: '600', paddingHorizontal: 20, marginTop: 16 },
  durRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginTop: 8 },
  durBtn: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#27272a', borderRadius: 12 },
  durActive: { backgroundColor: '#a3e635' },
  durText: { color: '#fff', fontWeight: '600' },
  exCard: { backgroundColor: '#18181b', marginHorizontal: 20, marginTop: 10, padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between' },
  exSelected: { borderWidth: 2, borderColor: '#a3e635' },
  exName: { color: '#fff', fontWeight: '600' },
  exLevel: { color: '#a1a1aa', textTransform: 'capitalize' },
  startBtn: { backgroundColor: '#a3e635', margin: 20, padding: 16, borderRadius: 16, alignItems: 'center' },
  startText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});
