import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buy, loadPlans, restore } from '../lib/purchases';
import { ctaText, planLine, renewalDisclosure } from '../lib/introOffer';
import { APPLE_EULA_URL, FREE_FEATURES, PRIVACY_URL, PRO_FEATURES, TERMS_URL } from '../lib/pro';
import { usePro } from '../context/ProContext';

export default function PaywallScreen({ navigation }) {
  const { isPro, refresh } = usePro();
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const reload = async () => {
    setLoading(true);
    const result = await loadPlans();
    setPlans(result.plans);
    setError(result.error);
    setLoading(false);
  };

  useEffect(() => {
    reload();
  }, []);

  const onBuy = async (plan) => {
    if (busy) return;
    setBusy(true);
    const result = await buy(plan);
    setBusy(false);
    if (result === 'purchased') {
      await refresh();
      Alert.alert('Unlocked', 'Momentum Pro is now active on this Apple ID.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else if (result === 'cancelled') {
      return;
    } else if (result === 'pending') {
      Alert.alert('Pending', 'This purchase is waiting for approval. Pro will unlock when it completes.');
    } else {
      Alert.alert('Purchase failed', 'Please try again. If you already paid, use Restore.');
    }
  };

  const onRestore = async () => {
    if (busy) return;
    setBusy(true);
    const ok = await restore();
    setBusy(false);
    if (ok) {
      await refresh();
      Alert.alert('Restored', 'Your Momentum Pro purchase is active.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('No purchase found', 'No Momentum Pro purchase was found for this Apple ID.');
    }
  };

  const hasTrial = plans.some((p) => p.trialDays && p.trialDays > 0);
  const canBuy = plans.length > 0 && !busy;

  return (
    <SafeAreaView style={styles.container} testID="paywall">
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity accessibilityRole="button" style={styles.close} onPress={() => navigation.goBack()} testID="close-paywall">
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Momentum Pro</Text>
        <Text style={styles.subtitle}>Unlock every plan and the custom generator</Text>

        {isPro ? <Text style={styles.active}>Pro is already active on this Apple ID.</Text> : null}

        {FREE_FEATURES.map((item) => (
          <Text key={item} style={styles.benefit}>Free: {item}</Text>
        ))}
        {PRO_FEATURES.map((item) => (
          <Text key={item} style={styles.benefit}>Pro: {item}</Text>
        ))}

        {loading ? <ActivityIndicator color="#a3e635" style={{ marginTop: 24 }} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {plans.map((plan) => (
          <TouchableOpacity
            accessibilityRole="button"
            key={plan.id}
            style={[styles.offer, plan.kind === 'yearly' && styles.offerYear]}
            onPress={() => onBuy(plan)}
            disabled={!canBuy}
            testID={`buy-${plan.kind}`}
          >
            <Text style={styles.offerLabel}>{plan.label}</Text>
            <Text style={styles.offerLine}>{planLine(plan)}</Text>
            <Text style={styles.cta}>{ctaText(plan)}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity accessibilityRole="button" onPress={onRestore} disabled={busy} testID="restore">
          <Text style={styles.restore}>Restore purchases</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>{renewalDisclosure(hasTrial)}</Text>
        <View style={styles.links}>
          <Text style={styles.link} onPress={() => Linking.openURL(TERMS_URL)}>Terms</Text>
          <Text style={styles.sep}> · </Text>
          <Text style={styles.link} onPress={() => Linking.openURL(PRIVACY_URL)}>Privacy</Text>
          <Text style={styles.sep}> · </Text>
          <Text style={styles.link} onPress={() => Linking.openURL(APPLE_EULA_URL)}>Apple EULA</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  content: { padding: 20, paddingBottom: 40 },
  close: { alignSelf: 'flex-end', padding: 8 },
  closeText: { fontSize: 16, color: '#a3e635', fontWeight: '600' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginTop: 8, color: '#fff' },
  subtitle: { textAlign: 'center', color: '#a1a1aa', marginTop: 8, marginBottom: 16 },
  active: { textAlign: 'center', color: '#a3e635', marginBottom: 12 },
  benefit: { fontSize: 15, marginVertical: 4, color: '#fff' },
  error: { color: '#fca5a5', marginTop: 16, textAlign: 'center' },
  offer: { backgroundColor: '#18181b', borderRadius: 16, padding: 16, marginTop: 12, alignItems: 'center' },
  offerYear: { borderWidth: 1, borderColor: '#a3e635' },
  offerLabel: { color: '#a1a1aa', fontWeight: '600' },
  offerLine: { color: '#fff', fontSize: 16, marginTop: 6, textAlign: 'center' },
  cta: { color: '#a3e635', fontWeight: '700', marginTop: 8 },
  restore: { textAlign: 'center', color: '#a3e635', marginTop: 20, fontWeight: '600' },
  footer: { textAlign: 'center', color: '#71717a', marginTop: 16, fontSize: 12, lineHeight: 18 },
  links: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' },
  link: { color: '#a3e635', fontSize: 13 },
  sep: { color: '#71717a' },
});
