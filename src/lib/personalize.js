// Picks workouts that fit the user's goal, level, body, gear and schedule.
// Pure functions (no React) so they are unit-tested in qa/scripts/personalize.test.mjs.
import { visibleExercises } from '../data/workouts.js';

export const GOALS = [
  { id: 'muscle', title: 'Build muscle', sub: 'More size and shape', icon: 'barbell' },
  { id: 'fat', title: 'Lose fat', sub: 'Burn more, stay lean', icon: 'flame' },
  { id: 'strength', title: 'Get stronger', sub: 'Heavier lifts, lower reps', icon: 'trophy' },
  { id: 'athletic', title: 'Athletic performance', sub: 'Power, speed, conditioning', icon: 'flash' },
  { id: 'fit', title: 'Stay fit', sub: 'Balanced and consistent', icon: 'heart' },
];

export const LEVELS = [
  { id: 'beginner', title: 'Beginner', sub: 'New to training, or coming back', icon: 'leaf' },
  { id: 'intermediate', title: 'Intermediate', sub: 'Training regularly for 1 to 3 years', icon: 'fitness' },
  { id: 'advanced', title: 'Advanced', sub: '3+ years, comfortable with heavy and complex lifts', icon: 'rocket' },
];

export const EQUIPMENT = [
  { id: 'bodyweight', title: 'Bodyweight only', icon: 'body' },
  { id: 'dumbbell', title: 'Dumbbells', icon: 'barbell' },
  { id: 'barbell', title: 'Barbell and bench', icon: 'barbell' },
  { id: 'cable', title: 'Cable and machines', icon: 'options' },
  { id: 'band', title: 'Resistance bands', icon: 'swap-vertical' },
  { id: 'bar', title: 'Pull-up bar', icon: 'resize' },
  { id: 'kettlebell', title: 'Kettlebell', icon: 'fitness' },
];
export const EQUIPMENT_PRESETS = [
  { id: 'gym', title: 'Full gym', equipment: ['bodyweight', 'dumbbell', 'barbell', 'cable', 'band', 'bar', 'kettlebell'] },
  { id: 'home', title: 'Home dumbbells', equipment: ['bodyweight', 'dumbbell', 'band'] },
  { id: 'none', title: 'No equipment', equipment: ['bodyweight'] },
];

export const AGE_BANDS = ['18–24', '25–34', '35–44', '45–54', '55+'];
export const DAYS_OPTIONS = [2, 3, 4, 5, 6];
export const MINUTES_OPTIONS = [15, 20, 30, 45];
export const FOCUS_AREAS = [
  { id: 'chest', title: 'Chest' },
  { id: 'back', title: 'Back' },
  { id: 'shoulders', title: 'Shoulders' },
  { id: 'arms', title: 'Arms' },
  { id: 'legs', title: 'Legs' },
  { id: 'glutes', title: 'Glutes' },
  { id: 'calves', title: 'Calves' },
  { id: 'traps', title: 'Traps' },
  { id: 'forearms', title: 'Grip and forearms' },
  { id: 'core', title: 'Core' },
];

export const DEFAULT_PROFILE = {
  onboarded: false,
  goal: null,
  level: null,
  ageBand: '25–34',
  unit: 'metric',
  heightCm: 175,
  weightKg: 75,
  equipment: ['bodyweight', 'dumbbell'],
  days: 4,
  minutes: 30,
  focus: [],
};

const LEVEL_RANK = { beginner: 0, intermediate: 1, advanced: 2 };
const REST_SECONDS = 0; // the player has no rest timer, so session length is active time

// ---- unit helpers -------------------------------------------------------
export const cmToFtIn = (cm) => {
  const totalIn = Math.round(cm / 2.54);
  return { ft: Math.floor(totalIn / 12), inch: totalIn % 12 };
};
export const kgToLb = (kg) => Math.round(kg * 2.20462);
export const bmi = (cm, kg) => (cm > 0 ? kg / ((cm / 100) * (cm / 100)) : 0);

