import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RevenueCatUI from 'react-native-purchases-ui';
import { initIAP, manageSubscriptions } from '../lib/purchases';
import { usePro } from '../context/ProContext';
import { colors } from '../theme';

// The paywall itself is RevenueCat's hosted paywall (designed in the RevenueCat dashboard,
// attached to the `default` offering). It shows price, period, trial, renewal terms,
// Terms, Privacy and Restore Purchases.
export default function PaywallScreen({ navigation }) {
  const { isPro, refresh } = usePro();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initIAP().then(() => setReady(true));
  }, []);

  const done = async () => {
    await refresh();
    navigation.goBack();
  };

  if (isPro) {
    return (
      <SafeAreaView style={styles.center} testID="paywall">
        <Text style={styles.title}>Momentum Pro is active</Text>
        <TouchableOpacity style={styles.btn} onPress={() => manageSubscriptions()} testID="manage-subscription">
          <Text style={styles.btnText}>Manage subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} testID="close-paywall">
          <Text style={styles.link}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!ready) {
    return (
      <SafeAreaView style={styles.center} testID="paywall">
        <ActivityIndicator color={colors.accent} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.fill} testID="paywall">
      <RevenueCatUI.Paywall
        options={{ displayCloseButton: true }}
        onDismiss={() => navigation.goBack()}
        onPurchaseCompleted={done}
        onRestoreCompleted={done}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, padding: 24 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 20 },
  btn: { backgroundColor: colors.accent, paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14, marginBottom: 16 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  link: { color: colors.muted, fontSize: 15 },
});
