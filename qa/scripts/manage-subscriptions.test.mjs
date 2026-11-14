import assert from 'node:assert/strict';
import test from 'node:test';
import { APPLE_SUBSCRIPTIONS_URL, openManageSubscriptions } from '../../src/lib/manageSubscriptions.js';

test('iOS uses the store sheet when it opens', async () => {
  const calls = [];
  const result = await openManageSubscriptions({
    platform: 'ios',
    showManage: async () => {
      calls.push('store');
    },
    openUrl: async (url) => {
      calls.push(url);
    },
  });
  assert.equal(result, 'store');
  assert.deepEqual(calls, ['store']);
});

test('iOS falls back to the Apple subscriptions page', async () => {
  const urls = [];
  const result = await openManageSubscriptions({
    platform: 'ios',
    showManage: async () => {
      throw new Error('sheet unavailable');
    },
    openUrl: async (url) => {
      urls.push(url);
    },
  });
  assert.equal(result, 'url');
  assert.deepEqual(urls, [APPLE_SUBSCRIPTIONS_URL]);
});

test('other platforms open the Apple subscriptions page', async () => {
  let called = false;
  const urls = [];
  const result = await openManageSubscriptions({
    platform: 'web',
    showManage: async () => {
      called = true;
    },
    openUrl: async (url) => {
      urls.push(url);
    },
  });
  assert.equal(called, false);
  assert.equal(result, 'url');
  assert.deepEqual(urls, [APPLE_SUBSCRIPTIONS_URL]);
});