// ---- equipment ----------------------------------------------------------
export function gearOf(exercise) {
  if (exercise.gear) return exercise.gear;
  const n = `${exercise.id} ${exercise.name}`.toLowerCase();
  if (/band|pallof/.test(n)) return ['band'];
  if (/cable|pulldown|y raise/.test(n)) return ['cable'];
  if (/pull-up|chin|hanging|bench pull/.test(n)) return ['bar'];
  if (/side bend|lateral|front raise|reverse fly|dumbbell/.test(n)) return ['dumbbell'];
  if (/barbell|bench|press|thruster|snatch|row|pullover|guillotine/.test(n) && !/push-up|sit-up/.test(n)) return ['barbell'];
  return ['bodyweight'];
}

export function canDo(exercise, equipment) {
  const have = new Set([...(equipment || []), 'bodyweight']);
  return gearOf(exercise).every((g) => have.has(g));
}

// ---- weekly split -------------------------------------------------------
const SPLITS = {
  push: { label: 'Push day', pattern: 'push', muscles: ['chest', 'shoulders', 'arms', 'core'] },
  pull: { label: 'Pull day', pattern: 'pull', muscles: ['back', 'traps', 'arms', 'forearms'] },
  legs: { label: 'Leg day', muscles: ['legs', 'glutes', 'calves', 'core'] },
  upper: { label: 'Upper body', muscles: ['chest', 'back', 'shoulders', 'arms', 'traps'] },
  lower: { label: 'Lower body and core', muscles: ['legs', 'glutes', 'calves', 'core', 'full body'] },
  full: { label: 'Full body', muscles: ['legs', 'chest', 'back', 'shoulders', 'glutes', 'core', 'full body'] },
  conditioning: { label: 'Conditioning and core', muscles: ['full body', 'core', 'legs', 'calves'] },
};
const WEEK_PLANS = {
  2: ['full', 'full'],
  3: ['full', 'full', 'full'],
  4: ['upper', 'lower', 'upper', 'lower'],
  5: ['push', 'pull', 'legs', 'upper', 'conditioning'],
  6: ['push', 'pull', 'legs', 'push', 'pull', 'legs'],
};

export function splitFor(days, dayIndex) {
  const plan = WEEK_PLANS[days] || WEEK_PLANS[3];
  return SPLITS[plan[((dayIndex % plan.length) + plan.length) % plan.length]];
}

// ---- goals --------------------------------------------------------------
const GOAL_CFG = {
  muscle: { sets: 3, met: 5, gear: { barbell: 0.6, dumbbell: 0.6 } },
  fat: { sets: 3, met: 6.5, muscle: { 'full body': 2.2, legs: 0.8 } },
  strength: { sets: 4, met: 5, gear: { barbell: 1.6 }, compound: 1 },
  athletic: { sets: 3, met: 6.5, muscle: { 'full body': 1.4, legs: 1.2, core: 0.6 }, impact: 1.4 },
  fit: { sets: 3, met: 5 },
};
const COMPOUND = /squat|deadlift|press|pull-up|row|dip|clean|thruster|lunge|snatch|bench|chin|burpee|muscle-up/i;

