import { NextResponse } from 'next/server';
import { getProCatalog } from '@/lib/pro-registry.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Metadata-only Pro catalog endpoint for CLI discovery without exposing source code.
 */
export async function GET() {
  const catalog = await getProCatalog();
  return NextResponse.json(catalog, {
    headers: {
      'Cache-Control': 'public, max-age=60',
    },
  });
}

