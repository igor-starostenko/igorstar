// app/api/entries/[type]/route.js — list + create
//   GET  /api/entries/:type        list entries (delivery client)
//   POST /api/entries/:type        create (payload in body; two-step via confirm)
import { NextResponse } from 'next/server';
import { listEntries, preflight, confirmWrite } from '@/lib/content';
import { CONTENT_TYPES } from '@/lib/models';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function badType(type) {
  if (!CONTENT_TYPES.includes(type)) {
    return NextResponse.json(
      { ok: false, error: `Unknown content type: ${type}` },
      { status: 400 }
    );
  }
  return null;
}

export async function GET(_req, { params }) {
  const p = await params;
  const err = badType(p.type);
  if (err) return err;
  try {
    const url = new URL(_req.url);
    const order = url.searchParams.get('order') || '';
    const limit = Number(url.searchParams.get('limit') || 50);
    return NextResponse.json(await listEntries(p.type, { order, limit }));
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  const p = await params;
  const err = badType(p.type);
  if (err) return err;
  try {
    const body = await req.json();
    const { confirm, ...rest } = body;
    const payload = rest.payload || rest;
    if (confirm !== true) {
      // Preflight only: validate without writing.
      return NextResponse.json(await preflight(p.type, null, payload));
    }
    const created = await confirmWrite(p.type, null, payload);
    return NextResponse.json({ ok: true, body: created }, { status: 201 });
  } catch (e) {
    const status = /token|access|unauthorized/i.test(e.message) ? 401 : 500;
    return NextResponse.json({ ok: false, error: e.message }, { status });
  }
}
