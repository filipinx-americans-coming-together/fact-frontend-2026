// @vitest-environment node
import { describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { PhotoError, processPhoto, slugify } from '@/util/sheetPhoto';

const image = (width: number, height: number, alpha = 1, format: 'jpeg' | 'png' = 'png') =>
  sharp({ create: { width, height, channels: 4, background: { r: 200, g: 50, b: 50, alpha } } })
    [format]()
    .toBuffer();

describe('processPhoto', () => {
  it('shrinks a portrait photo to fit 440x360 and keeps its shape', async () => {
    const out = await processPhoto(await image(300, 800, 1, 'jpeg'));
    expect(out.height).toBe(360);
    expect(out.width).toBe(135);
    expect(out.opaque).toBe(true);
    expect(out.ext).toBe('jpg');
    expect(out.blur.startsWith('data:image/jpeg;base64,')).toBe(true);
  });

  it('keeps transparency as PNG with no blur', async () => {
    const out = await processPhoto(await image(200, 100, 0.4));
    expect(out.opaque).toBe(false);
    expect(out.ext).toBe('png');
    expect(out.contentType).toBe('image/png');
    expect(out.blur).toBe('');
    expect(await sharp(out.bytes).metadata()).toMatchObject({ hasAlpha: true, width: 200, height: 100 });
  });

  it('treats a PNG with a fully opaque alpha channel as opaque', async () => {
    const out = await processPhoto(await image(50, 50, 1));
    expect(out.opaque).toBe(true);
    expect(out.ext).toBe('jpg');
  });

  it('never enlarges small images', async () => {
    const out = await processPhoto(await image(100, 50, 1, 'jpeg'));
    expect([out.width, out.height]).toEqual([100, 50]);
  });

  it('applies EXIF orientation', async () => {
    const jpeg = await sharp({ create: { width: 300, height: 100, channels: 3, background: '#335' } })
      .jpeg()
      .withMetadata({ orientation: 6 })
      .toBuffer();
    const out = await processPhoto(jpeg);
    expect([out.width, out.height]).toEqual([100, 300]);
  });

  it('rejects a truncated image with a valid header', async () => {
    const full = await sharp({ create: { width: 800, height: 800, channels: 3, background: '#335' } })
      .png()
      .toBuffer();
    await expect(processPhoto(full.subarray(0, Math.floor(full.length / 2)))).rejects.toBeInstanceOf(PhotoError);
  });

  it('rejects bytes that are not an image', async () => {
    await expect(processPhoto(Buffer.from('%PDF-1.4 not an image'))).rejects.toBeInstanceOf(PhotoError);
  });
});

describe('slugify', () => {
  it('makes a safe Blob file name', () => {
    expect(slugify('Dr. Bernard Ellorin PhD')).toBe('dr-bernard-ellorin-phd');
    expect(slugify('FIA’Liwan & Friends')).toBe('fia-liwan-friends');
    expect(slugify('')).toBe('facilitator');
  });
});
