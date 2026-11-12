import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { parseArgs } from 'node:util';

const DEFAULT_REGISTRY =
  process.env.FORT_UI_REGISTRY || 'https://fortui.my.id';

const CSS_CANDIDATES = [
  'src/app/globals.css',
  'app/globals.css',
  'app/global.css',
  'src/app/global.css',
  'src/index.css',
  'src/globals.css',
];

const TOKEN_BLOCK = `/* fort-ui:tokens:start */
:root {
  --fort-bg: #f2f2f7;
  --fort-surface: #ffffff;
  --fort-surface-muted: #e5e5ea;
  --fort-surface-pressed: #d1d1d6;
  --fort-label: #111113;
  --fort-label-secondary: #52525b;
  --fort-separator: rgba(60, 60, 67, 0.14);
  --fort-tint: #0066cc;
  --fort-tint-text: #0055b3;
  --fort-tint-soft: rgba(0, 102, 204, 0.12);
  --fort-destructive: #d70015;
  --fort-destructive-text: #c20013;
  --fort-destructive-soft: rgba(215, 0, 21, 0.11);
  --fort-switch-on: #248a3d;
  --fort-switch-off: rgba(120, 120, 128, 0.28);
  --fort-ease: cubic-bezier(0.32, 0.72, 0, 1);
  --font-fort-sans: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}

.dark {
  --fort-bg: #000000;
  --fort-surface: #1c1c1e;
  --fort-surface-muted: #2c2c2e;
  --fort-surface-pressed: #3a3a3c;
  --fort-label: #f5f5f7;
  --fort-label-secondary: #a1a1aa;
  --fort-separator: rgba(255, 255, 255, 0.14);
  --fort-tint: #0a66d6;
  --fort-tint-text: #4da3ff;
  --fort-tint-soft: rgba(77, 163, 255, 0.16);
  --fort-destructive: #d70015;
  --fort-destructive-text: #ff6961;
  --fort-destructive-soft: rgba(255, 105, 97, 0.16);
  --fort-switch-on: #289e47;
  --fort-switch-off: rgba(120, 120, 128, 0.38);
}

.fort-ui {
  font-family: var(--font-fort-sans);
}
/* fort-ui:tokens:end */`;

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJsonIfExists(filePath) {
  if (!(await exists(filePath))) return null;
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

function getAuthFilePath() {
  const baseDir = process.env.FORT_UI_HOME || path.join(os.homedir(), '.fort-ui');
  return path.join(baseDir, 'auth.json');
}

async function resolveProToken(explicitToken) {
  if (explicitToken?.trim()) return explicitToken.trim();
  if (process.env.FORT_UI_PRO_TOKEN?.trim()) {
    return process.env.FORT_UI_PRO_TOKEN.trim();
  }
  const saved = await readJsonIfExists(getAuthFilePath());
  return typeof saved?.token === 'string' && saved.token.trim()
    ? saved.token.trim()
    : null;
}

function maskToken(token) {
  if (token.length <= 8) return '****';
  return `${token.slice(0, 4)}...${token.slice(-4)}`;
}

async function handleAuth(positionalToken, { token: flagToken, clear }) {
  const authPath = getAuthFilePath();

  if (clear) {
    await fs.rm(authPath, { force: true });
    console.log('Removed saved fort-ui Pro token.');
    return;
  }

  const nextToken = (flagToken || positionalToken || '').trim();
  if (!nextToken) {
    const active = await resolveProToken();
    if (active) {
      console.log(`Active fort-ui Pro token: ${maskToken(active)}`);
    } else {
      console.log('No fort-ui Pro token configured. Run "fort-ui auth <token>".');
    }
    return;
  }

  await fs.mkdir(path.dirname(authPath), { recursive: true });
  await fs.writeFile(
    authPath,
    `${JSON.stringify({ token: nextToken }, null, 2)}\n`,
    { encoding: 'utf8', mode: 0o600 },
  );
  console.log(`Saved fort-ui Pro token (${maskToken(nextToken)}) to ${authPath}`);
}

export async function detectProject(cwd) {
  const pkg = (await readJsonIfExists(path.join(cwd, 'package.json'))) || {};
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  const isNative = Boolean(allDeps.expo || allDeps['react-native']);
  const hasSrc = await exists(path.join(cwd, 'src'));

  let cssFile = null;
  for (const candidate of CSS_CANDIDATES) {
    if (await exists(path.join(cwd, candidate))) {
      cssFile = candidate;
      break;
    }
  }

  let packageManager = 'npm';
  if (await exists(path.join(cwd, 'pnpm-lock.yaml'))) packageManager = 'pnpm';
  else if (
    (await exists(path.join(cwd, 'bun.lock'))) ||
    (await exists(path.join(cwd, 'bun.lockb')))
  ) {
    packageManager = 'bun';
  } else if (await exists(path.join(cwd, 'yarn.lock'))) {
    packageManager = 'yarn';
  }

  return {
    platform: isNative ? 'native' : 'web',
    hasSrc,
    cssFile,
    packageManager,
    dependencies: allDeps,
  };
}

function getRegistrySubpath(platform) {
  return platform === 'native' ? 'r/native' : 'r';
}

function isHttpBase(baseOrUrl) {
  return /^https?:\/\//i.test(baseOrUrl);
}

class HttpStatusError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function fetchJson(baseOrUrl, relativePath = '', options = {}) {
  const target = relativePath
    ? `${baseOrUrl.replace(/\/+$/, '')}/${relativePath.replace(/^\/+/, '')}`
    : baseOrUrl;

  if (!isHttpBase(target)) {
    const filePath = target.startsWith('file://')
      ? new URL(target)
      : path.resolve(target);
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  }

  const res = await fetch(target, { headers: options.headers });
  if (!res.ok) {
    let detail = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.error) detail = body.error;
    } catch {
      // Ignore non-JSON error body
    }
    throw new HttpStatusError(res.status, `Failed to fetch ${target} (${detail})`);
  }
  return res.json();
}

