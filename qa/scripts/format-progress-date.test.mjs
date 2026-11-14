import assert from 'node:assert/strict';
import test from 'node:test';
import { formatProgressDate } from '../../src/lib/formatProgressDate.js';

const now = new Date(2026, 10, 14);

test('current year uses a short month and day', () => {
  assert.equal(formatProgressDate('2026-11-14', now, 'en-US'), 'Nov 14');
});

test('another year includes the year', () => {
  assert.equal(formatProgressDate('2025-01-03', now, 'en-US'), 'Jan 3, 2025');
});

test('invalid values are left unchanged', () => {
  assert.equal(formatProgressDate('not-a-date', now, 'en-US'), 'not-a-date');
  assert.equal(formatProgressDate('2026-13-40', now, 'en-US'), '2026-13-40');
});
