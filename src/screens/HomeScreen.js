import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { plans } from '../data/workouts';
import { useAuth } from '../context/AuthContext';
import { usePro } from '../context/ProContext';
import { planRequiresPro } from '../lib/pro';

const TAB_EDGES = ['top', 'left', 'right'];

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const { isPro } = usePro();

  const openPlan = (key) => {
    if (planRequiresPro(key) && !isPro) {
      navigation.navigate('Paywall');
      return;
    }
    navigation.navigate('Workout', { plan: key });
  };

  return (
    <SafeAreaView style={styles.container} edges={TAB_EDGES} testID="home">
      <ScrollView>
        <View style={styles.headerRow}>
          <Text style={styles.logo}>Momentum</Text>
          <TouchableOpacity accessibilityRole="button" onPress={signOut} testID="sign-out">
            <Text style={styles.signOut}>{user?.isGuest ? 'Guest' : user?.name} · Sign out</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.tagline}>Timer or reps. Plans you can follow.</Text>

        <Text style={styles.section}>Choose Your Plan</Text>
        {Object.entries(plans).map(([key, plan]) => {
          const locked = planRequiresPro(key) && !isPro;
          return (
            <TouchableOpacity
              accessibilityRole="button"
              key={key}
              style={styles.card}
              onPress={() => openPlan(key)}
              testID={key === 'beginner' ? 'start-workout' : `plan-${key}`}
            >
              <Text style={styles.cardTitle}>{plan.name}{locked ? ' · Pro' : ''}</Text>
              <Text style={styles.cardDesc}>{plan.description}</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity accessibilityRole="button" style={styles.proBtn} onPress={() => navigation.navigate('Paywall')} testID="open-paywall">
          <Text style={styles.proText}>{isPro ? 'Momentum Pro is active' : 'Unlock Pro'}</Text>
        </TouchableOpacity>

        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate('Credits')} testID="open-credits">
          <Text style={styles.about}>About and Credits</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  logo: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 },
  signOut: { color: '#a1a1aa', fontSize: 13 },
  tagline: { color: '#a1a1aa', fontSize: 16, paddingHorizontal: 20, marginBottom: 24, marginTop: 8 },
  section: { color: '#fff', fontSize: 20, fontWeight: '600', paddingHorizontal: 20, marginBottom: 12 },
  card: { backgroundColor: '#18181b', marginHorizontal: 20, marginBottom: 12, padding: 16, borderRadius: 16 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  cardDesc: { color: '#a1a1aa', marginTop: 4 },
  proBtn: { backgroundColor: '#a3e635', margin: 20, padding: 16, borderRadius: 16, alignItems: 'center' },
  proText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  about: { color: '#a1a1aa', textAlign: 'center', marginBottom: 28, fontSize: 14 },
});