// Arms and grip moves are tagged push or pull so push days get triceps and pull days get biceps and pulling grip work.
function armPattern(e) {
  const n = `${e.id} ${e.name}`.toLowerCase();
  if (/push-up|pushup|dip|extension|skull|close-grip|pushdown|crusher|tiger/.test(n)) return 'push';
  return 'pull';
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function isHighImpactSensitive(profile) {
  const age = profile.ageBand === '45–54' || profile.ageBand === '55+';
  return age || bmi(profile.heightCm, profile.weightKg) >= 32;
}

function score(exercise, profile, seed) {
  const goal = GOAL_CFG[profile.goal] || GOAL_CFG.fit;
  const userRank = LEVEL_RANK[profile.level || 'beginner'];
  const exRank = LEVEL_RANK[exercise.level];
  let s = 0;
  // best fit is the user's own level; one step below is fine, above is not allowed (filtered earlier)
  s += exRank === userRank ? 2 : userRank - exRank === 1 ? 0.8 : 0;
  if (goal.gear) for (const g of gearOf(exercise)) s += goal.gear[g] || 0;
  if (goal.muscle) s += goal.muscle[exercise.muscle] || 0;
  if (goal.compound && COMPOUND.test(exercise.name)) s += goal.compound;
  if (exercise.impact) s += isHighImpactSensitive(profile) ? -6 : (goal.impact || 0);
  if (profile.focus?.includes(exercise.muscle)) s += 1.2;
  s += hash(`${exercise.id}:${seed}`) * 1.5; // rotates exercises from day to day
  return s;
}

/**
 * Build one session for the user.
 * @param profile saved onboarding answers
 * @param seed    number of workouts finished so far (rotates the day and the exercise mix)
 */
export function buildSession(profileIn, seed = 0) {
  const profile = { ...DEFAULT_PROFILE, ...(profileIn || {}) };
  const level = profile.level || 'beginner';
  const goal = GOAL_CFG[profile.goal] || GOAL_CFG.fit;
  const split = splitFor(profile.days, seed);

  const pool = visibleExercises.filter(
    (e) =>
      LEVEL_RANK[e.level] <= LEVEL_RANK[level] &&
      canDo(e, profile.equipment) &&
      !(split.pattern && (e.muscle === 'arms' || e.muscle === 'forearms') && armPattern(e) !== split.pattern)
  );

  // time budget -> how many exercises and how many rounds
  const avgDur = 41;
  const slots = Math.max(6, Math.round((profile.minutes * 60) / (avgDur + REST_SECONDS)));
  const count = Math.max(3, Math.min(12, Math.round(slots / goal.sets)));
  const sets = Math.max(2, Math.min(5, Math.round(slots / count)));

  // rank every exercise inside each muscle group of today's split, then deal them out round-robin
  const byMuscle = {};
  for (const m of split.muscles) {
    byMuscle[m] = pool
      .filter((e) => e.muscle === m)
      .map((e) => ({ e, s: score(e, profile, seed) }))
      .sort((a, b) => b.s - a.s);
  }
  const picked = [];
  let guard = 0;
  while (picked.length < count && guard < 100) {
    const m = split.muscles[guard % split.muscles.length];
    const next = byMuscle[m]?.shift();
    if (next && !picked.includes(next.e)) picked.push(next.e);
    guard += 1;
  }
  // thin pools (e.g. bodyweight only): top up from anything allowed
  if (picked.length < 3) {
    for (const e of pool) {
      if (!picked.includes(e)) picked.push(e);
      if (picked.length >= 3) break;
    }
  }

  // circuit order: A B C, A B C ...
  const ids = [];
  for (let r = 0; r < sets; r += 1) for (const e of picked) ids.push(e.id);
  const seconds = picked.reduce((sum, e) => sum + (e.duration || 40), 0) * sets;
  const minutes = Math.max(1, Math.round((seconds + ids.length * REST_SECONDS) / 60));
  const kcal = Math.round(goal.met * (profile.weightKg || 75) * (minutes / 60));

  return {
    title: split.label,
    focus: split.muscles,
    exercises: picked,
    ids,
    sets,
    count: picked.length,
    minutes,
    kcal,
    dayIndex: seed % (WEEK_PLANS[profile.days] || WEEK_PLANS[3]).length,
  };
}

export const goalTitle = (id) => GOALS.find((g) => g.id === id)?.title || 'Stay fit';
export const levelTitle = (id) => LEVELS.find((l) => l.id === id)?.title || 'Beginner';
