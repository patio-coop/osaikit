import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const CLI = resolve('dist/cli.js');
const CWD = resolve('.');

function run(args = '', opts = {}) {
  // Use temp files to avoid pipe buffer truncation
  const tmp = mkdtempSync(join(tmpdir(), 'osaikit-test-'));
  const outFile = join(tmp, 'stdout');
  const errFile = join(tmp, 'stderr');
  const cmd = `node ${CLI} ${args} >${outFile} 2>${errFile}`;
  let exitCode = 0;
  try {
    execSync(cmd, {
      timeout: 15_000,
      cwd: opts.cwd || CWD,
      env: { ...process.env, NO_COLOR: '1' },
      shell: true,
    });
  } catch (err) {
    exitCode = err.status ?? 1;
  }
  let stdout = '', stderr = '';
  try { stdout = readFileSync(outFile, 'utf-8'); } catch {}
  try { stderr = readFileSync(errFile, 'utf-8'); } catch {}
  try { rmSync(tmp, { recursive: true }); } catch {}
  return { stdout, stderr, exitCode };
}

// ── --help ─────────────────────────────────────────────────────────

describe('osaikit --help', () => {
  it('prints help text and exits 0', () => {
    const { stdout, exitCode } = run('--help');
    assert.equal(exitCode, 0);
    assert.ok(stdout.includes('OSAI'), 'Should contain OSAI');
    assert.ok(stdout.includes('Usage'), 'Should contain Usage section');
    assert.ok(stdout.includes('Commands'), 'Should contain Commands section');
  });

  it('-h is an alias for --help', () => {
    const { stdout, exitCode } = run('-h');
    assert.equal(exitCode, 0);
    assert.ok(stdout.includes('Usage'));
  });

  it('help includes all commands', () => {
    const { stdout } = run('--help');
    assert.ok(stdout.includes('run local'), 'Should list run local');
    assert.ok(stdout.includes('refresh'), 'Should list refresh');
    assert.ok(stdout.includes('list'), 'Should list list');
  });

  it('help includes all options', () => {
    const { stdout } = run('--help');
    assert.ok(stdout.includes('--repo'));
    assert.ok(stdout.includes('--model'));
    assert.ok(stdout.includes('--help'));
    assert.ok(stdout.includes('--version'));
  });
});

// ── --version ──────────────────────────────────────────────────────

describe('osaikit --version', () => {
  it('prints version number and exits 0', () => {
    const { stdout, exitCode } = run('--version');
    assert.equal(exitCode, 0);
    assert.match(stdout.trim(), /^\d+\.\d+\.\d+$/, 'Should be semver');
  });

  it('-v is an alias for --version', () => {
    const { stdout, exitCode } = run('-v');
    assert.equal(exitCode, 0);
    assert.match(stdout.trim(), /^\d+\.\d+\.\d+$/);
  });

  it('version matches package.json', () => {
    const { stdout } = run('--version');
    const pkg = JSON.parse(readFileSync(resolve(CWD, 'package.json'), 'utf-8'));
    assert.equal(stdout.trim(), pkg.version);
  });
});

// ── list command ───────────────────────────────────────────────────

describe('osaikit list', () => {
  it('outputs model table and exits 0', () => {
    const { stdout, exitCode } = run('list');
    assert.equal(exitCode, 0);
    assert.ok(stdout.includes('model database'), 'Should have header');
    assert.ok(stdout.includes('PARAMS'), 'Should have table header');
    assert.ok(stdout.includes('Showing'), 'Should have summary line');
  });

  it('hides legacy models by default', () => {
    const { stdout } = run('list');
    // codellama-7b is marked legacy: true in models.js
    assert.ok(!stdout.includes('codellama-7b'), 'Should not show legacy codellama-7b');
  });

  it('--legacy includes legacy models', () => {
    const { stdout } = run('list --legacy');
    // With --legacy, should show legacy models tagged as (legacy)
    assert.ok(stdout.includes('(legacy)'), 'Should mark legacy models');
  });

  it('--on-device filters to on-device models only', () => {
    const { stdout } = run('list --on-device');
    assert.ok(stdout.includes('Showing'));
    // deepseek-r1 is 671B with onDevice: false — should not appear
    assert.ok(!stdout.includes('deepseek-r1 '), 'deepseek-r1 (671B) should not appear');
  });

  it('--family filters by family name', () => {
    const { stdout } = run('list --family Qwen3');
    assert.ok(stdout.includes('qwen3'), 'Should show Qwen3 models');
    assert.ok(!stdout.includes('llama-4'), 'Should not show non-Qwen3 models');
    assert.ok(!stdout.includes('gemma-3'), 'Should not show non-Qwen3 models');
  });

  it('--family is case-insensitive', () => {
    const { stdout: upper } = run('list --family QWEN3');
    const { stdout: lower } = run('list --family qwen3');
    // Both should show the same models
    assert.ok(upper.includes('qwen3'));
    assert.ok(lower.includes('qwen3'));
  });

  it('--json outputs valid JSON array', () => {
    const { stdout, exitCode } = run('list --json');
    assert.equal(exitCode, 0);
    const parsed = JSON.parse(stdout);
    assert.ok(Array.isArray(parsed), 'Should be an array');
    assert.ok(parsed.length > 0, 'Should have models');
    // Check shape of first model
    const model = parsed[0];
    assert.ok('id' in model);
    assert.ok('name' in model);
    assert.ok('family' in model);
    assert.ok('params' in model);
    assert.ok('context' in model);
    assert.ok('license' in model);
    assert.ok('onDevice' in model);
    assert.ok('provider' in model);
    assert.ok('releaseDate' in model);
    assert.ok('legacy' in model);
  });

  it('--json --legacy includes legacy models', () => {
    const { stdout } = run('list --json --legacy');
    const parsed = JSON.parse(stdout);
    const legacyModels = parsed.filter(m => m.legacy);
    assert.ok(legacyModels.length > 0, 'Should have legacy models');
  });

  it('--json --on-device only includes on-device models', () => {
    const { stdout } = run('list --json --on-device');
    const parsed = JSON.parse(stdout);
    for (const model of parsed) {
      assert.ok(model.onDevice, `${model.id} should be on-device`);
    }
  });

  it('shows no results for non-existent family', () => {
    const { stdout } = run('list --family NonExistentFamily');
    assert.ok(stdout.includes('No models match'), 'Should show no-match message');
  });
});

