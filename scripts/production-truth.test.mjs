import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
import { checkProjection, validatePin } from './check-production-truth.mjs';

const text = readFileSync('src/data/product-status.public.json', 'utf8').replace(/\r\n/g, '\n');
const pin = {
  schema_version: 1,
  repository: 'senatorAde/FEUS-Enterprise-Distribution',
  revision: '1'.repeat(40),
  path: 'feus-platform/generated/product-status.public.json',
  sha256: createHash('sha256').update(text).digest('hex'),
};

test('canonical observations remain line-ending portable', () => {
  checkProjection(text, pin);
  checkProjection(text.replace(/\n/g, '\r\n'), pin);
});

test('copied runtime mutation cannot silently become canonical truth', () => {
  assert.ok(text.includes('"traffic_percent": 100'));
  assert.throws(() => checkProjection(text.replace('"traffic_percent": 100', '"traffic_percent": 99'), pin));
});

test('source bindings reject mutable refs and alternate authorities', () => {
  for (const change of [{ revision: 'main' }, { repository: 'alternate/repository' },
    { path: 'unreviewed.json' }, { sha256: 'missing' }]) {
    assert.throws(() => validatePin({ ...pin, ...change }));
  }
});

test('a hash pin is never runtime or release authorization', () => {
  const changed = text.replace('observation_only_not_release_authorization', 'approved_release');
  assert.throws(() => checkProjection(changed, {
    ...pin, sha256: createHash('sha256').update(changed).digest('hex'),
  }));
});
