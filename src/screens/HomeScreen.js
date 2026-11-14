import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { plans } from '../data/workouts';
import { useAuth } from '../context/AuthContext';
import { usePro } from '../context/ProContext';
import { useProgress } from '../context/ProgressContext';
import { planRequiresPro } from '../lib/pro';
import { manageSubscriptions } from '../lib/purchases';
import { equipmentLabel, planDay, sessionFor } from '../lib/sessionPlan';
import { mediaFor } from '../lib/exerciseMediaMap';
import { colors, hit, space, type } from '../theme';

const TAB_EDGES = ['top', 'left', 'right'];
const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const LEVEL_COLOR = {
  beginner: colors.beginner,
  intermediate: colors.intermediate,
  advanced: colors.advanced,
};

function weekKey(offsetFromToday) {
  const date = new Date();
  date.setDate(date.getDate() + offsetFromToday);
  return date.toISOString().split('T')[0];
}

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const { isPro } = usePro();
  const { completedDays, totalWorkouts, loading } = useProgress();
  const todayPlan = 'beginner';
  const session = sessionFor(todayPlan);
  const day = planDay(totalWorkouts, plans.beginner.days);
  const cover = mediaFor(session.coverId);

  const openPlan = (key) => {
    if (planRequiresPro(key) && !isPro) {
      navigation.navigate('Paywall');
      return;
    }
    navigation.navigate('Workout', { plan: key });
  };

  const mondayOffset = -((new Date().getDay() + 6) % 7);

  return (
    <SafeAreaView style={styles.container} edges={TAB_EDGES} testID="home">
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Today</Text>
            <Text style={styles.logo}>Momentum</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.proPill}
              onPress={() => navigation.navigate('Paywall')}
              testID="open-paywall"
            >
              <Text style={styles.proPillText}>{isPro ? 'Pro active' : 'Pro'}</Text>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" onPress={signOut} style={styles.signOutHit} testID="sign-out">
              <Text style={styles.signOut}>{user?.isGuest ? 'Guest' : user?.name}</Text>
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
          <View style={[styles.band, { backgroundColor: colors.beginner }]} />
          <View style={styles.todayBody}>
            <Text style={styles.dayLabel}>Day {loading ? '–' : day} of {plans.beginner.days}</Text>
            <Text style={styles.todayTitle}>{plans.beginner.name}</Text>
            <Text style={styles.todayMeta}>
              {session.minutes} min · {session.count} exercises
            </Text>
            {cover?.start ? <Image source={cover.start} style={styles.cover} resizeMode="contain" /> : null}
            <TouchableOpacity
              accessibilityRole="button"
              style={styles.start}
              onPress={() => openPlan(todayPlan)}
              testID="start-workout"
            >
              <Text style={styles.startText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.section}>This week</Text>
        <View style={styles.weekRow}>
          {WEEK.map((label, index) => {
            const key = weekKey(mondayOffset + index);
            const done = completedDays.includes(key);
            return (
              <View key={`${label}-${index}`} style={[styles.weekDay, done && styles.weekDayDone]}>
                <Text style={[styles.weekText, done && styles.weekTextDone]}>{label}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.monthRow} accessibilityLabel="30 day progress">
          {Array.from({ length: 30 }, (_, index) => (
            <View key={index} style={[styles.monthDot, index < Math.min(totalWorkouts, 30) && styles.monthDotDone]} />
          ))}
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
              <View style={[styles.planBand, { backgroundColor: LEVEL_COLOR[key] || colors.lime }]} />
              <View style={styles.planCopy}>
                <View style={styles.planTitleRow}>
                  <Text style={styles.planTitle}>{plan.name}</Text>
                  {locked ? <Text style={styles.lockBadge}>Pro</Text> : null}
                </View>
                <Text style={styles.planMeta}>
                  {plan.days} days · {info.minutes} min · {key}
                </Text>
                <Text style={styles.planGear}>{equipmentLabel(info.list)}</Text>
                <Text style={styles.planDesc}>{plan.description}</Text>
              </View>
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
  eyebrow: { color: colors.lime, fontSize: type.caption, fontWeight: '700', letterSpacing: 0.6 },
  logo: { color: colors.text, fontSize: type.display, fontWeight: '800' },
  proPill: {
    minHeight: hit,
    minWidth: hit,
    paddingHorizontal: space.lg,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proPillText: { color: colors.lime, fontWeight: '700', fontSize: type.label },
  signOutHit: { minHeight: hit, justifyContent: 'center', paddingHorizontal: space.sm },
  signOut: { color: colors.muted, fontSize: type.caption, fontWeight: '600' },
  manage: {
    minHeight: hit,
    marginHorizontal: space.xl,
    marginTop: space.lg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.lg,
  },
  manageText: { color: colors.lime, fontWeight: '700', fontSize: type.label },
  todayCard: {
    marginHorizontal: space.xl,
    marginTop: space.lg,
    backgroundColor: colors.card,
    borderRadius: 24,
    overflow: 'hidden',
  },
  band: { height: 8 },
  todayBody: { padding: space.xl },
  dayLabel: { color: colors.lime, fontSize: type.label, fontWeight: '700' },
  todayTitle: { color: colors.text, fontSize: type.title, fontWeight: '800', marginTop: space.xs },
  todayMeta: { color: colors.muted, fontSize: type.body, marginTop: space.sm },
  cover: { width: '100%', height: 140, marginTop: space.md },
  start: {
    marginTop: space.lg,
    minHeight: 56,
    backgroundColor: colors.lime,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: { color: colors.ink, fontSize: 18, fontWeight: '800' },
  section: {
    color: colors.text,
    fontSize: type.title,
    fontWeight: '700',
    paddingHorizontal: space.xl,
    marginTop: space.xxl,
    marginBottom: space.md,
  },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: space.xl },
  weekDay: {
    minWidth: 36,
    minHeight: 36,
    borderRadius: 18,
    backgroundColor: colors.raised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayDone: { backgroundColor: colors.lime },
  weekText: { color: colors.muted, fontWeight: '700' },
  weekTextDone: { color: colors.ink },
  monthRow: { flexDirection: 'row', gap: 3, paddingHorizontal: space.xl, marginTop: space.md },
  monthDot: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.raised },
  monthDotDone: { backgroundColor: colors.lime },
  planCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: space.xl,
    marginBottom: space.md,
    borderRadius: 18,
    overflow: 'hidden',
    minHeight: 88,
  },
  planBand: { width: 8 },
  planCopy: { flex: 1, padding: space.lg },
  planTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space.sm },
  planTitle: { color: colors.text, fontSize: 18, fontWeight: '700', flex: 1 },
  lockBadge: {
    color: colors.ink,
    backgroundColor: colors.lime,
    overflow: 'hidden',
    borderRadius: 999,
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    fontSize: type.caption,
    fontWeight: '800',
  },
  planMeta: { color: colors.muted, marginTop: space.sm, fontSize: type.label, textTransform: 'capitalize' },
  planGear: { color: colors.faint, marginTop: space.xs, fontSize: type.caption },
  planDesc: { color: colors.muted, marginTop: space.sm, fontSize: type.label, lineHeight: 22 },
  creditsHit: { minHeight: hit, justifyContent: 'center', marginTop: space.sm },
  credits: { color: colors.muted, textAlign: 'center', fontSize: type.label },
});
