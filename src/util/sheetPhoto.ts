import sharp from 'sharp';

// Twice the largest size the workshops page shows (220x180), so photos stay
// sharp on high-DPI screens.
const MAX_WIDTH = 440;
const MAX_HEIGHT = 360;

export class PhotoError extends Error {}

export type ProcessedPhoto = {
  bytes: Buffer;
  ext: 'jpg' | 'png';
  contentType: 'image/jpeg' | 'image/png';
  width: number;
  height: number;
  opaque: boolean;
  blur: string;
};

export function slugify(name: string): string {
  const slug = name
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'facilitator';
}

/**
 * Resize a coordinator's photo for the workshops page. Transparent images
 * (logos) stay PNG with no blur preview, so nothing colored flashes behind
 * them; everything else becomes a JPEG with a tiny blurred preview.
 */
async function convert(input: Buffer): Promise<ProcessedPhoto> {
  const metadata = await sharp(input).metadata();
  if (!metadata.width || !metadata.height) throw new PhotoError("Photo isn't an image");

  const opaque = !metadata.hasAlpha || (await sharp(input).stats()).isOpaque;
  const resized = sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: 'inside', withoutEnlargement: true });

  if (!opaque) {
    const { data, info } = await resized.png().toBuffer({ resolveWithObject: true });
    return { bytes: data, ext: 'png', contentType: 'image/png', width: info.width, height: info.height, opaque, blur: '' };
  }

  const { data, info } = await resized.flatten({ background: '#ffffff' }).jpeg({ quality: 82 }).toBuffer({ resolveWithObject: true });
  const tiny = await sharp(data).resize({ width: 10 }).jpeg({ quality: 50 }).toBuffer();
  return {
    bytes: data,
    ext: 'jpg',
    contentType: 'image/jpeg',
    width: info.width,
    height: info.height,
    opaque,
    blur: `data:image/jpeg;base64,${tiny.toString('base64')}`,
  };
}

export async function processPhoto(input: Buffer): Promise<ProcessedPhoto> {
  try {
    return await convert(input);
  } catch (e) {
    if (e instanceof PhotoError) throw e;
    throw new PhotoError("Photo isn't an image");
  }
}
