import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';

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
      <Text style={styles.tagline}>MEN'S WORKOUT</Text>
      <Text style={styles.note}>Train with a timer or by reps. Progress stays on this device. No account is required.</Text>
      <TouchableOpacity accessibilityRole="button" style={styles.primaryBtn} onPress={handleGuest} disabled={loading} testID="continue-as-guest">
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>CONTINUE AS GUEST</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24, justifyContent: 'center' },
  logo: { color: colors.text, fontSize: 44, fontWeight: '800', textAlign: 'center' },
  tagline: { color: colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 2, textAlign: 'center', marginTop: 8 },
  note: { color: colors.muted, textAlign: 'center', marginTop: 24, marginBottom: 32, lineHeight: 22, fontSize: 15 },
  primaryBtn: { backgroundColor: colors.accent, minHeight: 56, padding: 16, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: colors.onAccent, fontWeight: '800', fontSize: 14, letterSpacing: 1 },
});
