import { exercisesForPlan } from '../data/workouts.js';

export function sessionFor(planKey) {
  const list = exercisesForPlan(planKey);
  const seconds = list.reduce((sum, exercise) => sum + (exercise.duration || 0), 0);
  return {
    list,
    count: list.length,
    seconds,
    minutes: Math.max(1, Math.round(seconds / 60)),
    coverId: list[0]?.id || null,
  };
}

export function equipmentLabel(list) {
  const labels = [];
  const add = (label) => {
    if (label && !labels.includes(label)) labels.push(label);
  };
  for (const exercise of list || []) {
    const name = `${exercise.id} ${exercise.name}`.toLowerCase();
    if (name.includes('dumbbell')) add('Dumbbells');
    if (name.includes('barbell')) add('Barbell');
    if (name.includes('cable') || name.includes('pulldown')) add('Cable');
    if (name.includes('band')) add('Band');
    if (/push-up|plank|crunch|sit-up|twist|v-up|knee raise/.test(name)) add('Bodyweight');
  }
  if (!labels.length) add('Bodyweight');
  return labels.slice(0, 3).join(' · ');
}

export function planDay(totalWorkouts, days = 30) {
  const done = Math.max(0, Number(totalWorkouts) || 0);
  return Math.min(days, done + 1);
}

export function remainingSeconds(list, index, timeLeft, mode) {
  if (!list?.length) return 0;
  const current = list[index];
  const currentLeft = mode === 'timer' ? Math.max(0, timeLeft || 0) : current?.duration || 0;
  const upcoming = list.slice(index + 1).reduce((sum, exercise) => sum + (exercise.duration || 0), 0);
  return currentLeft + upcoming;
}

export function clock(totalSeconds) {
  const safe = Math.max(0, Math.round(totalSeconds || 0));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
