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
import { buy, loadPlans, manageSubscriptions, restore } from '../lib/purchases';
import { ctaText, planLine, renewalDisclosure } from '../lib/introOffer';
import { APPLE_EULA_URL, FREE_FEATURES, PRIVACY_URL, PRO_FEATURES, TERMS_URL } from '../lib/pro';
import { usePro } from '../context/ProContext';
import { colors } from '../theme';

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

        {loading ? <ActivityIndicator color={colors.accent} style={{ marginTop: 24 }} /> : null}
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

        {isPro ? (
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.manage}
            onPress={() => manageSubscriptions()}
            disabled={busy}
            testID="manage-subscription"
          >
            <Text style={styles.manageText}>Manage Subscription</Text>
          </TouchableOpacity>
        ) : null}

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

const card = {
  shadowColor: '#1B1B1F',
  shadowOpacity: 0.06,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 24, paddingBottom: 40 },
  close: { alignSelf: 'flex-end', minHeight: 44, minWidth: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
  closeText: { fontSize: 15, color: colors.muted, fontWeight: '700' },
  title: { fontSize: 32, fontWeight: '800', textAlign: 'center', marginTop: 8, color: colors.text },
  subtitle: { textAlign: 'center', color: colors.muted, marginTop: 8, marginBottom: 20, fontSize: 15 },
  active: { textAlign: 'center', color: colors.accent, fontWeight: '700', marginBottom: 12 },
  benefit: { fontSize: 15, marginVertical: 5, color: colors.text, fontWeight: '500' },
  error: { color: '#B91C1C', marginTop: 16, textAlign: 'center' },
  offer: { backgroundColor: colors.card, borderRadius: 24, padding: 20, marginTop: 14, alignItems: 'center', borderWidth: 2, borderColor: 'transparent', ...card },
  offerYear: { borderColor: colors.accent },
  offerLabel: { color: colors.faint, fontWeight: '800', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' },
  offerLine: { color: colors.text, fontSize: 16, marginTop: 8, textAlign: 'center', fontWeight: '600' },
  cta: { color: colors.onAccent, backgroundColor: colors.accent, fontWeight: '800', marginTop: 14, overflow: 'hidden', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 20, textAlign: 'center', alignSelf: 'stretch' },
  manage: {
    minHeight: 48,
    marginTop: 20,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  manageText: { color: colors.accent, fontWeight: '800', fontSize: 16 },
  restore: { textAlign: 'center', color: colors.accent, marginTop: 16, fontWeight: '700', minHeight: 44 },
  footer: { textAlign: 'center', color: colors.faint, marginTop: 16, fontSize: 12, lineHeight: 18 },
  links: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' },
  link: { color: colors.accent, fontSize: 13, fontWeight: '600' },
  sep: { color: colors.faint },
});
