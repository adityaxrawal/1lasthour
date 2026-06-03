#!/usr/bin/env node
/**
 * Production Validation Orchestrator v2
 *
 * A robust, configurable CI/CD pre-deployment gatekeeper.
 * Zero external dependencies — pure Node.js built-ins only.
 *
 * Usage:
 *   node scripts/validate.js [options]
 *
 * Options:
 *   --skip=<keys>     Comma-separated stage keys to skip
 *   --only=<keys>     Run only these stages (takes precedence over --skip)
 *   --fix             Auto-fix mode: swaps lint → lint:fix, format:check → format
 *   --no-bail         Continue on failure; show all results at the end
 *   --dry-run         Preview pipeline without executing any commands
 *   --log=<path>      Write full output to a log file (in addition to stdout)
 *   --timeout=<ms>    Per-stage timeout in ms (default: 180000)
 *   --ci              Force CI mode (auto-detected via $CI env var)
 *   --quiet           Suppress per-stage output; tail still shown on failure
 *   --help            Show this help message
 */

import { spawn, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');

// ─────────────────────────────────────────────────────────────────────────────
// CLI Argument Parsing
// ─────────────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    const src = fs.readFileSync(__filename, 'utf8');
    const jsdoc = src.match(/\/\*\*([\s\S]*?)\*\//);
    if (jsdoc) console.log(jsdoc[0]);
    process.exit(0);
  }

  const opts = {
    skip:    new Set(),
    only:    new Set(),
    fix:     false,
    bail:    true,
    dryRun:  false,
    log:     null,
    timeout: 180_000,
    ci:      !!process.env.CI,
    quiet:   false,
  };

  for (const arg of args) {
    const eqIdx = arg.indexOf('=');
    const key   = eqIdx > -1 ? arg.slice(0, eqIdx) : arg;
    const val   = eqIdx > -1 ? arg.slice(eqIdx + 1) : '';

    switch (key) {
      case '--skip':     val.split(',').forEach(s => opts.skip.add(s.trim().toLowerCase())); break;
      case '--only':     val.split(',').forEach(s => opts.only.add(s.trim().toLowerCase())); break;
      case '--fix':      opts.fix     = true;             break;
      case '--no-bail':  opts.bail    = false;            break;
      case '--dry-run':  opts.dryRun  = true;             break;
      case '--log':      opts.log     = val;              break;
      case '--timeout':  opts.timeout = parseInt(val, 10); break;
      case '--ci':       opts.ci      = true;             break;
      case '--quiet':    opts.quiet   = true;             break;
    }
  }

  return opts;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage Definitions
// ─────────────────────────────────────────────────────────────────────────────

function buildStages(opts) {
  return [
    {
      key:          'env',
      name:         'Environment Validation',
      command:      'pnpm',
      args:         ['run', 'validate:env'],
      description:  'Validating environment variables against .env.example',
      allowFailure: false,
    },
    {
      key:          'deps',
      name:         'Dependencies Check',
      command:      'pnpm',
      args:         ['run', 'check:deps'],
      description:  'Verifying dependency integrity',
      allowFailure: false,
    },
    {
      key:          'security',
      name:         'Security Audit',
      command:      'pnpm',
      args:         ['run', 'check:audit'],
      description:  'Scanning for high-severity dependency vulnerabilities',
      allowFailure: false,
    },
    {
      key:          'secrets',
      name:         'Secrets Scan',
      command:      'pnpm',
      args:         ['run', 'check:secrets'],
      description:  'Scanning for hardcoded secrets',
      allowFailure: false,
    },
    {
      key:          'format',
      name:         'Formatting',
      command:      'pnpm',
      args:         opts.fix ? ['run', 'format:fix'] : ['run', 'format:check'],
      description:  opts.fix ? 'Auto-formatting source files via Prettier' : 'Verifying Prettier formatting',
      allowFailure: false,
    },
    {
      key:          'types',
      name:         'Type Check',
      command:      'pnpm',
      args:         opts.ci ? ['run', 'typecheck:build'] : ['run', 'typecheck'],
      description:  'Validating TypeScript type integrity across the codebase',
      allowFailure: false,
    },
    {
      key:          'lint',
      name:         'Linting',
      command:      'pnpm',
      args:         opts.fix ? ['run', 'lint:fix'] : ['run', 'lint'],
      description:  opts.fix ? 'Auto-fixing ESLint violations' : 'Checking for ESLint violations',
      allowFailure: false,
    },
    {
      key:          'circular',
      name:         'Circular Dependencies',
      command:      'pnpm',
      args:         ['run', 'check:circular'],
      description:  'Checking for circular dependencies in the source code',
      allowFailure: false,
    },
    {
      key:          'testing',
      name:         'Tests',
      command:      'pnpm',
      args:         opts.ci ? ['run', 'test:ci'] : ['run', 'test'],
      description:  'Running unit and integration test suites',
      allowFailure: false,
    },
    {
      key:          'build',
      name:         'Production Build',
      command:      'pnpm',
      args:         ['run', 'build:clean'],
      description:  'Compiling production artifacts',
      allowFailure: false,
    },
    {
      key:          'verify-build',
      name:         'Verify Build',
      command:      'pnpm',
      args:         ['run', 'build:verify'],
      description:  'Verifying the build entry point',
      allowFailure: false,
    }
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal Colors
// ─────────────────────────────────────────────────────────────────────────────

function makeColors(enabled) {
  if (!enabled) {
    const id = s => String(s);
    return { reset:id, bold:id, dim:id, green:id, red:id, yellow:id,
             cyan:id, bgRed:id, bgGreen:id, bgYellow:id };
  }
  const e = (open, close) => s => `\x1b[${open}m${s}\x1b[${close}m`;
  return {
    reset:    s => `\x1b[0m${s}\x1b[0m`,
    bold:     e('1',  '22'),
    dim:      e('2',  '22'),
    green:    e('32', '39'),
    red:      e('31', '39'),
    yellow:   e('33', '39'),
    cyan:     e('36', '39'),
    bgRed:    e('41', '49'),
    bgGreen:  e('42', '49'),
    bgYellow: e('43', '49'),
  };
}

function visLen(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '').length;
}

function rpad(str, width) {
  const pad = Math.max(0, width - visLen(str));
  return str + ' '.repeat(pad);
}

// ─────────────────────────────────────────────────────────────────────────────
// Output Formatting
// ─────────────────────────────────────────────────────────────────────────────

const fmtTime = ms => `${(ms / 1000).toFixed(2)}s`;

function printBanner(c, text, success = true) {
  const inner  = `  ${text}  `;
  const bar    = '─'.repeat(inner.length + 2);
  const color  = success ? c.green : c.red;
  console.log(`\n${color(c.bold(`┌${bar}┐`))}`);
  console.log(`${color(c.bold(`│ ${inner} │`))}`);
  console.log(`${color(c.bold(`└${bar}┘`))}\n`);
}

function printSummaryTable(c, results) {
  const NAME_W   = Math.max(14, ...results.map(r => r.name.length)) + 2;
  const STATUS_W = 11; // "⏭ SKIPPED " padded

  const header  = rpad(c.bold('Stage'), NAME_W) + rpad(c.bold('Status'), STATUS_W) + c.bold('Time');
  const divider = c.dim('─'.repeat(NAME_W + STATUS_W + 10));

  console.log(`\n${header}`);
  console.log(divider);

  for (const r of results) {
    const statusStr =
      r.status === 'passed'  ? c.green('✔  PASSED')  :
      r.status === 'failed'  ? c.red('✘  FAILED')    :
      r.status === 'timeout' ? c.red('⏱  TIMEOUT')   :
      r.status === 'skipped' ? c.yellow('⏭  SKIPPED') :
                               c.dim('○  ------');

    const timeStr = r.duration != null ? c.dim(fmtTime(r.duration)) : c.dim('—');
    const nameStr = r.status === 'skipped' ? c.dim(r.name) : r.name;

    console.log(rpad(nameStr, NAME_W) + rpad(statusStr, STATUS_W) + timeStr);
  }

  console.log(divider);
}

function printTail(c, tail, maxLines = 15) {
  if (!tail.length) return;
  const lines = tail.slice(-maxLines);
  console.log(c.dim('  ╭─ last output ────────────────────────'));
  for (const line of lines) console.log(c.dim(`  │ ${line}`));
  console.log(c.dim('  ╰───────────────────────────────────────\n'));
}

// ─────────────────────────────────────────────────────────────────────────────
// Pre-flight Checks
// ─────────────────────────────────────────────────────────────────────────────

function runPreflightChecks(c) {
  const errors = [];
  const warns  = [];

  const [nodeMajor] = process.versions.node.split('.').map(Number);
  if (nodeMajor < 18) {
    errors.push(`Node.js ≥ 18 required — found v${process.versions.node}`);
  }

  const pnpm = spawnSync('pnpm', ['--version'], { shell: true, encoding: 'utf8' });
  if (pnpm.error || pnpm.status !== 0) {
    errors.push('pnpm not found — please install pnpm');
  }

  if (!fs.existsSync(path.join(ROOT, 'node_modules'))) {
    errors.push('node_modules not found — run: npm install or pnpm install');
  }

  if (!fs.existsSync(path.join(ROOT, 'package.json'))) {
    errors.push('package.json not found — are you in the right directory?');
  }

  const git = spawnSync('git', ['status', '--porcelain'], {
    shell: true, encoding: 'utf8', cwd: ROOT,
  });
  if (!git.error && git.stdout && git.stdout.trim()) {
    warns.push('Working tree has uncommitted changes');
  }

  if (warns.length) {
    for (const w of warns) console.log(`  ${c.yellow('⚠')} ${c.yellow(w)}`);
    console.log('');
  }

  if (errors.length) {
    console.log(`${c.bgRed(c.bold(' PRE-FLIGHT FAILED '))}\n`);
    for (const e of errors) console.log(`  ${c.red('✘')} ${e}`);
    console.log('');
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage Runner
// ─────────────────────────────────────────────────────────────────────────────

function runStage(stage, opts, logWrite) {
  return new Promise(resolve => {
    const t0   = Date.now();
    const tail = [];
    const TAIL = 40;

    const proc = spawn(stage.command, stage.args, {
      shell: true,
      cwd:   ROOT,
      env:   { ...process.env, FORCE_COLOR: opts.ci ? '0' : '1' },
    });

    const onData = chunk => {
      const text = chunk.toString();
      logWrite(text);
      if (!opts.quiet) process.stdout.write(text);
      text.split('\n').filter(l => l.trim()).forEach(l => {
        tail.push(l);
        if (tail.length > TAIL) tail.shift();
      });
    };

    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);

    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      proc.kill('SIGTERM');
      setTimeout(() => { try { proc.kill('SIGKILL'); } catch {} }, 5_000);
    }, opts.timeout);

    proc.on('close', (code, signal) => {
      clearTimeout(timer);
      const duration = Date.now() - t0;
      if (timedOut)     resolve({ status: 'timeout', duration, tail });
      else if (code === 0) resolve({ status: 'passed',  duration, tail: [] });
      else              resolve({ status: 'failed',  duration, tail, exitCode: code ?? signal });
    });

    proc.on('error', err => {
      clearTimeout(timer);
      resolve({ status: 'failed', duration: Date.now() - t0, tail: [err.message], exitCode: -1 });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Orchestrator
// ─────────────────────────────────────────────────────────────────────────────

async function runPipeline() {
  const opts = parseArgs(process.argv);
  const c    = makeColors(process.stdout.isTTY && !opts.ci);

  let logStream = null;
  if (opts.log) {
    try {
      const logPath = path.resolve(opts.log);
      fs.mkdirSync(path.dirname(logPath), { recursive: true });
      logStream = fs.createWriteStream(logPath, { flags: 'w' });
    } catch (err) {
      console.warn(`${c.yellow('⚠')} Could not open log file: ${err.message}\n`);
    }
  }
  const logWrite = text => { if (logStream) logStream.write(text); };

  const allStages    = buildStages(opts);
  const activeStages = allStages.filter(s =>
    opts.only.size > 0 ? opts.only.has(s.key) : !opts.skip.has(s.key)
  );

  printBanner(c, 'PRODUCTION VALIDATION PIPELINE');

  if (opts.dryRun)  console.log(`${c.bgYellow(c.bold(' DRY RUN '))} No commands will be executed.\n`);
  if (opts.fix)     console.log(`${c.yellow('⚡ FIX MODE')}  lint:fix + format will run instead of checks.\n`);
  if (!opts.bail)   console.log(`${c.yellow('◎ NO-BAIL')}   Pipeline will continue through failures.\n`);

  console.log(c.bold('Stages:'));
  for (const s of allStages) {
    const active = activeStages.includes(s);
    console.log(`  ${active ? c.cyan('▶') : c.dim('○')}  ${active ? s.name : c.dim(s.name)}`);
  }
  console.log('');

  if (!opts.dryRun) {
    runPreflightChecks(c);
    console.log(`${c.green('✔')} Pre-flight checks passed\n`);
  }

  const results = new Map(
    allStages.map(s => [s.key, { key: s.key, name: s.name, status: 'skipped', duration: null }])
  );

  const pipelineStart = Date.now();
  let anyFailed = false;
  let bailed    = false;

  for (let i = 0; i < activeStages.length; i++) {
    const stage = activeStages[i];
    const idx   = `[${i + 1}/${activeStages.length}]`;

    if (opts.ci) console.log(`::group::${stage.name}`);

    console.log(`${c.bold(idx)} ${c.bold(stage.name)}`);
    console.log(c.dim(`     ${stage.description}`));
    console.log(c.dim(`     $ ${stage.command} ${stage.args.join(' ')}\n`));

    if (opts.dryRun) {
      console.log(c.dim('     [dry-run: skipped]\n'));
      if (opts.ci) console.log('::endgroup::');
      continue;
    }

    const result = await runStage(stage, opts, logWrite);
    results.set(stage.key, { key: stage.key, name: stage.name, ...result });

    if (opts.ci) console.log('::endgroup::');

    if (result.status === 'passed') {
      console.log(`${c.green('✔')} ${c.bold(stage.name)} ${c.dim(`passed in ${fmtTime(result.duration)}`)}\n`);
      continue;
    }

    if (stage.allowFailure) {
      console.log(`${c.yellow('⚠')} ${c.bold(stage.name)} ${c.dim('failed but is marked non-blocking')}\n`);
      continue;
    }

    anyFailed = true;

    if (result.status === 'timeout') {
      console.log(`${c.bgRed(c.bold(' TIMEOUT '))} "${stage.name}" exceeded ${fmtTime(opts.timeout)}\n`);
      if (opts.ci) console.log(`::error::Stage "${stage.name}" timed out after ${fmtTime(opts.timeout)}`);
    } else {
      console.log(`${c.bgRed(c.bold(' FAILED '))} "${stage.name}" exited with code ${result.exitCode}\n`);
      if (opts.ci) console.log(`::error::Stage "${stage.name}" failed with exit code ${result.exitCode}`);
    }

    if (!opts.quiet) printTail(c, result.tail);

    if (opts.bail) {
      bailed = true;
      break;
    }
  }

  const totalDuration = Date.now() - pipelineStart;
  const ordered       = allStages.map(s => results.get(s.key));

  printSummaryTable(c, ordered);

  const counts = ordered.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1;
    return acc;
  }, {});

  const statLine = [
    counts.passed  ? c.green(`${counts.passed} passed`)   : null,
    counts.failed  ? c.red(`${counts.failed} failed`)     : null,
    counts.timeout ? c.red(`${counts.timeout} timed out`) : null,
    counts.skipped ? c.yellow(`${counts.skipped} skipped`) : null,
  ].filter(Boolean).join(c.dim('  ·  '));

  console.log(`\n  ${statLine}  ${c.dim(fmtTime(totalDuration))}\n`);

  if (opts.fix && !anyFailed) {
    console.log(`${c.yellow('⚡')} Fix mode applied — run ${c.bold('git diff')} to review changes.\n`);
  }

  if (logStream) {
    await new Promise(res => logStream.end(res));
    console.log(c.dim(`Log → ${opts.log}\n`));
  }

  if (anyFailed) {
    printBanner(c, '✘  PIPELINE FAILED', false);
    process.exit(1);
  } else if (!opts.dryRun) {
    printBanner(c, '✔  ALL GATES PASSED', true);
    process.exit(0);
  }
}

runPipeline().catch(err => {
  console.error('\nFatal error during pipeline execution:', err);
  process.exit(1);
});
