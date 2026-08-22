// app/api/assets/route.js — POST /api/assets
// Uploads an image (multipart, field "file"), processes it with sharp
// (per-target sizes from lib/images.js), creates + publishes a Contentful
// asset, and returns the asset link to embed in an entry's fields.
//
// Body: multipart/form-data
//   file        -> the image (required)
//   target      -> 'gallery' | 'feed' | 'post' (required; drives sizing)
//   confirm     -> 'true' to actually upload; default is preflight
//
// Preflight (confirm != true): processes locally, returns the processed
// metadata WITHOUT uploading to Contentful.
import { NextResponse } from 'next/server';
import { createAsset, assetLink } from '@/lib/content';
import { processUpload } from '@/lib/images';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    const target = String(form.get('target') || '');
    const confirm = form.get('confirm') === 'true';
    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { ok: false, error: 'Missing file field' },
        { status: 400 }
      );
    }
    if (!['gallery', 'feed', 'post'].includes(target)) {
      return NextResponse.json(
        { ok: false, error: "target must be 'gallery', 'feed', or 'post'" },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name || `upload-${Date.now()}`;

    const processed = await processUpload(buffer, filename, target);

    if (!confirm) {
      // Preflight: processed locally, nothing written to Contentful.
      return NextResponse.json({
        ok: true,
        preflight: true,
        main: {
          filename: processed.filename,
          contentType: processed.contentType,
          width: processed.width,
          height: processed.height,
          bytes: processed.file.length,
        },
        thumb: processed.thumb && {
          filename: processed.thumb.filename,
          width: processed.thumb.width,
          height: processed.thumb.height,
          bytes: processed.thumb.file.length,
        },
      });
    }

    // Create + publish the main asset.
    const asset = await createAsset(
      processed.filename,
      processed.file,
      processed.contentType,
      processed.filename
    );
    const link = assetLink(asset.assetId);
    // Store the thumbnail alongside so the client can pick it up for
    // post-thumbnail / gallery uses (also linked into entry fields).
    let thumbAsset = null;
    if (processed.thumb) {
      thumbAsset = await createAsset(
        processed.thumb.filename,
        processed.thumb.file,
        processed.thumb.contentType,
        processed.thumb.filename
      );
    }
    return NextResponse.json(
      {
        ok: true,
        asset: {
          id: asset.assetId,
          url: asset.url,
          width: asset.width,
          height: asset.height,
          size: asset.size,
          link,
        },
        thumbAsset: thumbAsset
          ? {
              id: thumbAsset.assetId,
              url: thumbAsset.url,
              width: thumbAsset.width,
              height: thumbAsset.height,
              link: assetLink(thumbAsset.assetId),
            }
          : null,
      },
      { status: 201 }
    );
  } catch (e) {
    const status = /token|access|unauthorized/i.test(e.message) ? 401 : 500;
    return NextResponse.json({ ok: false, error: e.message }, { status });
  }
}
