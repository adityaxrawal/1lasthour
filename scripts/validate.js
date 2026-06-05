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
 *                     Keys: deps, security, types, lint, format, debug, testing, build, artifacts, bundle-size
 *   --only=<keys>     Run only these stages (takes precedence over --skip)
 *   --fix             Auto-fix mode: swaps lint → lint:fix, format:check → format
 *   --no-bail         Continue on failure; show all results at the end
 *   --dry-run         Preview pipeline without executing any commands
 *   --log=<path>      Write full output to a log file (in addition to stdout)
 *   --timeout=<ms>    Per-stage timeout in ms (default: 180000)
 *   --ci              Force CI mode (auto-detected via $CI env var)
 *   --quiet           Suppress per-stage output; tail still shown on failure
 *   --help            Show this help message
 *
 * Examples:
 *   node scripts/validate.js
 *   node scripts/validate.js --skip=security,testing
 *   node scripts/validate.js --only=lint,format
 *   node scripts/validate.js --fix --no-bail
 *   node scripts/validate.js --dry-run
 *   node scripts/validate.js --log=logs/validate.log --quiet
 */

import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');

// ─────────────────────────────────────────────────────────────────────────────
// Configuration Constants
// ─────────────────────────────────────────────────────────────────────────────

const REQUIRED_ENVS = [
  'VITE_API_URL',
  'VITE_APP_NAME'
];

const REQUIRED_ARTIFACTS = [
  'dist/index.html'
];

const MAX_BUNDLE_SIZE_MB = 5;

const OPTIONAL_STAGES = [
  // Example future stages for React + Vite
  // {
  //   key: 'coverage',
  //   name: 'Coverage Validation',
  //   command: 'pnpm',
  //   args: ['run', 'test:coverage'],
  //   description: 'Validating test coverage meets required thresholds',
  //   allowFailure: true,
  // },
  // {
  //   key: 'circular',
  //   name: 'Circular Dependencies',
  //   command: 'pnpm',
  //   args: ['run', 'madge', '--circular', 'src'],
  //   description: 'Detecting circular dependencies in source files',
  //   allowFailure: true,
  // }
];

// ─────────────────────────────────────────────────────────────────────────────
// CLI Argument Parsing
// ─────────────────────────────────────────────────────────────────────────────

const argHandlers = {
  '--skip': (opts, val) => val.split(',').forEach((s) => opts.skip.add(s.trim().toLowerCase())),
  '--only': (opts, val) => val.split(',').forEach((s) => opts.only.add(s.trim().toLowerCase())),
  '--fix': (opts) => {
    opts.fix = true;
  },
  '--no-bail': (opts) => {
    opts.bail = false;
  },
  '--dry-run': (opts) => {
    opts.dryRun = true;
  },
  '--log': (opts, val) => {
    opts.log = val;
  },
  '--timeout': (opts, val) => {
    opts.timeout = parseInt(val, 10);
  },
  '--ci': (opts) => {
    opts.ci = true;
  },
  '--quiet': (opts) => {
    opts.quiet = true;
  },
};

function parseArgs(argv) {
  const args = argv.slice(2);
  checkHelp(args);

  const opts = {
    skip: new Set(),
    only: new Set(),
    fix: false,
    bail: true,
    dryRun: false,
    log: null,
    timeout: 180_000,
    ci: !!process.env.CI,
    quiet: false,
  };

  for (const arg of args) {
    const eqIdx = arg.indexOf('=');
    const key = eqIdx > -1 ? arg.slice(0, eqIdx) : arg;
    const val = eqIdx > -1 ? arg.slice(eqIdx + 1) : '';
    const handler = argHandlers[key];
    if (handler) handler(opts, val);
  }

  return opts;
}

function checkHelp(args) {
  if (!args.includes('--help') && !args.includes('-h')) return;
  const src = fs.readFileSync(__filename, 'utf8');
  const jsdoc = src.match(/\/\*\*([\s\S]*?)\*\//);
  if (jsdoc) console.log(jsdoc[0]);
  process.exit(0);
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scans the source directory for console.log or debugger statements.
 */
async function scanForDebugStatements(opts, logWrite) {
  const dir = path.join(ROOT, 'src');
  const ext = /\.(js|jsx|ts|tsx)$/;
  const violations = [];

  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && ext.test(entry.name)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes('console.log') || line.includes('debugger')) {
            violations.push(`  - ${path.relative(ROOT, fullPath)}:${i + 1}`);
          }
        }
      }
    }
  }

  walk(dir);

  if (violations.length > 0) {
    logWrite('Debug statements found:\n' + violations.join('\n') + '\n');
    return { status: 'failed', tail: ['Debug statements found:', ...violations] };
  }

  logWrite('No debug statements found.\n');
  return { status: 'passed', tail: [] };
}

