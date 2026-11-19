import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_PROFILE, buildSession, canDo, cmToFtIn, gearOf, kgToLb } from '../../src/lib/personalize.js';

const base = { ...DEFAULT_PROFILE, goal: 'muscle', level: 'intermediate', equipment: ['bodyweight', 'dumbbell', 'barbell', 'bar'], days: 4, minutes: 30 };

test('a bodyweight-only user never gets equipment exercises', () => {
  for (let seed = 0; seed < 12; seed += 1) {
    const s = buildSession({ ...base, equipment: ['bodyweight'] }, seed);
    assert.ok(s.exercises.length >= 3);
    for (const e of s.exercises) assert.ok(canDo(e, ['bodyweight']), `${e.name} needs ${gearOf(e)}`);
  }
});

test('a beginner never gets intermediate or advanced exercises', () => {
  for (let seed = 0; seed < 12; seed += 1) {
    const s = buildSession({ ...base, level: 'beginner', equipment: ['bodyweight', 'dumbbell', 'barbell', 'cable', 'band', 'bar'] }, seed);
    assert.ok(s.exercises.every((e) => e.level === 'beginner'));
  }
});

test('advanced users get advanced exercises', () => {
  const s = buildSession({ ...base, level: 'advanced', equipment: ['bodyweight', 'dumbbell', 'barbell', 'bar', 'kettlebell'] }, 0);
  assert.ok(s.exercises.some((e) => e.level === 'advanced'));
});

test('the split rotates through the week', () => {
  const titles = [0, 1, 2, 3].map((seed) => buildSession(base, seed).title);
  assert.deepEqual(titles, ['Upper body', 'Lower body and core', 'Upper body', 'Lower body and core']);
});

test('session length follows the chosen minutes', () => {
  for (const minutes of [15, 20, 30, 45]) {
    const s = buildSession({ ...base, minutes }, 0);
    assert.ok(Math.abs(s.minutes - minutes) <= Math.max(5, minutes * 0.3), `${minutes} -> ${s.minutes}`);
  }
});

test('ids repeat as rounds and match the exercise count', () => {
  const s = buildSession(base, 0);
  assert.equal(s.ids.length, s.count * s.sets);
});

test('jumping moves are dropped for older or heavier users', () => {
  const gear = ['bodyweight', 'dumbbell', 'barbell', 'bar', 'kettlebell'];
  for (let seed = 0; seed < 20; seed += 1) {
    const s = buildSession({ ...base, goal: 'athletic', level: 'advanced', equipment: gear, ageBand: '55+', days: 5 }, seed);
    assert.ok(s.exercises.every((e) => !e.impact), `seed ${seed}`);
  }
});

test('calorie estimate scales with body weight', () => {
  const light = buildSession({ ...base, weightKg: 60 }, 0).kcal;
  const heavy = buildSession({ ...base, weightKg: 100 }, 0).kcal;
  assert.ok(heavy > light);
});

test('unit helpers', () => {
  assert.deepEqual(cmToFtIn(175), { ft: 5, inch: 9 });
  assert.equal(kgToLb(75), 165);
});

import { visibleExercises } from '../../src/data/workouts.js';

test('every muscle group has beginner, intermediate and advanced moves', () => {
  const groups = ['chest', 'back', 'shoulders', 'arms', 'legs', 'glutes', 'calves', 'traps', 'forearms', 'core', 'full body'];
  for (const g of groups) {
    for (const level of ['beginner', 'intermediate', 'advanced']) {
      assert.ok(visibleExercises.some((e) => e.muscle === g && e.level === level), `${g} has no ${level} move`);
    }
  }
});

test('advanced users with only bodyweight still get full sessions, advanced on most days', () => {
  let advancedDays = 0;
  for (let seed = 0; seed < 6; seed += 1) {
    const s = buildSession({ ...base, level: 'advanced', equipment: ['bodyweight'], days: 6, minutes: 30 }, seed);
    assert.ok(s.count >= 4, `seed ${seed}: only ${s.count} moves`);
    if (s.exercises.some((e) => e.level === 'advanced')) advancedDays += 1;
  }
  // pulling work needs a bar for advanced moves, so a pull day may stay intermediate
  assert.ok(advancedDays >= 4, `only ${advancedDays}/6 days had an advanced move`);
});

test('advanced users with a full gym get advanced moves on every split day', () => {
  const gym = ['bodyweight', 'dumbbell', 'barbell', 'cable', 'band', 'bar', 'kettlebell'];
  for (let seed = 0; seed < 6; seed += 1) {
    const s = buildSession({ ...base, level: 'advanced', equipment: gym, days: 6, minutes: 45 }, seed);
    const adv = s.exercises.filter((e) => e.level === 'advanced').length;
    assert.ok(adv >= Math.ceil(s.count / 2), `seed ${seed} ${s.title}: ${adv}/${s.count} advanced`);
  }
});

test('focus areas get picked', () => {
  const s = buildSession({ ...base, focus: ['glutes'], days: 6, equipment: ['bodyweight', 'dumbbell', 'barbell', 'cable'] }, 2);
  assert.ok(s.exercises.some((e) => e.muscle === 'glutes'));
});

import { readFileSync } from 'node:fs';
const mapText = readFileSync('src/lib/exerciseMediaMap.js', 'utf8');
test('every exercise shown in the app has a real animation (no placeholders ship)', () => {
  for (const e of visibleExercises) {
    assert.ok(new RegExp(`'${e.id}': \\{`).test(mapText), `${e.id} has no media`);
  }
});
