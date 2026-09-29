// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import sharp from 'sharp';

// vi.mock is hoisted above imports, so the mock fn must be hoisted too.
const { put } = vi.hoisted(() => ({
  put: vi.fn(async (path: string) => ({
    url: `https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/${path.replace('.', '-Ab12.')}`,
  })),
}));
vi.mock('@vercel/blob', () => ({ put }));

import { POST } from '@/app/api/sheet-photo/route';

const request = (body: Buffer, headers: Record<string, string> = {}) =>
  new Request('http://localhost/api/sheet-photo', { method: 'POST', body, headers });

describe('POST /api/sheet-photo', () => {
  beforeEach(() => vi.stubEnv('SHEETS_API_KEY', 'k'));
  afterEach(() => {
    vi.unstubAllEnvs();
    put.mockClear();
  });

  it('is disabled without a key', async () => {
    vi.stubEnv('SHEETS_API_KEY', '');
    expect((await POST(request(Buffer.from('x'), { 'X-Sheets-Key': 'k' }))).status).toBe(503);
  });

  it('rejects a wrong or missing key', async () => {
    expect((await POST(request(Buffer.from('x'), { 'X-Sheets-Key': 'nope' }))).status).toBe(403);
    expect((await POST(request(Buffer.from('x')))).status).toBe(403);
    expect(put).not.toHaveBeenCalled();
  });

  it('rejects a non-image', async () => {
    const res = await POST(request(Buffer.from('hello'), { 'X-Sheets-Key': 'k' }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ message: "Photo isn't an image" });
  });

  it('uploads a processed photo and returns its size', async () => {
    const jpeg = await sharp({ create: { width: 880, height: 880, channels: 3, background: '#335' } }).jpeg().toBuffer();
    const res = await POST(request(jpeg, { 'X-Sheets-Key': 'k', 'X-Photo-Name': 'Sierra Sikora' }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ width: 360, height: 360, opaque: true });
    expect(body.url).toContain('public.blob.vercel-storage.com/facilitators/sierra-sikora');
    const [path, , options] = put.mock.calls[0] as unknown as [string, Buffer, Record<string, unknown>];
    expect(path).toBe('facilitators/sierra-sikora.jpg');
    expect(options).toMatchObject({ access: 'public', addRandomSuffix: true, contentType: 'image/jpeg' });
  });

  it('returns 502 when the storage upload fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    put.mockRejectedValueOnce(new Error('blob down'));
    const jpeg = await sharp({ create: { width: 100, height: 100, channels: 3, background: '#335' } }).jpeg().toBuffer();
    const res = await POST(request(jpeg, { 'X-Sheets-Key': 'k', 'X-Photo-Name': 'A' }));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ message: 'Upload to storage failed' });
    errorSpy.mockRestore();
  });
});