/**
 * Verifies that required production artifacts exist after a build.
 */
async function validateArtifacts(opts, logWrite) {
  const missing = [];
  for (const artifact of REQUIRED_ARTIFACTS) {
    const fullPath = path.join(ROOT, artifact);
    if (!fs.existsSync(fullPath)) {
      missing.push(artifact);
    }
  }

  if (missing.length > 0) {
    const msg = `Missing required artifacts: ${missing.join(', ')}`;
    logWrite(msg + '\n');
    return { status: 'failed', tail: [msg] };
  }

  logWrite('All required artifacts are present.\n');
  return { status: 'passed', tail: [] };
}

/**
 * Recursively calculates the total size of a directory in bytes.
 */
function calculateDirectorySize(dir) {
  let size = 0;
  if (!fs.existsSync(dir)) return 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      size += calculateDirectorySize(fullPath);
    } else if (entry.isFile()) {
      size += fs.statSync(fullPath).size;
    }
  }
  return size;
}

/**
 * Validates that the production bundle size is within the allowed threshold.
 */
async function validateBundleSize(opts, logWrite) {
  const distDir = path.join(ROOT, 'dist');
  const sizeBytes = calculateDirectorySize(distDir);
  const sizeMB = sizeBytes / (1024 * 1024);

  if (sizeMB > MAX_BUNDLE_SIZE_MB) {
    const msg = `Bundle size exceeded limit (${sizeMB.toFixed(2)} MB > ${MAX_BUNDLE_SIZE_MB} MB)`;
    logWrite(msg + '\n');
    return { status: 'failed', tail: [msg] };
  }

  const msg = `📦 Bundle size: ${sizeMB.toFixed(2)} MB`;
  logWrite(msg + '\n');

  if (!opts.quiet) {
    console.log(`     ${msg}\n`);
  }

  return { status: 'passed', tail: [msg] };
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage Definitions
// ─────────────────────────────────────────────────────────────────────────────

function buildStages(opts) {
  return [
    {
      key: 'deps',
      name: 'Dependency Validation',
      command: 'pnpm',
      args: ['install', '--frozen-lockfile'],
      description: 'Detecting package.json changes without lockfile updates',
      allowFailure: false,
    },
    {
      key: 'security',
      name: 'Security Audit',
      command: 'pnpm',
      args: ['audit', '--audit-level=high'],
      description: 'Scanning for high-severity dependency vulnerabilities',
      allowFailure: false,
    },
    {
      key: 'types',
      name: 'Type Checking',
      command: 'pnpm',
      args: ['exec', 'tsc', '--noEmit'],
      description: 'Validating TypeScript correctness and interfaces',
      allowFailure: false,
    },
    {
      key: 'lint',
      name: 'Linting',
      command: 'pnpm',
      args: opts.fix ? ['run', 'lint:fix'] : ['run', 'lint'],
      description: opts.fix ? 'Auto-fixing ESLint violations' : 'Checking for ESLint violations',
      allowFailure: false,
    },
    {
      key: 'format',
      name: 'Formatting',
      command: 'pnpm',
      args: opts.fix ? ['run', 'format'] : ['run', 'format:check'],
      description: opts.fix
        ? 'Auto-formatting source files via Prettier'
        : 'Verifying Prettier formatting',
      allowFailure: false,
    },
    {
      key: 'debug',
      name: 'Debug Statement Check',
      description: 'Scanning for console.log and debugger statements',
      allowFailure: false,
      action: scanForDebugStatements,
    },
    {
      key: 'testing',
      name: 'Tests',
      command: 'pnpm',
      args: ['run', 'test:ci'],
      description: 'Running unit and integration test suites',
      allowFailure: false,
    },
    {
      key: 'build',
      name: 'Production Build',
      command: 'pnpm',
      args: ['run', 'build'],
      description: 'Compiling and validating production artifacts',
      allowFailure: false,
    },
    {
      key: 'artifacts',
      name: 'Artifact Validation',
      description: 'Verifying existence of critical production files',
      allowFailure: false,
      action: validateArtifacts,
    },
    {
      key: 'bundle-size',
      name: 'Bundle Size Validation',
      description: 'Measuring total size of production bundle',
      allowFailure: false,
      action: validateBundleSize,
    },
    ...OPTIONAL_STAGES,
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal Colors
// ─────────────────────────────────────────────────────────────────────────────

function makeColors(enabled) {
  if (!enabled) {
    const id = (s) => String(s);
    return {
      reset: id,
      bold: id,
      dim: id,
      green: id,
      red: id,
      yellow: id,
      cyan: id,
      bgRed: id,
      bgGreen: id,
      bgYellow: id,
    };
  }
  const e = (open, close) => (s) => `\x1b[${open}m${s}\x1b[${close}m`;
  return {
    reset: (s) => `\x1b[0m${s}\x1b[0m`,
    bold: e('1', '22'),
    dim: e('2', '22'),
    green: e('32', '39'),
    red: e('31', '39'),
    yellow: e('33', '39'),
    cyan: e('36', '39'),
    bgRed: e('41', '49'),
    bgGreen: e('42', '49'),
    bgYellow: e('43', '49'),
  };
}

/** Strip ANSI escape codes to get true visible character length */
function visLen(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '').length;
}

/** Pad right based on visible character count (ANSI-safe) */
function rpad(str, width) {
  const pad = Math.max(0, width - visLen(str));
  return str + ' '.repeat(pad);
}

// ─────────────────────────────────────────────────────────────────────────────
// Output Formatting
// ─────────────────────────────────────────────────────────────────────────────

const fmtTime = (ms) => `${(ms / 1000).toFixed(2)}s`;

function printBanner(c, text, success = true) {
  const inner = `  ${text}  `;
  const bar = '─'.repeat(inner.length + 2);
  const color = success ? c.green : c.red;
  console.log(`\n${color(c.bold(`┌${bar}┐`))}`);
  console.log(`${color(c.bold(`│ ${inner} │`))}`);
  console.log(`${color(c.bold(`└${bar}┘`))}\n`);
}

const statusFormatters = {
  passed: (c) => c.green('✔  PASSED'),
  failed: (c) => c.red('✘  FAILED'),
  timeout: (c) => c.red('⏱  TIMEOUT'),
  skipped: (c) => c.yellow('⏭  SKIPPED'),
};

function printSummaryTable(c, results) {
  const NAME_W = Math.max(14, ...results.map((r) => r.name.length)) + 2;
  const STATUS_W = 11; // "⏭ SKIPPED " padded

  const header = rpad(c.bold('Stage'), NAME_W) + rpad(c.bold('Status'), STATUS_W) + c.bold('Time');
  const divider = c.dim('─'.repeat(NAME_W + STATUS_W + 10));

  console.log(`\n${header}`);
  console.log(divider);

  for (const r of results) {
    const formatter = statusFormatters[r.status] || ((c) => c.dim('○  ------'));
    const statusStr = formatter(c);

    const timeStr = r.duration != null ? c.dim(fmtTime(r.duration)) : c.dim('—');
    const nameStr = r.status === 'skipped' ? c.dim(r.name) : r.name;

    console.log(rpad(nameStr, NAME_W) + rpad(statusStr, STATUS_W) + timeStr);
  }

  console.log(divider);
}

/** Print the last N lines of a stage's output as context for a failure */
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

function checkNodeVersion(errors) {
  const [nodeMajor] = process.versions.node.split('.').map(Number);
  if (nodeMajor < 22) {
    errors.push(`Node.js ≥ 22 required — found v${process.versions.node}`);
  }
}

function checkPnpm(errors, warns) {
  const pnpm = spawnSync('pnpm', ['--version'], { shell: process.platform === 'win32', encoding: 'utf8' });
  if (pnpm.error || pnpm.status !== 0) {
    errors.push('pnpm not found — install via: npm install -g pnpm');
  } else {
    const [pnpmMajor] = (pnpm.stdout || '').trim().split('.').map(Number);
    if (pnpmMajor < 8) warns.push(`pnpm v8+ recommended — found v${pnpm.stdout.trim()}`);
  }
}

function checkNodeModules(errors) {
  if (!fs.existsSync(path.join(ROOT, 'node_modules'))) {
    errors.push('node_modules not found — run: pnpm install');
  }
}

function checkPackageJson(errors) {
  if (!fs.existsSync(path.join(ROOT, 'package.json'))) {
    errors.push('package.json not found — are you in the right directory?');
  }
}

function checkGitStatus(warns) {
  const git = spawnSync('git', ['status', '--porcelain'], {
    shell: process.platform === 'win32',
    encoding: 'utf8',
    cwd: ROOT,
  });
  if (!git.error && git.stdout && git.stdout.trim()) {
    warns.push('Working tree has uncommitted changes');
  }
}

function validateEnv(errors, logWrite) {
  const envPath = path.join(ROOT, '.env.production');
  
  if (!fs.existsSync(envPath)) {
    const msg = `Environment file missing:\n  .env.production`;
    errors.push(msg);
    if (logWrite) logWrite(`Error: ${msg}\n`);
    return;
  }

  const content = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        envVars[key] = val;
      }
    }
  }

  let hasErrors = false;
  for (const req of REQUIRED_ENVS) {
    if (!(req in envVars)) {
      const msg = `Missing environment variable:\n  ${req}\n\n  Add it to:\n  .env.production`;
      errors.push(msg);
      if (logWrite) logWrite(`Error: ${msg}\n`);
      hasErrors = true;
    } else if (!envVars[req]) {
      const msg = `Empty environment variable:\n  ${req}\n\n  Provide a value in:\n  .env.production`;
      errors.push(msg);
      if (logWrite) logWrite(`Error: ${msg}\n`);
      hasErrors = true;
    }
  }
  
  if (logWrite && !hasErrors) {
    logWrite('Environment variables validated successfully.\n');
  }
}

