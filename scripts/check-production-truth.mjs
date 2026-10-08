import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';

export function validatePin(pin) {
  assert.equal(pin.schema_version, 1);
  assert.equal(pin.repository, 'senatorAde/FEUS-Enterprise-Distribution');
  assert.equal(pin.path, 'feus-platform/generated/product-status.public.json');
  assert.match(pin.revision, /^[a-f0-9]{40}$/);
  assert.match(pin.sha256, /^[a-f0-9]{64}$/);
}

export function checkProjection(text, pin) {
  validatePin(pin);
  const normalized = text.replace(/\r\n/g, '\n');
  assert.equal(createHash('sha256').update(normalized).digest('hex'), pin.sha256,
    'Production-truth projection differs from pinned canonical source');
  assert.equal(JSON.parse(normalized).authority, 'observation_only_not_release_authorization');
}

async function main() {
  const pin = JSON.parse(readFileSync('.github/production-truth-source.json', 'utf8'));
  const local = readFileSync('src/data/product-status.public.json', 'utf8');
  checkProjection(local, pin);
  if (process.argv.includes('--remote')) {
    if (process.env.GITHUB_ACTIONS === 'true') {
      assert.ok(process.env.GH_TOKEN, 'Private distribution read requires FEUS_DISTRIBUTION_READ_TOKEN');
    }
    const encoded = execFileSync('gh', [
      'api', `repos/${pin.repository}/contents/${pin.path}?ref=${pin.revision}`, '--jq', '.content',
    ], { encoding: 'utf8', timeout: 15000 });
    const canonical = Buffer.from(encoded.replace(/\s/g, ''), 'base64').toString('utf8');
    checkProjection(canonical, pin);
    assert.equal(local.replace(/\r\n/g, '\n'), canonical.replace(/\r\n/g, '\n'));
  }
  console.log('PASS: pinned canonical observation matches; no release authority granted');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(`FAIL: ${error.message}`);
    process.exitCode = 1;
  });
}