async function fetchProCatalogSafe(baseUrl, platform) {
  if (platform !== 'web' || !isHttpBase(baseUrl)) return [];
  try {
    const data = await fetchJson(baseUrl, 'api/r/pro');
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

async function fetchProItem(baseUrl, name, token) {
  if (!isHttpBase(baseUrl)) {
    throw new Error(
      `Pro component "${name}" is protected and cannot be read from a static directory. Point --registry to your fort-ui server URL and pass --token <key>.`,
    );
  }
  if (!token) {
    throw new Error(
      `Pro component "${name}" requires a fort-ui Pro license token. Run "fort-ui auth <token>" or pass "--token <token>".`,
    );
  }
  try {
    return await fetchJson(baseUrl, `api/r/pro/${name}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (error instanceof HttpStatusError && error.status === 401) {
      throw new Error(
        `Unauthorized for Pro component "${name}". Check your --token or run "fort-ui auth <token>".`,
      );
    }
    if (error instanceof HttpStatusError && error.status === 503) {
      throw new Error(
        `Pro registry is not configured on ${baseUrl} (FORT_UI_PRO_TOKENS missing).`,
      );
    }
    throw error;
  }
}

function resolveTargetPath(cwd, rawTarget, hasSrc) {
  const clean = rawTarget.replace(/^\/+/, '');
  if (hasSrc && !clean.startsWith('src/')) {
    return path.join(cwd, 'src', clean);
  }
  return path.join(cwd, clean);
}

async function fetchComponentPayload(baseUrl, platform, name, context) {
  if (context.proNames.has(name)) {
    return fetchProItem(baseUrl, name, context.token);
  }

  const subpath = getRegistrySubpath(platform);
  try {
    return await fetchJson(baseUrl, `${subpath}/${name}.json`);
  } catch (error) {
    const canTryProFallback =
      platform === 'web' &&
      ((error instanceof HttpStatusError && error.status === 404) ||
        error?.code === 'ENOENT');
    if (!canTryProFallback) throw error;

    // Fallback check when an explicit Pro name was requested without loading the catalog
    const remotePro = await fetchProCatalogSafe(baseUrl, platform);
    for (const item of remotePro) context.proNames.add(item.name);
    if (context.proNames.has(name) || isHttpBase(baseUrl)) {
      if (context.proNames.has(name)) {
        return fetchProItem(baseUrl, name, context.token);
      }
      if (!isHttpBase(baseUrl)) {
        throw error;
      }
    }
    throw error;
  }
}

async function resolveItems(baseUrl, platform, names, context, seen = new Set()) {
  const collected = [];
  for (const name of names) {
    if (seen.has(name)) continue;
    seen.add(name);
    const item = await fetchComponentPayload(baseUrl, platform, name, context);
    if (
      Array.isArray(item.registryDependencies) &&
      item.registryDependencies.length > 0
    ) {
      const deps = await resolveItems(
        baseUrl,
        platform,
        item.registryDependencies,
        context,
        seen,
      );
      collected.push(...deps);
    }
    collected.push(item);
  }
  return collected;
}

function installDependencies(cwd, packageManager, deps) {
  if (deps.length === 0) return Promise.resolve();
  const cmdMap = {
    npm: ['install', ...deps],
    pnpm: ['add', ...deps],
    yarn: ['add', ...deps],
    bun: ['add', ...deps],
  };

  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, cmdMap[packageManager] || cmdMap.npm, {
      cwd,
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${packageManager} exited with code ${code}`));
    });
  });
}

