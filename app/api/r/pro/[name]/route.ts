import { NextResponse } from 'next/server';
import {
  extractBearerToken,
  getProComponent,
  verifyProToken,
} from '@/lib/pro-registry.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Authenticated Pro component payload endpoint returning compiled JSON only for valid license tokens.
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const token = extractBearerToken(request.headers);
  const check = verifyProToken(token, process.env);

  if (!check.configured) {
    return NextResponse.json(
      {
        error:
          'Pro registry is not configured on this server. Set FORT_UI_PRO_TOKENS in your environment.',
      },
      {
        status: 503,
        headers: { 'Cache-Control': 'private, no-store' },
      },
    );
  }

  if (!check.valid) {
    return NextResponse.json(
      {
        error:
          'Valid fort-ui Pro token required. Pass --token <key> or set FORT_UI_PRO_TOKEN.',
      },
      {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Bearer realm="fort-ui-pro"',
          'Cache-Control': 'private, no-store',
        },
      },
    );
  }

  const { name } = await context.params;
  const item = await getProComponent(name);
  if (!item) {
    return NextResponse.json(
      { error: `Pro component "${name}" not found.` },
      {
        status: 404,
        headers: { 'Cache-Control': 'private, no-store' },
      },
    );
  }

  return NextResponse.json(item, {
    headers: {
      'Cache-Control': 'private, no-store',
    },
  });
}

