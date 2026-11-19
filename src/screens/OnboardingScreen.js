import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Ring from '../components/Ring';
import { useProfile } from '../context/ProfileContext';
import { usePro } from '../context/ProContext';
import {
  AGE_BANDS,
  DAYS_OPTIONS,
  EQUIPMENT,
  EQUIPMENT_PRESETS,
  FOCUS_AREAS,
  GOALS,
  LEVELS,
  MINUTES_OPTIONS,
  buildSession,
  cmToFtIn,
  goalTitle,
  kgToLb,
  levelTitle,
} from '../lib/personalize';
import { colors, eyebrow, hit, radius, shadow, space, type } from '../theme';

const STEPS = ['welcome', 'goal', 'level', 'body', 'equipment', 'schedule', 'focus', 'building', 'summary'];
const COUNTED = ['goal', 'level', 'body', 'equipment', 'schedule', 'focus'];

function Option({ icon, title, sub, selected, onPress, testID }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.option, selected && styles.optionOn]}
      testID={testID}
    >
      <View style={[styles.optionIcon, selected && styles.optionIconOn]}>
        <Ionicons name={icon} size={22} color={selected ? colors.onAccent : colors.accent} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.optionTitle}>{title}</Text>
        {sub ? <Text style={styles.optionSub}>{sub}</Text> : null}
      </View>
      <View style={[styles.check, selected && styles.checkOn]}>
        {selected ? <Ionicons name="checkmark" size={16} color={colors.onAccent} /> : null}
      </View>
    </TouchableOpacity>
  );
}

function Chip({ label, selected, onPress, testID }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipOn]}
      testID={testID}
    >
      <Text style={[styles.chipText, selected && styles.chipTextOn]}>{label}</Text>
    </TouchableOpacity>
  );
}

