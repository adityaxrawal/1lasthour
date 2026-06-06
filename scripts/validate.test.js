import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'node:fs';
import child_process from 'node:child_process';
import {
  parseArgs,
  buildStages,
  makeColors,
  visLen,
  rpad,
  runPreflightChecks,
  printStatLine,
} from './validate.js';

vi.mock('node:fs', () => {
  const existsSync = vi.fn();
  const readFileSync = vi.fn();
  const mkdirSync = vi.fn();
  const createWriteStream = vi.fn();
  return {
    default: { existsSync, readFileSync, mkdirSync, createWriteStream },
    existsSync,
    readFileSync,
    mkdirSync,
    createWriteStream,
  };
});

vi.mock('node:child_process', () => {
  const spawnSync = vi.fn();
  const spawn = vi.fn();
  return {
    default: { spawnSync, spawn },
    spawnSync,
    spawn,
  };
});

describe('validate.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('parseArgs', () => {
    it('should parse standard arguments correctly', () => {
      const argv = [
        'node',
        'validate.js',
        '--skip=lint,format',
        '--fix',
        '--no-bail',
        '--timeout=5000',
      ];
      const opts = parseArgs(argv);

      expect(opts.skip.has('lint')).toBe(true);
      expect(opts.skip.has('format')).toBe(true);
      expect(opts.fix).toBe(true);
      expect(opts.bail).toBe(false);
      expect(opts.timeout).toBe(5000);
      expect(opts.dryRun).toBe(false);
    });

    it('should handle only and ci flags', () => {
      const argv = ['node', 'validate.js', '--only=testing', '--ci', '--quiet'];
      const opts = parseArgs(argv);

      expect(opts.only.has('testing')).toBe(true);
      expect(opts.ci).toBe(true);
      expect(opts.quiet).toBe(true);
    });

    it('should parse dry run and log file', () => {
      const argv = ['node', 'validate.js', '--dry-run', '--log=test.log'];
      const opts = parseArgs(argv);

      expect(opts.dryRun).toBe(true);
      expect(opts.log).toBe('test.log');
    });
  });

  describe('buildStages', () => {
    it('should build default stages', () => {
      const opts = { fix: false };
      const stages = buildStages(opts);

      expect(stages.length).toBe(10);
      expect(stages.map((s) => s.key)).toEqual([
        'deps',
        'security',
        'types',
        'lint',
        'format',
        'debug',
        'testing',
        'build',
        'artifacts',
        'bundle-size',
      ]);

      const lintStage = stages.find((s) => s.key === 'lint');
      expect(lintStage.args).toContain('lint');
    });

    it('should adjust args if fix is true', () => {
      const opts = { fix: true };
      const stages = buildStages(opts);

      const lintStage = stages.find((s) => s.key === 'lint');
      expect(lintStage.args).toContain('lint:fix');
    });
  });

  describe('makeColors', () => {
    it('should return identity functions if disabled', () => {
      const c = makeColors(false);
      expect(c.green('test')).toBe('test');
    });

    it('should return ansi strings if enabled', () => {
      const c = makeColors(true);
      expect(c.green('test')).toBe('\x1b[32mtest\x1b[39m');
    });
  });

  describe('Formatting Utils', () => {
    it('visLen should calculate length ignoring ansi codes', () => {
      const c = makeColors(true);
      const colored = c.green('test');
      expect(colored.length).toBeGreaterThan(4);
      expect(visLen(colored)).toBe(4);
    });

    it('rpad should pad correctly based on visible length', () => {
      const c = makeColors(true);
      const colored = c.green('test');
      const padded = rpad(colored, 10);
      // 'test' is 4 chars, needs 6 spaces.
      expect(padded.endsWith('      ')).toBe(true);
    });
  });

  describe('runPreflightChecks', () => {
    let mockExit, mockLog;
    beforeEach(() => {
      mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {});
      mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});
      // Mock Node Version
      Object.defineProperty(process, 'versions', {
        value: { node: '22.0.0' },
        configurable: true,
      });
    });

    it('should pass if all dependencies exist', () => {
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockImplementation((path) => {
        if (path.includes('package.json'))
          return '{"scripts": {"build": "a","lint": "a","format:check": "a","test:ci": "a"}}';
        return 'VITE_API_BASE_URL=http://localhost\n';
      });
      child_process.spawnSync.mockReturnValue({
        status: 0,
        stdout: '8.0.0\n',
        error: null,
      });

      const c = makeColors(false);
      runPreflightChecks(c, []);

      expect(mockExit).not.toHaveBeenCalled();
    });

    it('should fail if node_modules missing', () => {
      fs.existsSync.mockImplementation((p) => !p.includes('node_modules'));
      fs.readFileSync.mockImplementation((path) => {
        if (path.includes('package.json'))
          return '{"scripts": {"build": "","lint": "","format:check": "","test:ci": ""}}';
        return 'VITE_API_BASE_URL=http://localhost\n';
      });
      child_process.spawnSync.mockReturnValue({ status: 0, stdout: '8.0.0\n' });

      const c = makeColors(false);
      runPreflightChecks(c, []);

      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should fail if node version is < 22', () => {
      Object.defineProperty(process, 'versions', { value: { node: '20.0.0' } });
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockImplementation((path) => {
        if (path.includes('package.json'))
          return '{"scripts": {"build": "","lint": "","format:check": "","test:ci": ""}}';
        return 'VITE_API_BASE_URL=http://localhost\n';
      });
      child_process.spawnSync.mockReturnValue({ status: 0, stdout: '8.0.0\n' });

      const c = makeColors(false);
      runPreflightChecks(c, []);

      expect(mockExit).toHaveBeenCalledWith(1);
    });
  });

  describe('printStatLine', () => {
    let mockLog;
    beforeEach(() => {
      mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    it('should format stats correctly', () => {
      const c = makeColors(false);
      const ordered = [
        { status: 'passed' },
        { status: 'passed' },
        { status: 'failed' },
        { status: 'skipped' },
        { status: 'timeout' },
      ];

      printStatLine(c, ordered, 1500);
      expect(mockLog).toHaveBeenCalled();
      const lastCall = mockLog.mock.calls[0][0];
      expect(lastCall).toContain('2 passed');
      expect(lastCall).toContain('1 failed');
      expect(lastCall).toContain('1 skipped');
      expect(lastCall).toContain('1 timed out');
      expect(lastCall).toContain('1.50s');
    });
  });
});
