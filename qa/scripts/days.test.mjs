import test from 'node:test';
import assert from 'node:assert/strict';
import { currentStreak, dayKeyOffset, localDayKey } from '../../src/lib/days.js';

const now = new Date(2026, 10, 23, 1, 15); // 23 Nov 2026, 01:15 local

test('day key uses the local calendar day', () => {
  assert.equal(localDayKey(now), '2026-11-23');
  assert.equal(dayKeyOffset(-1, now), '2026-11-22');
  assert.equal(dayKeyOffset(-23, now), '2026-10-31');
});

test('streak counts consecutive days ending today', () => {
  assert.equal(currentStreak(['2026-11-21', '2026-11-22', '2026-11-23'], now), 3);
});

test('streak still stands when today is not done yet', () => {
  assert.equal(currentStreak(['2026-11-21', '2026-11-22'], now), 2);
});

test('streak resets after a missed day', () => {
  assert.equal(currentStreak(['2026-11-18', '2026-11-19', '2026-11-21'], now), 0);
  assert.equal(currentStreak(['2026-11-18', '2026-11-19', '2026-11-23'], now), 1);
  assert.equal(currentStreak([], now), 0);
});
