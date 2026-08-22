// app/api/content-types/route.js — GET /api/content-types
// Lists the four portal-managed content types (delivery client, read-only).
import { NextResponse } from 'next/server';
import { deliveryClient } from '@/lib/contentful';
import { CONTENT_TYPES } from '@/lib/models';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = deliveryClient();
    const types = await client.getContentTypes();
    const wanted = new Set(CONTENT_TYPES);
    return NextResponse.json(
      types.items
        .filter((t) => wanted.has(t.sys.id))
        .map((t) => ({
          id: t.sys.id,
          name: t.sys.name,
          description: t.sys.description || '',
          fields: t.fields.map((f) => ({
            name: f.id,
            type: f.type,
            required: Boolean(f.required),
          })),
        }))
    );
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
