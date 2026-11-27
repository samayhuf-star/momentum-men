import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors, hit } from '../theme';
import { grantPushConsent } from '../lib/onesignal';

// Onboarding: 9 steps here + the paywall as screen 10 (navigated to at the end).
export const ONBOARDING_SCREENS = 10;
export const ONBOARDING_DONE_KEY = 'onboardingDone';
export const ONBOARDING_ANSWERS_KEY = 'onboardingAnswers';

const CHOICES = {
  goal: ['Build muscle', 'Lose fat', 'Get stronger', 'Stay consistent'],
  level: ['Beginner', 'Intermediate', 'Advanced'],
  days: ['2 days', '3 days', '4 days', '5+ days'],
  minutes: ['10 min', '20 min', '30 min', '45 min'],
  focus: ['Full body', 'Upper body', 'Core', 'Legs'],
};

const STEPS = [
  { kind: 'info', icon: 'flash', title: 'Welcome to Momentum', body: 'Bodyweight training built for men. No gym, no equipment, just a plan you can follow every day.' },
  { kind: 'pick', key: 'goal', title: 'What is your main goal?' },
  { kind: 'pick', key: 'level', title: 'How fit are you right now?' },
  { kind: 'pick', key: 'days', title: 'How many days a week can you train?' },
  { kind: 'pick', key: 'minutes', title: 'How long per session?' },
  { kind: 'pick', key: 'focus', title: 'Where do you want to focus?' },
  { kind: 'info', icon: 'timer', title: 'Guided every rep', body: 'A workout player with timers, rep counts and form cues on every exercise, so you always know what to do next.' },
  { kind: 'plan', icon: 'calendar', title: 'Your plan is ready' },
  { kind: 'push', icon: 'notifications', title: 'Stay on streak', body: 'Get a short reminder on your training days. You can change this anytime in Settings.' },
];

export default function OnboardingScreen({ navigation }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const s = STEPS[step];
  const selected = s.kind === 'pick' ? answers[s.key] : null;

  const next = async () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    try {
      await AsyncStorage.setItem(ONBOARDING_ANSWERS_KEY, JSON.stringify(answers));
    } catch {}
    navigation.replace('Paywall', { fromOnboarding: true });
  };

  const onPushYes = async () => {
    await grantPushConsent();
    next();
  };

  const plan = `${answers.level ?? 'Beginner'} 30-day plan · ${answers.days ?? '3 days'} a week · ${answers.minutes ?? '20 min'} sessions · ${answers.focus ?? 'Full body'} focus`;

  return (
    <SafeAreaView style={styles.container} testID={`onboarding-${step + 1}`}>
      <View style={styles.top}>
        {step > 0 ? (
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Back" style={styles.back} onPress={() => setStep(step - 1)} testID="onboarding-back">
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>
        ) : <View style={styles.back} />}
        <View style={styles.bar}>
          <View style={[styles.fill, { width: `${((step + 1) / ONBOARDING_SCREENS) * 100}%` }]} />
        </View>
        <Text style={styles.count}>{step + 1}/{ONBOARDING_SCREENS}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {s.icon ? <Ionicons name={s.icon} size={64} color={colors.lime} style={styles.icon} /> : null}
        <Text style={styles.title}>{s.title}</Text>
        {s.body ? <Text style={styles.body}>{s.body}</Text> : null}
        {s.kind === 'plan' ? <Text style={styles.plan}>{plan}</Text> : null}
        {s.kind === 'pick'
          ? CHOICES[s.key].map((c) => (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: selected === c }}
                key={c}
                style={[styles.choice, selected === c && styles.choiceOn]}
                onPress={() => setAnswers({ ...answers, [s.key]: c })}
                testID={`choice-${c}`}
              >
                <Text style={[styles.choiceText, selected === c && styles.choiceTextOn]}>{c}</Text>
              </TouchableOpacity>
            ))
          : null}
      </ScrollView>

      <View style={styles.footer}>
        {s.kind === 'push' ? (
          <>
            <TouchableOpacity accessibilityRole="button" style={styles.cta} onPress={onPushYes} testID="onboarding-push-yes">
              <Text style={styles.ctaText}>Turn on reminders</Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" style={styles.skip} onPress={next} testID="onboarding-push-no">
              <Text style={styles.skipText}>Not now</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.cta, s.kind === 'pick' && !selected && styles.ctaOff]}
            disabled={s.kind === 'pick' && !selected}
            onPress={next}
            testID="onboarding-next"
          >
            <Text style={styles.ctaText}>{step === 0 ? 'Get started' : 'Continue'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  top: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 8 },
  back: { width: hit, height: hit, alignItems: 'center', justifyContent: 'center' },
  bar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.raised, marginHorizontal: 8, overflow: 'hidden' },
  fill: { height: 6, backgroundColor: colors.lime },
  count: { color: colors.faint, fontSize: 13, minWidth: 40, textAlign: 'right' },
  content: { padding: 24, paddingTop: 40 },
  icon: { alignSelf: 'center', marginBottom: 24 },
  title: { color: colors.text, fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  body: { color: colors.faint, fontSize: 17, lineHeight: 24, textAlign: 'center', marginTop: 12 },
  plan: { color: colors.lime, fontSize: 17, lineHeight: 26, textAlign: 'center', marginTop: 16, fontWeight: '600' },
  choice: { minHeight: 56, borderRadius: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, justifyContent: 'center', paddingHorizontal: 20, marginTop: 12 },
  choiceOn: { borderColor: colors.lime, backgroundColor: colors.raised },
  choiceText: { color: colors.text, fontSize: 17 },
  choiceTextOn: { color: colors.lime, fontWeight: '700' },
  footer: { padding: 24, paddingBottom: 16 },
  cta: { minHeight: 56, borderRadius: 16, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center' },
  ctaOff: { opacity: 0.4 },
  ctaText: { color: colors.ink, fontSize: 17, fontWeight: '700' },
  skip: { minHeight: hit, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  skipText: { color: colors.faint, fontSize: 16 },
});
