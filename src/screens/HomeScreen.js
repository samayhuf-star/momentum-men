import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { plans } from '../data/workouts';
import { useAuth } from '../context/AuthContext';
import { usePro } from '../context/ProContext';
import { useProgress } from '../context/ProgressContext';
import { planRequiresPro } from '../lib/pro';
import { manageSubscriptions } from '../lib/purchases';
import { equipmentLabel, planDay, sessionFor } from '../lib/sessionPlan';
import { mediaFor } from '../lib/exerciseMediaMap';
import { colors, eyebrow, hit, levelColor, levelSoft, radius, shadow, space, type } from '../theme';

const TAB_EDGES = ['top', 'left', 'right'];
const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function weekKey(offsetFromToday) {
  const date = new Date();
  date.setDate(date.getDate() + offsetFromToday);
  return date.toISOString().split('T')[0];
}

function todayLabel() {
  return new Date()
    .toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
    .replace(',', '');
}

function Tile({ icon, label, value, unit }) {
  return (
    <View style={styles.tile}>
      <View style={styles.tileTop}>
        <Ionicons name={icon} size={18} color={colors.accent} />
        <Text style={styles.tileLabel}>{label}</Text>
      </View>
      <Text style={styles.tileValue}>
        {value}
        {unit ? <Text style={styles.tileUnit}> {unit}</Text> : null}
      </Text>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const { isPro } = usePro();
  const { completedDays, totalWorkouts, totalSeconds, streak, loading } = useProgress();
  const todayPlan = 'beginner';
  const session = sessionFor(todayPlan);
  const day = planDay(totalWorkouts, plans.beginner.days);
  const cover = mediaFor(session.coverId);
  const minutes = Math.round((totalSeconds || 0) / 60);

  const openPlan = (key) => {
    if (planRequiresPro(key) && !isPro) {
      navigation.navigate('Paywall');
      return;
    }
    navigation.navigate('Workout', { plan: key });
  };

  const mondayOffset = -((new Date().getDay() + 6) % 7);
  const todayIndex = (new Date().getDay() + 6) % 7;

  return (
    <SafeAreaView style={styles.container} edges={TAB_EDGES} testID="home">
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>{todayLabel()}</Text>
            <Text style={styles.title}>Today</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.proPill}
              onPress={() => navigation.navigate('Paywall')}
              testID="open-paywall"
            >
              <Text style={styles.proPillText}>{isPro ? 'Pro active' : 'Go Pro'}</Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" onPress={signOut} style={styles.avatar} testID="sign-out">
              <Text style={styles.avatarText}>{(user?.isGuest ? 'G' : user?.name || 'M').slice(0, 1).toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isPro ? (
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.manage}
            onPress={() => manageSubscriptions()}
            testID="manage-subscription-home"
          >
            <Text style={styles.manageText}>Manage Subscription</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.todayCard}>
          <View style={styles.todayTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dayLabel}>Day {loading ? '–' : day} of {plans.beginner.days}</Text>
              <Text style={styles.todayTitle}>{plans.beginner.name}</Text>
              <Text style={styles.todayMeta}>
                {session.minutes} min · {session.count} exercises
              </Text>
            </View>
            {cover?.start ? (
              <View style={styles.coverTile}>
                <Image source={cover.start} style={styles.cover} resizeMode="cover" />
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.start}
            onPress={() => openPlan(todayPlan)}
            testID="start-workout"
          >
            <Ionicons name="play" size={16} color={colors.onAccent} />
            <Text style={styles.startText}>START WORKOUT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tileRow}>
          <Tile icon="flame" label="STREAK" value={loading ? '–' : streak} unit="days" />
          <Tile icon="barbell" label="DONE" value={loading ? '–' : totalWorkouts} unit="total" />
          <Tile icon="time" label="TIME" value={loading ? '–' : minutes} unit="min" />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Text style={styles.cardTitle}>This week</Text>
            <Text style={styles.cardSub}>{Math.min(totalWorkouts, 30)}/30 days</Text>
          </View>
          <View style={styles.weekRow}>
            {WEEK.map((label, index) => {
              const key = weekKey(mondayOffset + index);
              const done = completedDays.includes(key);
              const isToday = index === todayIndex;
              return (
                <View key={`${label}-${index}`} style={styles.weekCol}>
                  <View style={[styles.weekDay, done && styles.weekDayDone, isToday && !done && styles.weekDayToday]}>
                    {done ? (
                      <Ionicons name="checkmark" size={16} color={colors.onAccent} />
                    ) : (
                      <Text style={[styles.weekText, isToday && styles.weekTextToday]}>{label}</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.monthRow} accessibilityLabel="30 day progress">
            {Array.from({ length: 30 }, (_, index) => (
              <View key={index} style={[styles.monthDot, index < Math.min(totalWorkouts, 30) && styles.monthDotDone]} />
            ))}
          </View>
        </View>

        <Text style={styles.section} testID="plans">Plans</Text>
        {Object.entries(plans).map(([key, plan]) => {
          const locked = planRequiresPro(key) && !isPro;
          const info = sessionFor(key);
          return (
            <TouchableOpacity
              accessibilityRole="button"
              key={key}
              style={styles.planCard}
              onPress={() => openPlan(key)}
              testID={`plan-${key}`}
            >
              <View style={[styles.planIcon, { backgroundColor: levelSoft[key] || colors.accentSoft }]}>
                <Ionicons name="barbell" size={22} color={levelColor[key] || colors.accent} />
              </View>
              <View style={styles.planCopy}>
                <View style={styles.planTitleRow}>
                  <Text style={styles.planTitle}>{plan.name}</Text>
                  {locked ? <Text style={styles.lockBadge}>PRO</Text> : null}
                </View>
                <Text style={styles.planMeta}>
                  {plan.days} days · {info.minutes} min · {key}
                </Text>
                <Text style={styles.planGear}>{equipmentLabel(info.list)}</Text>
                <Text style={styles.planDesc}>{plan.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.faint} />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate('Credits')} style={styles.creditsHit} testID="open-credits">
          <Text style={styles.credits}>About and Credits</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingBottom: space.xxl },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: space.xl,
    paddingTop: space.lg,
  },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  eyebrow,
  title: { color: colors.text, fontSize: type.display, fontWeight: '800', marginTop: 2 },
  proPill: {
    minHeight: 36,
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proPillText: { color: colors.accent, fontWeight: '800', fontSize: type.caption, letterSpacing: 0.4 },
  avatar: {
    width: hit,
    height: hit,
    borderRadius: hit / 2,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  avatarText: { color: colors.text, fontWeight: '800', fontSize: type.body },
  manage: { minHeight: hit, marginHorizontal: space.xl, justifyContent: 'center' },
  manageText: { color: colors.accent, fontWeight: '700', fontSize: type.label },
  todayCard: {
    marginHorizontal: space.xl,
    marginTop: space.lg,
    backgroundColor: colors.card,
    borderRadius: radius.card,
    padding: space.xl,
    ...shadow,
  },
  todayTop: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  dayLabel: { ...eyebrow, color: colors.accent },
  todayTitle: { color: colors.text, fontSize: type.title, fontWeight: '800', marginTop: space.sm },
  todayMeta: { color: colors.muted, fontSize: type.label, marginTop: space.xs },
  coverTile: {
    width: 88,
    height: 88,
    borderRadius: radius.tile,
    backgroundColor: '#0B0B0C',
    overflow: 'hidden',
  },
  cover: { width: '100%', height: '100%' },
  start: {
    marginTop: space.xl,
    minHeight: 56,
    backgroundColor: colors.accent,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: space.sm,
  },
  startText: { color: colors.onAccent, fontSize: type.label, fontWeight: '800', letterSpacing: 1 },
  tileRow: { flexDirection: 'row', gap: space.md, paddingHorizontal: space.xl, marginTop: space.md },
  tile: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.tile,
    padding: space.lg,
    ...shadow,
  },
  tileTop: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tileLabel: { ...eyebrow, fontSize: 10 },
  tileValue: { color: colors.text, fontSize: 28, fontWeight: '800', marginTop: space.md },
  tileUnit: { color: colors.faint, fontSize: type.caption, fontWeight: '600' },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.card,
    marginHorizontal: space.xl,
    marginTop: space.md,
    padding: space.xl,
    ...shadow,
  },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: space.lg },
  cardTitle: { color: colors.text, fontSize: type.body, fontWeight: '800' },
  cardSub: { color: colors.faint, fontSize: type.caption, fontWeight: '600' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  weekCol: { alignItems: 'center' },
  weekDay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.raised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayDone: { backgroundColor: colors.accent },
  weekDayToday: { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.accent },
  weekText: { color: colors.faint, fontWeight: '700', fontSize: type.caption },
  weekTextToday: { color: colors.accent },
  monthRow: { flexDirection: 'row', gap: 3, marginTop: space.lg },
  monthDot: { flex: 1, height: 5, borderRadius: 3, backgroundColor: colors.raised },
  monthDotDone: { backgroundColor: colors.accent },
  section: {
    color: colors.text,
    fontSize: type.title,
    fontWeight: '800',
    paddingHorizontal: space.xl,
    marginTop: space.xxl,
    marginBottom: space.md,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: colors.card,
    marginHorizontal: space.xl,
    marginBottom: space.md,
    borderRadius: radius.tile,
    padding: space.lg,
    minHeight: 88,
    ...shadow,
  },
  planIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  planCopy: { flex: 1 },
  planTitleRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  planTitle: { color: colors.text, fontSize: type.body, fontWeight: '800', flexShrink: 1 },
  lockBadge: {
    color: colors.accent,
    backgroundColor: colors.accentSoft,
    overflow: 'hidden',
    borderRadius: radius.pill,
    paddingHorizontal: space.sm,
    paddingVertical: 2,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  planMeta: { color: colors.muted, marginTop: 2, fontSize: type.caption, fontWeight: '600', textTransform: 'capitalize' },
  planGear: { color: colors.faint, marginTop: 2, fontSize: type.caption },
  planDesc: { color: colors.muted, marginTop: space.xs, fontSize: type.caption, lineHeight: 18 },
  creditsHit: { minHeight: hit, justifyContent: 'center', marginTop: space.sm },
  credits: { color: colors.faint, textAlign: 'center', fontSize: type.caption, fontWeight: '600' },
});
