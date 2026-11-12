import { createHash, timingSafeEqual } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const SAFE_COMPONENT_NAME = /^[a-z0-9-]+$/;

/**
 * Parse comma- or whitespace-separated Pro license tokens from env vars.
 */
export function parseConfiguredTokens(env = process.env) {
  const tokens = new Set();
  for (const raw of [env.FORT_UI_PRO_TOKENS, env.FORT_UI_PRO_TOKEN]) {
    if (!raw) continue;
    for (const part of String(raw).split(/[\s,]+/)) {
      const trimmed = part.trim();
      if (trimmed) tokens.add(trimmed);
    }
  }
  return Array.from(tokens);
}

function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest();
}

/**
 * Constant-time bearer token check against FORT_UI_PRO_TOKENS / FORT_UI_PRO_TOKEN.
 */
export function verifyProToken(presentedToken, env = process.env) {
  const configuredTokens = parseConfiguredTokens(env);
  if (configuredTokens.length === 0) {
    return { configured: false, valid: false };
  }

  if (typeof presentedToken !== 'string' || !presentedToken.trim()) {
    return { configured: true, valid: false };
  }

  const candidateDigest = sha256(presentedToken.trim());
  let matched = false;
  for (const configured of configuredTokens) {
    const expectedDigest = sha256(configured);
    if (timingSafeEqual(candidateDigest, expectedDigest)) {
      matched = true;
    }
  }

  return { configured: true, valid: matched };
}

/**
 * Extract bearer token from standard Web Headers or Node IncomingHttpHeaders.
 */
export function extractBearerToken(headers) {
  if (!headers) return null;
  const getHeader = (name) => {
    if (typeof headers.get === 'function') {
      return headers.get(name);
    }
    const target = name.toLowerCase();
    for (const key of Object.keys(headers)) {
      if (key.toLowerCase() === target) {
        return headers[key];
      }
    }
    return undefined;
  };

  const auth = getHeader('authorization');
  if (typeof auth === 'string') {
    const match = auth.match(/^Bearer\s+(.+)$/i);
    if (match?.[1]?.trim()) {
      return match[1].trim();
    }
  }

  const custom = getHeader('x-fort-token');
  if (typeof custom === 'string' && custom.trim()) {
    return custom.trim();
  }

  return null;
}

function stripFileContent(item) {
  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    meta: item.meta ?? { tier: 'pro' },
    files: Array.isArray(item.files)
      ? item.files.map((file) => ({
          path: file.path,
          type: file.type,
          target: file.target,
        }))
      : [],
  };
}

/**
 * Load metadata-only Pro catalog without leaking file contents.
 */
export async function getProCatalog(rootDir = process.cwd()) {
  const candidates = [
    path.join(rootDir, 'server', 'r', 'pro', 'registry.json'),
    path.join(rootDir, 'registry.pro.json'),
  ];

  for (const filePath of candidates) {
    try {
      const raw = await fs.readFile(/*turbopackIgnore: true*/ filePath, 'utf8');
      const parsed = JSON.parse(raw);
      return {
        name: parsed.name ?? 'fort-ui-pro',
        homepage: parsed.homepage ?? 'http://localhost:3000',
        items: Array.isArray(parsed.items)
          ? parsed.items.map(stripFileContent)
          : [],
      };
    } catch {
      // Try next fallback candidate
    }
  }

  return { name: 'fort-ui-pro', homepage: 'http://localhost:3000', items: [] };
}

/**
 * Resolve an allowlisted Pro component JSON payload from server/r/pro.
 */
export async function getProComponent(name, rootDir = process.cwd()) {
  if (typeof name !== 'string' || !SAFE_COMPONENT_NAME.test(name)) {
    return null;
  }

  const catalog = await getProCatalog(rootDir);
  const entry = catalog.items.find((item) => item.name === name);
  if (!entry) {
    return null;
  }

  const itemPath = path.join(rootDir, 'server', 'r', 'pro', `${entry.name}.json`);
  try {
    const raw = await fs.readFile(/*turbopackIgnore: true*/ itemPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