async function handleInit({ cwd, registry, css, platform: explicitPlatform }) {
  const project = await detectProject(cwd);
  const platform = explicitPlatform || project.platform;
  const configPath = path.join(cwd, 'fort-ui.json');
  const existingConfig = (await readJsonIfExists(configPath)) || {};

  const config = {
    $schema: 'https://ui.shadcn.com/schema.json',
    platform,
    registry: existingConfig.registry || registry,
    hasSrc: project.hasSrc,
    ...(platform === 'web' ? { css: project.cssFile } : {}),
    aliases: {
      components: '@/components/ui',
      ...(platform === 'native'
        ? { tokens: '@/lib/fort-tokens' }
        : { utils: '@/lib/utils' }),
    },
  };

  await fs.writeFile(
    configPath,
    `${JSON.stringify(config, null, 2)}\n`,
    'utf8',
  );
  console.log(`Created fort-ui.json (platform: ${config.platform})`);

  if (platform === 'native') {
    const tokensItems = await resolveItems(
      config.registry,
      'native',
      ['tokens'],
      { proNames: new Set(), token: null },
    );
    for (const file of tokensItems[0]?.files || []) {
      const destPath = resolveTargetPath(
        cwd,
        file.target || file.path,
        project.hasSrc,
      );
      if (!(await exists(destPath))) {
        await fs.mkdir(path.dirname(destPath), { recursive: true });
        await fs.writeFile(destPath, file.content ?? '', 'utf8');
        console.log(`Created ${path.relative(cwd, destPath)}`);
      }
    }
    return;
  }

  if (css && project.cssFile) {
    const cssPath = path.join(cwd, project.cssFile);
    const currentCss = await fs.readFile(cssPath, 'utf8');
    if (!currentCss.includes('/* fort-ui:tokens:start */')) {
      await fs.writeFile(
        cssPath,
        `${currentCss.trimEnd()}\n\n${TOKEN_BLOCK}\n`,
        'utf8',
      );
      console.log(`Added fort-ui tokens to ${project.cssFile}`);
    } else {
      console.log(`Tokens already present in ${project.cssFile}`);
    }
  } else if (css) {
    console.log('No globals.css found; add the --fort-* CSS tokens manually.');
  }

  const utilsTarget = resolveTargetPath(cwd, 'lib/utils.ts', project.hasSrc);
  if (!(await exists(utilsTarget))) {
    await fs.mkdir(path.dirname(utilsTarget), { recursive: true });
    await fs.writeFile(
      utilsTarget,
      "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}\n",
      'utf8',
    );
    console.log(`Created ${path.relative(cwd, utilsTarget)}`);
  }
}

async function handleAdd(
  names,
  {
    cwd,
    registry,
    overwrite,
    install,
    all,
    platform: explicitPlatform,
    token: explicitToken,
  },
) {
  const config = await readJsonIfExists(path.join(cwd, 'fort-ui.json'));
  const project = await detectProject(cwd);
  const platform = explicitPlatform || config?.platform || project.platform;
  const hasSrc = config?.hasSrc ?? project.hasSrc;
  const registryUrl = registry || config?.registry || DEFAULT_REGISTRY;
  const subpath = getRegistrySubpath(platform);
  const token = await resolveProToken(explicitToken);

  const proItems = await fetchProCatalogSafe(registryUrl, platform);
  const proNames = new Set(proItems.map((item) => item.name));

  let requested = names;
  if (all) {
    const catalog = await fetchJson(registryUrl, `${subpath}/registry.json`);
    const freeNames = (catalog.items || [])
      .filter((item) => item.type !== 'registry:lib')
      .map((item) => item.name);

    if (proItems.length > 0 && token) {
      requested = [...freeNames, ...proItems.map((item) => item.name)];
    } else {
      requested = freeNames;
      if (proItems.length > 0) {
        console.log(
          `Skipped Pro components (${proItems.map((i) => i.name).join(', ')}). Pass --token <key> or run "fort-ui auth <key>" to include them.`,
        );
      }
    }
  }

  if (requested.length === 0) {
    throw new Error(
      'Specify at least one component or --all, e.g. fort-ui add button',
    );
  }

  const items = await resolveItems(registryUrl, platform, requested, {
    proNames,
    token,
  });
  const depsToInstall = new Set();

  for (const item of items) {
    for (const dep of item.dependencies || []) {
      if (!project.dependencies[dep]) {
        depsToInstall.add(dep);
      }
    }

    for (const file of item.files || []) {
      const targetRel = file.target || file.path;
      const destPath = resolveTargetPath(cwd, targetRel, hasSrc);
      const alreadyExists = await exists(destPath);

      if (alreadyExists && !overwrite) {
        console.log(`Skipped ${path.relative(cwd, destPath)} (already exists)`);
        continue;
      }

      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.writeFile(destPath, file.content ?? '', 'utf8');
      console.log(
        `${alreadyExists ? 'Updated' : 'Added'} ${path.relative(cwd, destPath)}`,
      );
    }
  }

  const deps = Array.from(depsToInstall);
  if (deps.length > 0) {
    if (install) {
      console.log(
        `Installing dependencies with ${project.packageManager}: ${deps.join(', ')}`,
      );
      await installDependencies(cwd, project.packageManager, deps);
    } else {
      console.log(
        `Install dependencies manually: ${project.packageManager} install ${deps.join(' ')}`,
      );
    }
  }
}