function validateScripts(errors, allStages, logWrite) {
  const pkgPath = path.join(ROOT, 'package.json');
  if (!fs.existsSync(pkgPath)) return;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const scripts = pkg.scripts || {};

  const requiredScripts = ['build', 'lint', 'format:check', 'test:ci'];
  for (const req of requiredScripts) {
    if (!scripts[req]) {
      const msg = `Missing required package script:\n  "${req}"`;
      errors.push(msg);
      if (logWrite) logWrite(`Error: ${msg}\n`);
    }
  }

  for (const stage of allStages) {
    if (stage.command === 'pnpm' && stage.args[0] === 'run') {
      const scriptName = stage.args[1];
      if (scriptName && !scripts[scriptName]) {
        const msg = `Stage "${stage.name}" requires script "${scriptName}" which is missing from package.json`;
        errors.push(msg);
        if (logWrite) logWrite(`Error: ${msg}\n`);
      }
    }
  }
}

function validateBranch(warns, logWrite) {
  const git = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
    shell: process.platform === 'win32',
    encoding: 'utf8',
    cwd: ROOT,
  });
  if (!git.error && git.stdout) {
    const branch = git.stdout.trim();
    if (!['main', 'master', 'release'].includes(branch)) {
      const msg = `Running from non-release branch: ${branch}`;
      warns.push(msg);
      if (logWrite) logWrite(`Warning: ${msg}\n`);
    }
  }
}

