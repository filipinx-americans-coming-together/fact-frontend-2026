import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { PhotoError, processPhoto, slugify } from '@/util/sheetPhoto';

// sharp needs Node, not the Edge runtime.
export const runtime = 'nodejs';

function keyMatches(provided: string, expected: string) {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Photo upload for the workshops Google Sheet's Apps Script: resizes the
 * image and stores it in Vercel Blob. Same X-Sheets-Key as the backend's
 * sheet endpoint; disabled when SHEETS_API_KEY is unset.
 */
export async function POST(request: Request) {
  const key = process.env.SHEETS_API_KEY;
  if (!key) return NextResponse.json({ message: 'Photo upload is disabled' }, { status: 503 });
  if (!keyMatches(request.headers.get('x-sheets-key') ?? '', key)) {
    return NextResponse.json({ message: 'Invalid key' }, { status: 403 });
  }

  const input = Buffer.from(await request.arrayBuffer());
  if (input.length === 0) return NextResponse.json({ message: 'No photo sent' }, { status: 400 });

  let photo;
  try {
    photo = await processPhoto(input);
  } catch (e) {
    if (e instanceof PhotoError) return NextResponse.json({ message: e.message }, { status: 400 });
    throw e;
  }

  const name = slugify(request.headers.get('x-photo-name') ?? '');
  // The random suffix gives every upload a new URL, so no cache serves an old photo.
  let blob;
  try {
    blob = await put(`facilitators/${name}.${photo.ext}`, photo.bytes, {
      access: 'public',
      addRandomSuffix: true,
      contentType: photo.contentType,
    });
  } catch (e) {
    console.error('sheet-photo: Blob upload failed', e);
    return NextResponse.json({ message: 'Upload to storage failed' }, { status: 502 });
  }

  return NextResponse.json({
    url: blob.url,
    width: photo.width,
    height: photo.height,
    opaque: photo.opaque,
    blur: photo.blur,
  });
}