function Stepper({ label, value, unit, onMinus, onPlus, onMinusBig, onPlusBig, testID }) {
  return (
    <View style={styles.stepCard}>
      <Text style={styles.eyebrow}>{label}</Text>
      <View style={styles.stepRow}>
        <View style={styles.stepBtns}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={`${label} much less`} style={styles.stepBtn} onPress={onMinusBig}>
            <Text style={styles.stepBtnText}>−5</Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={`${label} less`} style={styles.stepBtn} onPress={onMinus} testID={`${testID}-minus`}>
            <Ionicons name="remove" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.stepValueWrap}>
          <Text style={styles.stepValue} testID={`${testID}-value`}>{value}</Text>
          <Text style={styles.stepUnit}>{unit}</Text>
        </View>
        <View style={styles.stepBtns}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={`${label} more`} style={styles.stepBtn} onPress={onPlus} testID={`${testID}-plus`}>
            <Ionicons name="add" size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={`${label} much more`} style={styles.stepBtn} onPress={onPlusBig}>
            <Text style={styles.stepBtnText}>+5</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function Building({ onDone }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = progress.addListener(({ value: v }) => setValue(v));
    Animated.timing(progress, { toValue: 1, duration: 2400, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start(
      ({ finished }) => finished && onDone()
    );
    return () => progress.removeListener(id);
  }, []);
  const lines = ['Matching your goal', 'Choosing exercises for your gear', 'Balancing your week'];
  return (
    <View style={styles.buildWrap} testID="onboarding-building">
      <Ring size={190} thickness={12} progress={value} color={colors.accent} track={colors.raised}>
        <Text style={styles.buildPct}>{Math.round(value * 100)}%</Text>
      </Ring>
      <Text style={[styles.h1, { textAlign: 'center', marginTop: space.xxl }]}>Building your plan</Text>
      <View style={{ marginTop: space.lg, gap: space.md }}>
        {lines.map((line, i) => {
          const done = value > (i + 1) / lines.length - 0.05;
          return (
            <View key={line} style={styles.buildLine}>
              <Ionicons name={done ? 'checkmark-circle' : 'ellipse-outline'} size={20} color={done ? colors.accent : colors.faint} />
              <Text style={[styles.buildText, done && { color: colors.text }]}>{line}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function OnboardingScreen({ navigation, route }) {
  const edit = !!route?.params?.edit;
  const { profile, save, setPendingPaywall } = useProfile();
  const { isPro } = usePro();
  const [draft, setDraft] = useState({ ...profile });
  const [step, setStep] = useState(edit ? 'goal' : 'welcome');
  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));

  const order = edit ? COUNTED : STEPS;
  const pos = order.indexOf(step);
  const countedPos = COUNTED.indexOf(step);

  const canContinue =
    (step === 'goal' && !!draft.goal) ||
    (step === 'level' && !!draft.level) ||
    (step === 'equipment' && draft.equipment.length > 0) ||
    !['goal', 'level', 'equipment'].includes(step);

  const finish = async (openPaywall) => {
    await save({ ...draft, onboarded: true });
    if (edit) {
      navigation.goBack();
      return;
    }
    setPendingPaywall(!!openPaywall);
  };

  const goNext = () => {
    if (edit && step === 'focus') {
      finish(false);
      return;
    }
    setStep(order[pos + 1]);
  };
  const goBack = () => {
    if (pos > 0) setStep(order[pos - 1]);
    else if (edit) navigation.goBack();
  };

  const session = useMemo(
    () => buildSession({ ...draft, level: isPro ? draft.level : 'beginner' }, 0),
    [draft, isPro]
  );

  const metric = draft.unit === 'metric';
  const { ft, inch } = cmToFtIn(draft.heightCm);

  const toggleEquip = (id) => {
    if (id === 'bodyweight') return;
    const has = draft.equipment.includes(id);
    set({ equipment: has ? draft.equipment.filter((e) => e !== id) : [...draft.equipment, id] });
  };
  const toggleFocus = (id) => {
    const has = draft.focus.includes(id);
    if (!has && draft.focus.length >= 2) return;
    set({ focus: has ? draft.focus.filter((f) => f !== id) : [...draft.focus, id] });
  };

  const showChrome = !['welcome', 'building', 'summary'].includes(step);

  return (
    <SafeAreaView style={styles.container} testID="onboarding">
      {showChrome ? (
        <View style={styles.top}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Back" style={styles.backHit} onPress={goBack} testID="onboarding-back">
            <Ionicons name={edit && pos === 0 ? 'close' : 'chevron-back'} size={22} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.segments}>
            {COUNTED.map((id, i) => (
              <View key={id} style={[styles.segment, i <= countedPos && styles.segmentOn]} />
            ))}
          </View>
          <Text style={styles.count}>{countedPos + 1}/{COUNTED.length}</Text>
        </View>
      ) : null}

      {step === 'welcome' ? (
        <View style={styles.welcome} testID="onboarding-welcome">
          <View style={styles.heroRing}>
            <Ring size={220} thickness={14} progress={0.72} color={colors.accent} track={colors.raised}>
              <Ionicons name="barbell" size={64} color={colors.accent} />
            </Ring>
          </View>
          <Text style={styles.eyebrowAccent}>MOMENTUM · MEN'S WORKOUT</Text>
          <Text style={styles.heroTitle}>Training that fits you</Text>
          <Text style={styles.heroSub}>Answer a few taps and get sessions matched to your goal, level and equipment.</Text>
          <TouchableOpacity accessibilityRole="button" style={styles.primary} onPress={goNext} testID="onboarding-start">
            <Text style={styles.primaryText}>GET STARTED</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.onAccent} />
          </TouchableOpacity>
          <Text style={styles.tiny}>Takes about a minute. No typing.</Text>
        </View>
      ) : null}

      {step === 'goal' ? (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.h1}>What is your goal?</Text>
          <Text style={styles.lead}>Pick the one that matters most right now.</Text>
          {GOALS.map((g) => (
            <Option key={g.id} icon={g.icon} title={g.title} sub={g.sub} selected={draft.goal === g.id} onPress={() => set({ goal: g.id })} testID={`goal-${g.id}`} />
          ))}
        </ScrollView>
      ) : null}

      {step === 'level' ? (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.h1}>Your experience</Text>
          <Text style={styles.lead}>This sets how hard your exercises get.</Text>
          {LEVELS.map((l) => (
            <Option key={l.id} icon={l.icon} title={l.title} sub={l.sub} selected={draft.level === l.id} onPress={() => set({ level: l.id })} testID={`level-${l.id}`} />
          ))}
        </ScrollView>
      ) : null}

      {step === 'body' ? (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.h1}>About you</Text>
          <Text style={styles.lead}>Used to size your sessions and estimate energy. Stays on this device.</Text>

          <View style={styles.unitRow}>
            <Chip label="Metric (cm, kg)" selected={metric} onPress={() => set({ unit: 'metric' })} testID="unit-metric" />
            <Chip label="Imperial (ft, lb)" selected={!metric} onPress={() => set({ unit: 'imperial' })} testID="unit-imperial" />
          </View>

          <Stepper
            label="HEIGHT"
            testID="height"
            value={metric ? draft.heightCm : `${ft}′ ${inch}″`}
            unit={metric ? 'cm' : ''}
            onMinus={() => set({ heightCm: Math.max(120, draft.heightCm - (metric ? 1 : 2.54)) })}
            onPlus={() => set({ heightCm: Math.min(230, draft.heightCm + (metric ? 1 : 2.54)) })}
            onMinusBig={() => set({ heightCm: Math.max(120, draft.heightCm - 5) })}
            onPlusBig={() => set({ heightCm: Math.min(230, draft.heightCm + 5) })}
          />
          <Stepper
            label="WEIGHT"
            testID="weight"
            value={metric ? Math.round(draft.weightKg) : kgToLb(draft.weightKg)}
            unit={metric ? 'kg' : 'lb'}
            onMinus={() => set({ weightKg: Math.max(40, draft.weightKg - (metric ? 1 : 0.4536)) })}
            onPlus={() => set({ weightKg: Math.min(200, draft.weightKg + (metric ? 1 : 0.4536)) })}
            onMinusBig={() => set({ weightKg: Math.max(40, draft.weightKg - (metric ? 5 : 2.268)) })}
            onPlusBig={() => set({ weightKg: Math.min(200, draft.weightKg + (metric ? 5 : 2.268)) })}
          />

          <Text style={[styles.eyebrow, { marginTop: space.xl }]}>AGE</Text>
          <View style={styles.chipWrap}>
            {AGE_BANDS.map((band) => (
              <Chip key={band} label={band} selected={draft.ageBand === band} onPress={() => set({ ageBand: band })} testID={`age-${band}`} />
            ))}
          </View>
        </ScrollView>
      ) : null}

      {step === 'equipment' ? (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.h1}>What can you train with?</Text>
          <Text style={styles.lead}>Start with a preset, then adjust. We only pick exercises you can do.</Text>
          <View style={styles.chipWrap}>
            {EQUIPMENT_PRESETS.map((p) => {
              const on = p.equipment.length === draft.equipment.length && p.equipment.every((e) => draft.equipment.includes(e));
              return <Chip key={p.id} label={p.title} selected={on} onPress={() => set({ equipment: p.equipment })} testID={`preset-${p.id}`} />;
            })}
          </View>
          <View style={{ height: space.md }} />
          {EQUIPMENT.map((e) => (
            <Option
              key={e.id}
              icon={e.icon}
              title={e.title}
              sub={e.id === 'bodyweight' ? 'Always included' : null}
              selected={draft.equipment.includes(e.id)}
              onPress={() => toggleEquip(e.id)}
              testID={`equip-${e.id}`}
            />
          ))}
        </ScrollView>
      ) : null}

      {step === 'schedule' ? (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.h1}>Your schedule</Text>
          <Text style={styles.lead}>Be realistic. Consistency beats intensity.</Text>
          <Text style={styles.eyebrow}>DAYS PER WEEK</Text>
          <View style={styles.chipWrap}>
            {DAYS_OPTIONS.map((d) => (
              <Chip key={d} label={`${d}`} selected={draft.days === d} onPress={() => set({ days: d })} testID={`days-${d}`} />
            ))}
          </View>
          <Text style={[styles.eyebrow, { marginTop: space.xl }]}>MINUTES PER SESSION</Text>
          <View style={styles.chipWrap}>
            {MINUTES_OPTIONS.map((m) => (
              <Chip key={m} label={`${m} min`} selected={draft.minutes === m} onPress={() => set({ minutes: m })} testID={`minutes-${m}`} />
            ))}
          </View>
        </ScrollView>
      ) : null}

      {step === 'focus' ? (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <Text style={styles.h1}>Anything to focus on?</Text>
          <Text style={styles.lead}>Pick up to two, or skip. We will give them extra volume.</Text>
          <View style={styles.chipWrap}>
            {FOCUS_AREAS.map((f) => (
              <Chip key={f.id} label={f.title} selected={draft.focus.includes(f.id)} onPress={() => toggleFocus(f.id)} testID={`focus-${f.id}`} />
            ))}
          </View>
        </ScrollView>
      ) : null}

      {step === 'building' ? <Building onDone={() => setStep('summary')} /> : null}

      {step === 'summary' ? (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false} testID="onboarding-summary">
          <Text style={styles.eyebrowAccent}>YOUR PLAN IS READY</Text>
          <Text style={styles.h1}>What you get</Text>

          <View style={styles.sumCard}>
            <Text style={styles.sumKicker}>{goalTitle(draft.goal).toUpperCase()} · {levelTitle(isPro ? draft.level : 'beginner').toUpperCase()}</Text>
            <Text style={styles.sumTitle}>{session.title}</Text>
            <View style={styles.sumStats}>
              <View style={styles.sumStat}><Text style={styles.sumNum}>{session.minutes}</Text><Text style={styles.sumLab}>MIN</Text></View>
              <View style={styles.sumStat}><Text style={styles.sumNum}>{session.count}</Text><Text style={styles.sumLab}>MOVES</Text></View>
              <View style={styles.sumStat}><Text style={styles.sumNum}>{draft.days}</Text><Text style={styles.sumLab}>DAYS/WK</Text></View>
              <View style={styles.sumStat}><Text style={styles.sumNum}>~{session.kcal}</Text><Text style={styles.sumLab}>KCAL*</Text></View>
            </View>
            <Text style={styles.sumList} numberOfLines={3}>{session.exercises.map((e) => e.name).join('  ·  ')}</Text>
          </View>

          {[
            ['sparkles', 'Sessions that rotate through your week, matched to your gear'],
            ['timer', 'Every move has a timer or rep counter and form cues'],
            ['flame', 'Streaks and progress saved on this device'],
          ].map(([icon, text]) => (
            <View key={text} style={styles.benefit}>
              <View style={styles.benefitIcon}><Ionicons name={icon} size={18} color={colors.accent} /></View>
              <Text style={styles.benefitText}>{text}</Text>
            </View>
          ))}

          {!isPro && draft.level !== 'beginner' ? (
            <View style={styles.proNote}>
              <Text style={styles.proNoteText}>
                Free sessions use beginner-level moves. Pro unlocks your {levelTitle(draft.level).toLowerCase()} sessions and the custom workout builder.
              </Text>
            </View>
          ) : null}
          <Text style={styles.fine}>*Rough estimate only. Momentum does not give medical, diet or weight-loss advice.</Text>

          <TouchableOpacity accessibilityRole="button" style={styles.primary} onPress={() => finish(false)} testID="onboarding-free">
            <Text style={styles.primaryText}>START FREE</Text>
          </TouchableOpacity>
          {!isPro ? (
            <TouchableOpacity accessibilityRole="button" style={styles.secondary} onPress={() => finish(true)} testID="onboarding-pro">
              <Text style={styles.secondaryText}>SEE PRO OPTIONS</Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      ) : null}

      {showChrome ? (
        <View style={styles.footer}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ disabled: !canContinue }}
            disabled={!canContinue}
            style={[styles.primary, !canContinue && styles.primaryOff]}
            onPress={goNext}
            testID="onboarding-continue"
          >
            <Text style={styles.primaryText}>{edit && step === 'focus' ? 'SAVE' : step === 'focus' ? 'BUILD MY PLAN' : 'CONTINUE'}</Text>
            <Ionicons name={edit && step === 'focus' ? 'checkmark' : 'arrow-forward'} size={18} color={colors.onAccent} />
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  top: { flexDirection: 'row', alignItems: 'center', gap: space.md, paddingHorizontal: space.lg, paddingTop: space.sm },
  backHit: { width: hit, height: hit, borderRadius: hit / 2, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', ...shadow },
  segments: { flex: 1, flexDirection: 'row', gap: 4 },
  segment: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.line },
  segmentOn: { backgroundColor: colors.accent },
  count: { ...eyebrow, minWidth: 28, textAlign: 'right' },
  body: { padding: space.xl, paddingBottom: space.xxl },
  h1: { color: colors.text, fontSize: type.display, fontWeight: '800' },
  lead: { color: colors.muted, fontSize: type.label, lineHeight: 22, marginTop: space.xs, marginBottom: space.lg },
  eyebrow,
  eyebrowAccent: { ...eyebrow, color: colors.accent, marginBottom: space.sm },
  option: { flexDirection: 'row', alignItems: 'center', gap: space.md, backgroundColor: colors.card, borderRadius: radius.tile, padding: space.lg, marginBottom: space.md, minHeight: 72, borderWidth: 2, borderColor: 'transparent', ...shadow },
  optionOn: { borderColor: colors.accent },
  optionIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
  optionIconOn: { backgroundColor: colors.accent },
  optionTitle: { color: colors.text, fontSize: type.body, fontWeight: '800' },
  optionSub: { color: colors.muted, fontSize: type.caption, marginTop: 2 },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, marginTop: space.sm },
  chip: { minHeight: hit, paddingHorizontal: space.xl, borderRadius: radius.pill, backgroundColor: colors.card, borderWidth: 2, borderColor: 'transparent', alignItems: 'center', justifyContent: 'center', ...shadow },
  chipOn: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  chipText: { color: colors.text, fontWeight: '700', fontSize: type.label },
  chipTextOn: { color: colors.accent },
  unitRow: { flexDirection: 'row', gap: space.sm, marginBottom: space.lg },
  stepCard: { backgroundColor: colors.card, borderRadius: radius.card, padding: space.xl, marginBottom: space.md, ...shadow },
  stepRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: space.md },
  stepBtns: { flexDirection: 'row', gap: space.sm },
  stepBtn: { width: hit + 4, height: hit + 4, borderRadius: (hit + 4) / 2, backgroundColor: colors.raised, alignItems: 'center', justifyContent: 'center' },
  stepBtnText: { color: colors.text, fontWeight: '800', fontSize: type.caption },
  stepValueWrap: { alignItems: 'center', minWidth: 84 },
  stepValue: { color: colors.text, fontSize: 36, fontWeight: '800', fontVariant: ['tabular-nums'] },
  stepUnit: { color: colors.faint, fontSize: type.caption, fontWeight: '700', minHeight: 16 },
  footer: { padding: space.xl, paddingTop: space.md },
  primary: { minHeight: 56, borderRadius: radius.button, backgroundColor: colors.accent, flexDirection: 'row', gap: space.sm, alignItems: 'center', justifyContent: 'center', marginTop: space.lg },
  primaryOff: { opacity: 0.4 },
  primaryText: { color: colors.onAccent, fontSize: type.label, fontWeight: '800', letterSpacing: 1 },
  secondary: { minHeight: 52, borderRadius: radius.button, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', marginTop: space.md, ...shadow },
  secondaryText: { color: colors.accent, fontSize: type.label, fontWeight: '800', letterSpacing: 1 },
  welcome: { flex: 1, padding: space.xl, justifyContent: 'center' },
  heroRing: { alignItems: 'center', marginBottom: space.xxl },
  heroTitle: { color: colors.text, fontSize: 36, fontWeight: '800', lineHeight: 42 },
  heroSub: { color: colors.muted, fontSize: type.body, lineHeight: 24, marginTop: space.md },
  tiny: { color: colors.faint, fontSize: type.caption, textAlign: 'center', marginTop: space.md },
  buildWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl },
  buildPct: { color: colors.text, fontSize: 40, fontWeight: '800', fontVariant: ['tabular-nums'] },
  buildLine: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  buildText: { color: colors.faint, fontSize: type.label, fontWeight: '600' },
  sumCard: { backgroundColor: colors.card, borderRadius: radius.card, padding: space.xl, marginTop: space.lg, marginBottom: space.lg, ...shadow },
  sumKicker: { ...eyebrow, color: colors.accent },
  sumTitle: { color: colors.text, fontSize: type.title, fontWeight: '800', marginTop: space.sm },
  sumStats: { flexDirection: 'row', marginTop: space.lg },
  sumStat: { flex: 1 },
  sumNum: { color: colors.text, fontSize: 26, fontWeight: '800' },
  sumLab: { ...eyebrow, fontSize: 10, marginTop: 2 },
  sumList: { color: colors.muted, fontSize: type.caption, lineHeight: 20, marginTop: space.lg },
  benefit: { flexDirection: 'row', alignItems: 'center', gap: space.md, marginBottom: space.md },
  benefitIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.accentSoft, alignItems: 'center', justifyContent: 'center' },
  benefitText: { flex: 1, color: colors.text, fontSize: type.label, lineHeight: 20, fontWeight: '600' },
  proNote: { backgroundColor: colors.accentSoft, borderRadius: radius.tile, padding: space.lg, marginTop: space.sm },
  proNoteText: { color: colors.text, fontSize: type.caption, lineHeight: 18 },
  fine: { color: colors.faint, fontSize: 11, lineHeight: 16, marginTop: space.md },
});
