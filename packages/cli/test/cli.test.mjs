import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import {
  extractBearerToken,
  getProCatalog,
  getProComponent,
  verifyProToken,
} from '../../../lib/pro-registry.mjs';
import { runCli } from '../src/index.mjs';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '../../..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

test('public/r excludes Pro component payloads', async () => {
  const publicFiles = await fs.readdir(path.join(PUBLIC_DIR, 'r'));
  assert.ok(!publicFiles.includes('activity-pill.json'));
  assert.ok(!publicFiles.includes('swipe-row.json'));
  assert.ok(publicFiles.includes('button.json'));
  assert.ok(publicFiles.includes('utils.json'));
});

test('fort-ui init and add install free web components and tokens idempotently', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fort-ui-web-'));

  try {
    await fs.mkdir(path.join(tmpDir, 'src', 'app'), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, 'package.json'),
      JSON.stringify({ name: 'demo-app', dependencies: { next: '16.4.0' } }),
    );
    await fs.writeFile(
      path.join(tmpDir, 'src', 'app', 'globals.css'),
      "@import 'tailwindcss';\n",
    );

    await runCli(['init', '--cwd', tmpDir, '--registry', PUBLIC_DIR]);
    await runCli(['init', '--cwd', tmpDir, '--registry', PUBLIC_DIR]);

    const config = JSON.parse(
      await fs.readFile(path.join(tmpDir, 'fort-ui.json'), 'utf8'),
    );
    assert.equal(config.platform, 'web');
    assert.equal(config.hasSrc, true);

    const css = await fs.readFile(
      path.join(tmpDir, 'src', 'app', 'globals.css'),
      'utf8',
    );
    assert.equal(
      css.match(/\/\* fort-ui:tokens:start \*\//g)?.length,
      1,
      'tokens should be injected once',
    );

    await runCli([
      'add',
      '--all',
      '--cwd',
      tmpDir,
      '--registry',
      PUBLIC_DIR,
      '--no-install',
    ]);

    const uiDir = path.join(tmpDir, 'src', 'components', 'ui');
    const files = await fs.readdir(uiDir);
    assert.equal(files.length, 25);
    assert.ok(files.includes('button.tsx'));
    assert.ok(files.includes('select.tsx'));
    assert.ok(files.includes('otp-input.tsx'));
    assert.ok(!files.includes('activity-pill.tsx'));
    assert.ok(!files.includes('swipe-row.tsx'));
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test('Pro endpoint protection verifies bearer tokens and authenticates CLI installs', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fort-ui-pro-'));
  const homeDir = path.join(tmpDir, 'fort-home');
  const appDir = path.join(tmpDir, 'app');
  const prevHome = process.env.FORT_UI_HOME;
  const prevFetch = globalThis.fetch;

  const serverEnv = { FORT_UI_PRO_TOKENS: 'fort_pro_valid_123, fort_pro_team_456' };

  assert.deepEqual(verifyProToken('fort_pro_valid_123', {}), {
    configured: false,
    valid: false,
  });
  assert.equal(await getProComponent('../package', ROOT_DIR), null);
  assert.equal(await getProComponent('button', ROOT_DIR), null);

  const proCatalog = await getProCatalog(ROOT_DIR);
  for (const item of proCatalog.items) {
    for (const file of item.files) {
      assert.equal(file.content, undefined, 'catalog must not expose source');
    }
  }

  globalThis.fetch = async (url, init = {}) => {
    const parsed = new URL(String(url));
    if (parsed.pathname === '/api/r/pro') {
      return new Response(JSON.stringify(await getProCatalog(ROOT_DIR)), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }
    if (parsed.pathname.startsWith('/api/r/pro/')) {
      const name = parsed.pathname.slice('/api/r/pro/'.length);
      const token = extractBearerToken(init.headers);
      const check = verifyProToken(token, serverEnv);
      if (!check.configured) {
        return new Response(JSON.stringify({ error: 'Not configured' }), {
          status: 503,
        });
      }
      if (!check.valid) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
        });
      }
      const item = await getProComponent(name, ROOT_DIR);
      if (!item) {
        return new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(item), { status: 200 });
    }

    const filePath = path.join(PUBLIC_DIR, parsed.pathname.replace(/^\/+/, ''));
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      return new Response(raw, { status: 200 });
    } catch {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
      });
    }
  };

  try {
    process.env.FORT_UI_HOME = homeDir;
    await fs.mkdir(appDir, { recursive: true });
    await fs.writeFile(
      path.join(appDir, 'package.json'),
      JSON.stringify({ name: 'pro-demo', dependencies: { next: '16.4.0' } }),
    );

    await assert.rejects(
      runCli([
        'add',
        'activity-pill',
        '--cwd',
        appDir,
        '--registry',
        'https://fort-ui.test',
        '--no-install',
      ]),
      /requires a fort-ui Pro license token/,
    );

    await assert.rejects(
      runCli([
        'add',
        'activity-pill',
        '--token',
        'wrong-key',
        '--cwd',
        appDir,
        '--registry',
        'https://fort-ui.test',
        '--no-install',
      ]),
      /Unauthorized for Pro component/,
    );

    await runCli(['auth', 'fort_pro_valid_123']);
    const authStat = await fs.stat(path.join(homeDir, 'auth.json'));
    assert.equal(authStat.mode & 0o777, 0o600);

    await runCli([
      'add',
      'activity-pill',
      'swipe-row',
      '--cwd',
      appDir,
      '--registry',
      'https://fort-ui.test',
      '--no-install',
    ]);

    const installed = await fs.readdir(path.join(appDir, 'components', 'ui'));
    assert.ok(installed.includes('activity-pill.tsx'));
    assert.ok(installed.includes('swipe-row.tsx'));
    await fs.access(path.join(appDir, 'lib', 'utils.ts'));

    await runCli(['auth', '--clear']);

    const freeOnlyDir = path.join(tmpDir, 'free-only');
    await fs.mkdir(freeOnlyDir, { recursive: true });
    await fs.writeFile(
      path.join(freeOnlyDir, 'package.json'),
      JSON.stringify({ name: 'free-demo', dependencies: { next: '16.4.0' } }),
    );
    await runCli([
      'add',
      '--all',
      '--cwd',
      freeOnlyDir,
      '--registry',
      'https://fort-ui.test',
      '--no-install',
    ]);
    const freeInstalled = await fs.readdir(
      path.join(freeOnlyDir, 'components', 'ui'),
    );
    assert.equal(freeInstalled.length, 25);
    assert.ok(!freeInstalled.includes('activity-pill.tsx'));
    assert.ok(!freeInstalled.includes('swipe-row.tsx'));
  } finally {
    globalThis.fetch = prevFetch;
    if (prevHome === undefined) delete process.env.FORT_UI_HOME;
    else process.env.FORT_UI_HOME = prevHome;
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test('fort-ui add respects existing files unless --overwrite is passed', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fort-ui-ow-'));

  try {
    await fs.mkdir(path.join(tmpDir, 'components', 'ui'), { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, 'package.json'),
      JSON.stringify({ name: 'demo-app', dependencies: { next: '16.4.0' } }),
    );
    const buttonPath = path.join(tmpDir, 'components', 'ui', 'button.tsx');
    await fs.writeFile(buttonPath, '// custom user button\n');

    await runCli([
      'add',
      'button',
      '--cwd',
      tmpDir,
      '--registry',
      PUBLIC_DIR,
      '--no-install',
    ]);
    assert.equal(
      await fs.readFile(buttonPath, 'utf8'),
      '// custom user button\n',
    );

    await runCli([
      'add',
      'button',
      '--overwrite',
      '--cwd',
      tmpDir,
      '--registry',
      PUBLIC_DIR,
      '--no-install',
    ]);
    assert.match(await fs.readFile(buttonPath, 'utf8'), /export function Button/);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test('fort-ui init and add install all Expo / React Native components and tokens', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fort-ui-expo-'));
  try {
    await fs.writeFile(
      path.join(tmpDir, 'package.json'),
      JSON.stringify({
        name: 'expo-app',
        dependencies: { expo: '^53.0.0', 'react-native': '0.79.0' },
      }),
    );

    await runCli(['init', '--cwd', tmpDir, '--registry', PUBLIC_DIR]);
    const config = JSON.parse(
      await fs.readFile(path.join(tmpDir, 'fort-ui.json'), 'utf8'),
    );
    assert.equal(config.platform, 'native');

    const tokensFile = await fs.readFile(
      path.join(tmpDir, 'lib', 'fort-tokens.ts'),
      'utf8',
    );
    assert.match(tokensFile, /export function useFortTheme/);

    await runCli([
      'add',
      '--all',
      '--cwd',
      tmpDir,
      '--registry',
      PUBLIC_DIR,
      '--no-install',
    ]);

    const uiDir = path.join(tmpDir, 'components', 'ui');
    const files = await fs.readdir(uiDir);
    assert.equal(files.length, 14);
    for (const expected of [
      'button.tsx',
      'badge.tsx',
      'switch.tsx',
      'input.tsx',
      'card.tsx',
      'grouped-list.tsx',
      'segmented-control.tsx',
      'checkbox.tsx',
      'progress.tsx',
      'avatar.tsx',
      'alert-dialog.tsx',
      'action-sheet.tsx',
      'sheet.tsx',
      'tab-bar.tsx',
    ]) {
      assert.ok(files.includes(expected), `Expected ${expected} in native ui dir`);
    }
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test('registry/native TypeScript files typecheck cleanly', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fort-ui-tsc-'));
  const tscBin = path.join(ROOT_DIR, 'node_modules', '.bin', 'tsc');

  try {
    await fs.writeFile(
      path.join(tmpDir, 'react-native.d.ts'),
      `declare module 'react-native' {
  import type * as React from 'react';
  export type ViewStyle = Record<string, unknown>;
  export type TextStyle = Record<string, unknown>;
  export type ImageStyle = Record<string, unknown>;
  export type StyleProp<T> = T | false | null | undefined | StyleProp<T>[];
  export interface LayoutChangeEvent {
    nativeEvent: { layout: { x: number; y: number; width: number; height: number } };
  }
  export interface NativeSyntheticEvent<T> {
    nativeEvent: T;
  }
  export interface ImageErrorEventData {
    error: unknown;
  }
  export type ImageSourcePropType = { uri?: string } | number;
  export interface ViewProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onLayout?: (event: LayoutChangeEvent) => void;
    accessibilityRole?: string;
    accessibilityValue?: { min?: number; max?: number; now?: number };
    accessibilityState?: { disabled?: boolean; selected?: boolean; checked?: boolean | 'mixed' };
  }
  export interface TextProps {
    children?: React.ReactNode;
    style?: StyleProp<TextStyle>;
    numberOfLines?: number;
  }
  export interface PressableProps {
    children?: React.ReactNode;
    disabled?: boolean | null;
    hitSlop?: number;
    onPress?: () => void;
    accessibilityLabel?: string;
    accessibilityRole?: string;
    accessibilityState?: { disabled?: boolean; selected?: boolean; checked?: boolean | 'mixed' };
    style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
  }
  export interface TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    placeholderTextColor?: string;
    onFocus?: (event: unknown) => void;
    onBlur?: (event: unknown) => void;
    style?: StyleProp<TextStyle>;
  }
  export interface SwitchProps {
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    disabled?: boolean;
    trackColor?: { false?: string; true?: string };
    thumbColor?: string;
    ios_backgroundColor?: string;
  }
  export interface ModalProps {
    children?: React.ReactNode;
    visible?: boolean;
    transparent?: boolean;
    animationType?: 'none' | 'slide' | 'fade';
    statusBarTranslucent?: boolean;
    onRequestClose?: () => void;
  }
  export interface ActivityIndicatorProps {
    size?: 'small' | 'large' | number;
    color?: string;
    animating?: boolean;
    style?: StyleProp<ViewStyle>;
  }
  export interface ImageProps {
    source: ImageSourcePropType;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    onError?: (event: NativeSyntheticEvent<ImageErrorEventData>) => void;
    style?: StyleProp<ImageStyle>;
  }
  export const View: React.ComponentType<ViewProps>;
  export const Text: React.ComponentType<TextProps>;
  export const Pressable: React.ComponentType<PressableProps>;
  export const TextInput: React.ComponentType<TextInputProps>;
  export const Switch: React.ComponentType<SwitchProps>;
  export const Modal: React.ComponentType<ModalProps>;
  export const ActivityIndicator: React.ComponentType<ActivityIndicatorProps>;
  export const Image: React.ComponentType<ImageProps>;
  export namespace Animated {
    export class Value {
      constructor(value: number);
      setValue(value: number): void;
      interpolate(config: { inputRange: number[]; outputRange: (string | number)[] }): unknown;
    }
    export function timing(
      value: Value,
      config: { toValue: number; duration?: number; useNativeDriver: boolean },
    ): { start: (cb?: () => void) => void };
    export function spring(
      value: Value,
      config: {
        toValue: number;
        useNativeDriver: boolean;
        tension?: number;
        friction?: number;
        bounciness?: number;
      },
    ): { start: (cb?: () => void) => void };
    export const View: React.ComponentType<ViewProps & Record<string, unknown>>;
  }
  export const PanResponder: {
    create(config: {
      onMoveShouldSetPanResponder?: (
        event: unknown,
        gesture: { dx: number; dy: number; vx: number; vy: number },
      ) => boolean;
      onPanResponderMove?: (
        event: unknown,
        gesture: { dx: number; dy: number; vx: number; vy: number },
      ) => void;
      onPanResponderRelease?: (
        event: unknown,
        gesture: { dx: number; dy: number; vx: number; vy: number },
      ) => void;
    }): { panHandlers: Record<string, unknown> };
  };
  export const StyleSheet: {
    hairlineWidth: number;
    absoluteFill: ViewStyle;
    create<T extends Record<string, unknown>>(styles: T): T;
  };
  export function useColorScheme(): 'light' | 'dark' | null | undefined;
}
`,
    );

    await fs.writeFile(
      path.join(tmpDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'ESNext',
          module: 'ESNext',
          moduleResolution: 'bundler',
          jsx: 'react-jsx',
          strict: true,
          skipLibCheck: true,
          noEmit: true,
          typeRoots: [path.join(ROOT_DIR, 'node_modules', '@types')],
          paths: {
            '@/lib/fort-tokens': [
              path.join(ROOT_DIR, 'registry', 'native', 'lib', 'tokens.ts'),
            ],
          },
        },
        include: [
          path.join(tmpDir, 'react-native.d.ts'),
          path.join(ROOT_DIR, 'registry', 'native', '**', '*.ts'),
          path.join(ROOT_DIR, 'registry', 'native', '**', '*.tsx'),
        ],
      }),
    );

    await execFileAsync(tscBin, ['--noEmit', '-p', path.join(tmpDir, 'tsconfig.json')]);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});
