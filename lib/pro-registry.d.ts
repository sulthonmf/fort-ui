export interface ProTokenCheck {
  configured: boolean;
  valid: boolean;
}

export interface ProRegistryFileMeta {
  path: string;
  type: string;
  target?: string;
  content?: string;
}

export interface ProRegistryItemMeta {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  meta?: Record<string, unknown>;
  files: ProRegistryFileMeta[];
}

export interface ProCatalog {
  name: string;
  homepage: string;
  items: ProRegistryItemMeta[];
}

export function parseConfiguredTokens(env?: Record<string, string | undefined>): string[];
export function verifyProToken(
  presentedToken: string | null | undefined,
  env?: Record<string, string | undefined>,
): ProTokenCheck;
export function extractBearerToken(
  headers: Headers | Record<string, string | string[] | undefined> | null | undefined,
): string | null;
export function getProCatalog(rootDir?: string): Promise<ProCatalog>;
export function getProComponent(
  name: string,
  rootDir?: string,
): Promise<ProRegistryItemMeta | null>;

