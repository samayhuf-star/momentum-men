import assert from 'node:assert/strict';
import test from 'node:test';
import { clock, equipmentLabel, planDay, remainingSeconds, sessionFor } from '../../src/lib/sessionPlan.js';

test('a plan session reports exercise count and timer minutes', () => {
  const session = sessionFor('beginner');
  assert.equal(session.count, 6);
  assert.equal(session.minutes, 4);
  assert.ok(session.coverId);
});

test('equipment comes from the exercise names', () => {
  const label = equipmentLabel(sessionFor('beginner').list);
  assert.match(label, /Dumbbells/);
  assert.match(label, /Cable/);
});

test('the plan day stays inside 1 to 30', () => {
  assert.equal(planDay(0), 1);
  assert.equal(planDay(3), 4);
  assert.equal(planDay(40), 30);
});

test('session time left includes the current timer and later exercises', () => {
  const list = [{ duration: 40 }, { duration: 40 }, { duration: 30 }];
  assert.equal(remainingSeconds(list, 1, 10, 'timer'), 40);
  assert.equal(clock(90), '1:30');
});
