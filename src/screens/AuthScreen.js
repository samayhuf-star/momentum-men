import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const { signInAsGuest } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGuest = async () => {
    setLoading(true);
    await signInAsGuest();
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Momentum</Text>
      <Text style={styles.tagline}>Men's Workout</Text>
      <Text style={styles.note}>Train with a timer or by reps. Progress stays on this device. No account is required.</Text>
      <TouchableOpacity accessibilityRole="button" style={styles.primaryBtn} onPress={handleGuest} disabled={loading} testID="continue-as-guest">
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.primaryText}>Continue as Guest</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f', padding: 24, justifyContent: 'center' },
  logo: { color: '#fff', fontSize: 40, fontWeight: 'bold', textAlign: 'center' },
  tagline: { color: '#a3e635', fontSize: 18, textAlign: 'center', marginTop: 8 },
  note: { color: '#a1a1aa', textAlign: 'center', marginTop: 24, marginBottom: 32, lineHeight: 22 },
  primaryBtn: { backgroundColor: '#a3e635', padding: 16, borderRadius: 16, alignItems: 'center' },
  primaryText: { color: '#000', fontWeight: '700', fontSize: 16 },
});