// ── refresh command ────────────────────────────────────────────────

describe('osaikit refresh', () => {
  it('fetches all sources and exits 0', () => {
    const { stdout, exitCode } = run('refresh');
    assert.equal(exitCode, 0);
    assert.ok(stdout.includes('Refreshing leaderboard data'));
    assert.ok(stdout.includes('HuggingFace'));
    assert.ok(stdout.includes('SWE-bench'));
    assert.ok(stdout.includes('Aider'));
    assert.ok(stdout.includes('LiveCodeBench'));
    assert.ok(stdout.includes('BigCodeBench'));
    assert.ok(stdout.includes('Fetched at'));
  });

  it('reports entry counts for each source', () => {
    const { stdout } = run('refresh');
    // Should have "N entries" for each source
    const entryMatches = stdout.match(/\d+ entries/g);
    assert.ok(entryMatches && entryMatches.length >= 3, 'Should report counts for multiple sources');
  });
});

// ── run command ────────────────────────────────────────────────────

describe('osaikit run', () => {
  it('run without target shows error', () => {
    const { stderr, exitCode } = run('run');
    assert.equal(exitCode, 1);
    assert.ok(stderr.includes('Unknown run target'), 'Should show error for missing target');
  });

  it('run badtarget shows error', () => {
    const { stderr, exitCode } = run('run badtarget');
    assert.equal(exitCode, 1);
    assert.ok(stderr.includes('Unknown run target'));
  });

  it('run production shows not-yet-implemented', () => {
    const { stdout, exitCode } = run('run production');
    assert.equal(exitCode, 0);
    assert.ok(stdout.includes('not yet implemented'));
  });

  it('run local --model bad-id shows error with available models', () => {
    const { stderr, exitCode } = run('run local --model nonexistent-model-xyz');
    assert.equal(exitCode, 1);
    assert.ok(
      stderr.includes('not found') || stderr.includes('no ollama support'),
      'Should report model not found or no ollama support',
    );
  });
});

// ── flag parsing edge cases ────────────────────────────────────────

describe('flag parsing', () => {
  it('--help takes priority over unknown args', () => {
    const { exitCode, stdout } = run('--help foobar');
    assert.equal(exitCode, 0);
    assert.ok(stdout.includes('Usage'), 'Should still print help');
  });

  it('--version takes priority over commands', () => {
    const { exitCode, stdout } = run('--version list');
    assert.equal(exitCode, 0);
    assert.match(stdout.trim(), /^\d+\.\d+\.\d+$/);
  });

  it('--help takes priority over --version', () => {
    const { exitCode, stdout } = run('--help --version');
    assert.equal(exitCode, 0);
    // Help is checked first in cli.js, so should print help not version
    assert.ok(stdout.includes('Usage'));
  });

  it('--repo with bad path exits with error', () => {
    const { stderr, exitCode } = run('--repo /definitely/not/a/real/path/xyz');
    assert.equal(exitCode, 1);
    assert.ok(stderr.includes('Error analyzing repo'), 'Should report analysis error');
  });

  it('--repo with valid local path succeeds', () => {
    const { exitCode } = run('--repo .');
    assert.equal(exitCode, 0, 'Should exit 0 when analyzing local repo');
  });
});