function runPreflightChecks(c, allStages, logWrite) {
  const errors = [];
  const warns = [];

  if (logWrite) logWrite('--- Starting Pre-flight Checks ---\n');

  checkNodeVersion(errors);
  checkPnpm(errors, warns);
  checkNodeModules(errors);
  checkPackageJson(errors);
  checkGitStatus(warns);
  
  validateEnv(errors, logWrite);
  validateScripts(errors, allStages, logWrite);
  validateBranch(warns, logWrite);

  if (warns.length) {
    for (const w of warns) {
      console.log(`  ${c.yellow('⚠')} ${c.yellow(w)}`);
    }
    console.log('');
  }

  if (errors.length) {
    console.log(`${c.bgRed(c.bold(' PRE-FLIGHT FAILED '))}\n`);
    for (const e of errors) {
      console.log(`  ${c.red('✘')} ${e.replace(/\n/g, '\n    ')}`);
    }
    console.log('');
    process.exit(1);
  }

  if (logWrite) logWrite('--- Pre-flight Checks Passed ---\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage Runner (async, with timeout + tail buffer)
// ─────────────────────────────────────────────────────────────────────────────

function runStage(stage, opts, logWrite) {
  if (stage.action) {
    return new Promise(async (resolve) => {
      const t0 = Date.now();
      try {
        const { status, tail } = await stage.action(opts, logWrite);
        resolve({ status, duration: Date.now() - t0, tail, exitCode: status === 'passed' ? 0 : 1 });
      } catch (err) {
        resolve({ status: 'failed', duration: Date.now() - t0, tail: [err.message], exitCode: -1 });
      }
    });
  }

  return new Promise((resolve) => {
    const t0 = Date.now();
    const tail = [];
    const TAIL = 40;

    const proc = spawn(stage.command, stage.args, {
      shell: process.platform === 'win32',
      cwd: ROOT,
      env: { ...process.env, FORCE_COLOR: opts.ci ? '0' : '1' },
    });

    const onData = (chunk) => {
      const text = chunk.toString();
      logWrite(text);
      if (!opts.quiet) process.stdout.write(text);
      text
        .split('\n')
        .filter((l) => l.trim())
        .forEach((l) => {
          tail.push(l);
          if (tail.length > TAIL) tail.shift();
        });
    };

    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);

    // Per-stage timeout: SIGTERM first, then SIGKILL after 5 s
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      proc.kill('SIGTERM');
      setTimeout(() => {
        try {
          proc.kill('SIGKILL');
        } catch {}
      }, 5_000);
    }, opts.timeout);

    proc.on('close', (code, signal) => {
      clearTimeout(timer);
      const duration = Date.now() - t0;
      if (timedOut) resolve({ status: 'timeout', duration, tail });
      else if (code === 0) resolve({ status: 'passed', duration, tail: [] });
      else resolve({ status: 'failed', duration, tail, exitCode: code ?? signal });
    });

    proc.on('error', (err) => {
      clearTimeout(timer);
      resolve({ status: 'failed', duration: Date.now() - t0, tail: [err.message], exitCode: -1 });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Orchestrator
// ─────────────────────────────────────────────────────────────────────────────

function setupLogger(opts, c) {
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
  const logWrite = (text) => {
    if (logStream) logStream.write(text);
  };
  return { logStream, logWrite };
}

function printPlan(c, opts, allStages, activeStages) {
  printBanner(c, 'PRODUCTION VALIDATION PIPELINE');

  if (opts.dryRun)
    console.log(`${c.bgYellow(c.bold(' DRY RUN '))} No commands will be executed.\n`);
  if (opts.fix)
    console.log(`${c.yellow('⚡ FIX MODE')}  lint:fix + format will run instead of checks.\n`);
  if (!opts.bail)
    console.log(`${c.yellow('◎ NO-BAIL')}   Pipeline will continue through failures.\n`);

  console.log(c.bold('Stages:'));
  for (const s of allStages) {
    const active = activeStages.includes(s);
    console.log(`  ${active ? c.cyan('▶') : c.dim('○')}  ${active ? s.name : c.dim(s.name)}`);
  }
  console.log('');
}

function printStageStart(c, opts, stage, num, total) {
  const idx = `[${num}/${total}]`;
  if (opts.ci) console.log(`::group::${stage.name}`);
  console.log(`${c.bold(idx)} ${c.bold(stage.name)}`);
  console.log(c.dim(`     ${stage.description}`));
  if (stage.command) {
    console.log(c.dim(`     $ ${stage.command} ${stage.args.join(' ')}\n`));
  } else {
    console.log(c.dim(`     $ [internal validation]\n`));
  }
  if (opts.dryRun) {
    console.log(c.dim('     [dry-run: skipped]\n'));
  }
}

function handleStageResult(c, opts, stage, result) {
  if (result.status === 'passed') {
    console.log(
      `${c.green('✔')} ${c.bold(stage.name)} ${c.dim(`passed in ${fmtTime(result.duration)}`)}\n`
    );
    return false;
  }

  if (stage.allowFailure) {
    console.log(
      `${c.yellow('⚠')} ${c.bold(stage.name)} ${c.dim('failed but is marked non-blocking')}\n`
    );
    return false;
  }

  if (result.status === 'timeout') {
    console.log(
      `${c.bgRed(c.bold(' TIMEOUT '))} "${stage.name}" exceeded ${fmtTime(opts.timeout)}\n`
    );
    if (opts.ci)
      console.log(`::error::Stage "${stage.name}" timed out after ${fmtTime(opts.timeout)}`);
  } else {
    console.log(
      `${c.bgRed(c.bold(' FAILED '))} "${stage.name}" exited with code ${result.exitCode}\n`
    );
    if (opts.ci)
      console.log(`::error::Stage "${stage.name}" failed with exit code ${result.exitCode}`);
  }

  if (!opts.quiet) printTail(c, result.tail);
  return true;
}

async function executeActiveStages(c, opts, activeStages, results, logWrite) {
  let anyFailed = false;

  for (let i = 0; i < activeStages.length; i++) {
    const stage = activeStages[i];
    printStageStart(c, opts, stage, i + 1, activeStages.length);

    if (opts.dryRun) {
      if (opts.ci) console.log('::endgroup::');
      continue;
    }

    const result = await runStage(stage, opts, logWrite);
    results.set(stage.key, { key: stage.key, name: stage.name, ...result });

    if (opts.ci) console.log('::endgroup::');

    if (handleStageResult(c, opts, stage, result)) {
      anyFailed = true;
      if (opts.bail) break;
    }
  }

  return anyFailed;
}

function printStatLine(c, ordered, totalDuration) {
  const counts = ordered.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1;
    return acc;
  }, {});

  const statLineParts = [];
  if (counts.passed) statLineParts.push(c.green(`${counts.passed} passed`));
  if (counts.failed) statLineParts.push(c.red(`${counts.failed} failed`));
  if (counts.timeout) statLineParts.push(c.red(`${counts.timeout} timed out`));
  if (counts.skipped) statLineParts.push(c.yellow(`${counts.skipped} skipped`));

  const statLine = statLineParts.join(c.dim('  ·  '));
  console.log(`\n  ${statLine}  ${c.dim(fmtTime(totalDuration))}\n`);
}

function exitPipeline(c, opts, anyFailed) {
  if (anyFailed) {
    printBanner(c, '✘  PIPELINE FAILED', false);
    process.exit(1);
  } else if (!opts.dryRun) {
    printBanner(c, '✔  ALL GATES PASSED', true);
    process.exit(0);
  }
}

async function finalizePipeline(c, opts, allStages, results, pipelineStart, anyFailed, logStream) {
  const totalDuration = Date.now() - pipelineStart;
  const ordered = allStages.map((s) => results.get(s.key));

  printSummaryTable(c, ordered);
  printStatLine(c, ordered, totalDuration);

  if (opts.fix && !anyFailed) {
    console.log(
      `${c.yellow('⚡')} Fix mode applied — run ${c.bold('git diff')} to review changes.\n`
    );
  }

  if (logStream) {
    await new Promise((res) => logStream.end(res));
    console.log(c.dim(`Log → ${opts.log}\n`));
  }

  exitPipeline(c, opts, anyFailed);
}

async function runPipeline() {
  const opts = parseArgs(process.argv);
  const c = makeColors(process.stdout.isTTY && !opts.ci);

  const { logStream, logWrite } = setupLogger(opts, c);

  const allStages = buildStages(opts);
  const activeStages = allStages.filter((s) =>
    opts.only.size > 0 ? opts.only.has(s.key) : !opts.skip.has(s.key)
  );

  printPlan(c, opts, allStages, activeStages);

  if (!opts.dryRun) {
    runPreflightChecks(c, allStages, logWrite);
    console.log(`${c.green('✔')} Pre-flight checks passed\n`);
  }

  const results = new Map(
    allStages.map((s) => [s.key, { key: s.key, name: s.name, status: 'skipped', duration: null }])
  );

  const pipelineStart = Date.now();
  const anyFailed = await executeActiveStages(c, opts, activeStages, results, logWrite);

  await finalizePipeline(c, opts, allStages, results, pipelineStart, anyFailed, logStream);
}

export { parseArgs, buildStages, makeColors, visLen, rpad, runPreflightChecks, printStatLine };

// Only run automatically if executed directly (not imported as a module)
const isMain = typeof process !== 'undefined' && process.argv[1] === __filename;
if (isMain) {
  runPipeline().catch((err) => {
    console.error('\nFatal error during pipeline execution:', err);
    process.exit(1);
  });
}
