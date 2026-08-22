// app/api/entries/[type]/[id]/route.js — get / update / delete one entry.
// GET    -> full body + resolved asset URLs + snapshot diff (if a local
//            snapshot exists for this entry).
// PUT    -> two-step: { confirm:false } preflights; { confirm:true, version }
//            performs the full-body update.
// DELETE -> two-step: { confirm:false } preflights; { confirm:true } deletes.
import { NextResponse } from 'next/server';
import {
  getEntryDelivery,
  deleteEntry,
  preflight,
  confirmWrite,
  diffFromSnapshot,
  resolveAssetUrls,
} from '@/lib/content';
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
    // READ via delivery client (works with the delivery-only token; flat fields).
    const data = await getEntryDelivery(p.type, p.id);
    const withUrls = await resolveAssetUrls(data.fields);
    const diff = diffFromSnapshot(p.type, p.id, data.fields);
    return NextResponse.json({
      ok: true,
      sys: data.sys,
      fields: withUrls,
      rawFields: data.fields,
      snapshot: diff, // null when no local snapshot exists
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 404 });
  }
}

export async function PUT(req, { params }) {
  const p = await params;
  const err = badType(p.type);
  if (err) return err;
  try {
    const body = await req.json();
    const { confirm, version, ...rest } = body;
    const payload = rest.payload || rest;
    if (confirm !== true) {
      return NextResponse.json(await preflight(p.type, p.id, payload));
    }
    const updated = await confirmWrite(p.type, p.id, payload, version);
    return NextResponse.json({ ok: true, body: updated });
  } catch (e) {
    const status = /token|access|unauthorized/i.test(e.message) ? 401 : 500;
    return NextResponse.json({ ok: false, error: e.message }, { status });
  }
}

export async function DELETE(req, { params }) {
  const p = await params;
  const err = badType(p.type);
  if (err) return err;
  try {
    const body = await req.json().catch(() => ({}));
    if (body.confirm !== true) {
      return NextResponse.json({
        ok: true,
        confirm: 'Confirm deletion by resending with { confirm: true }',
      });
    }
    await deleteEntry(p.type, p.id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const status = /token|access|unauthorized/i.test(e.message) ? 401 : 500;
    return NextResponse.json({ ok: false, error: e.message }, { status });
  }
}