async function handleList({ cwd, registry, platform: explicitPlatform }) {
  const config = await readJsonIfExists(path.join(cwd, 'fort-ui.json'));
  const project = await detectProject(cwd);
  const platform = explicitPlatform || config?.platform || project.platform;
  const registryUrl = registry || config?.registry || DEFAULT_REGISTRY;
  const subpath = getRegistrySubpath(platform);
  const data = await fetchJson(registryUrl, `${subpath}/registry.json`);
  const proItems = await fetchProCatalogSafe(registryUrl, platform);

  const merged = [...(data.items || [])];
  const seen = new Set(merged.map((item) => item.name));
  for (const item of proItems) {
    if (!seen.has(item.name)) {
      seen.add(item.name);
      merged.push(item);
    }
  }

  console.log(`Components (${platform}) from ${registryUrl}:\n`);
  for (const item of merged) {
    if (item.type === 'registry:lib') continue;
    const tierTag = item.meta?.tier === 'pro' ? '[Pro] ' : '';
    console.log(`  ${item.name.padEnd(20)} ${tierTag}${item.description || ''}`);
  }
}

function printHelp() {
  console.log(`fort-ui CLI

Usage:
  fort-ui init [options]                Initialize fort-ui config, tokens, and utils
  fort-ui add <items...> [options]      Add component files to your project
  fort-ui list [options]                List available components from the registry
  fort-ui auth [token] [options]        Save, inspect, or clear your Pro license token

Options:
  --all                Add all available free components (and Pro if authenticated)
  --platform <name>    Target platform: web or native (auto-detected by default)
  --cwd <path>         Target project directory (default: current directory)
  --registry <url>     Registry base URL (default: ${DEFAULT_REGISTRY})
  --token <key>        Pro license token for authenticated /api/r/pro downloads
  --clear              Clear the saved Pro license token (with fort-ui auth)
  --overwrite          Overwrite existing component files
  --no-install         Skip installing npm dependencies
  --no-css             Skip injecting CSS tokens during init
  -h, --help           Show this help message`);
}

export async function runCli(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    allowNegative: true,
    options: {
      all: { type: 'boolean', default: false },
      platform: { type: 'string' },
      cwd: { type: 'string' },
      registry: { type: 'string' },
      token: { type: 'string' },
      clear: { type: 'boolean', default: false },
      overwrite: { type: 'boolean', default: false },
      install: { type: 'boolean', default: true },
      css: { type: 'boolean', default: true },
      yes: { type: 'boolean', short: 'y', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });

  if (values.help || positionals.length === 0) {
    printHelp();
    return;
  }

  if (values.platform && values.platform !== 'web' && values.platform !== 'native') {
    throw new Error(`Invalid platform "${values.platform}". Use "web" or "native".`);
  }

  const [command, ...rest] = positionals;
  const cwd = path.resolve(values.cwd || process.cwd());

  if (command === 'auth') {
    await handleAuth(rest[0], { token: values.token, clear: values.clear });
    return;
  }

  if (command === 'init') {
    await handleInit({
      cwd,
      registry: values.registry || DEFAULT_REGISTRY,
      css: values.css,
      platform: values.platform,
    });
    return;
  }

  if (command === 'add') {
    await handleAdd(rest, {
      cwd,
      registry: values.registry,
      overwrite: values.overwrite,
      install: values.install,
      all: values.all,
      platform: values.platform,
      token: values.token,
    });
    return;
  }

  if (command === 'list') {
    await handleList({
      cwd,
      registry: values.registry,
      platform: values.platform,
    });
    return;
  }

  throw new Error(
    `Unknown command "${command}". Run fort-ui --help for usage.`,
  );
}
