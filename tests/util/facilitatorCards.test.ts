import { describe, expect, it } from 'vitest';
import { facilitatorCards, type ApiFacilitator } from '@/util/facilitatorCards';

const api = (over: Partial<ApiFacilitator>): ApiFacilitator => ({
  department_name: 'Org',
  facilitators: [],
  image_url: '',
  bio: '',
  position: null,
  photo_width: null,
  photo_height: null,
  photo_blur: '',
  photo_opaque: true,
  ...over,
});

// A title that exists in src/util/facilitatorPhotos.ts with flatPhoto: true.
const MAFA_TITLE = 'PSA 101: Introduction to the MAFAsphere and Beyond';

describe('facilitatorCards', () => {
  it('uses the hardcoded card when the API has no facilitator', () => {
    const [card] = facilitatorCards(MAFA_TITLE, []);
    expect(card.name).toBe('MAFA');
    expect(card.photo).toContain('public.blob.vercel-storage.com');
    expect(card.opaque).toBe(false);
  });

  it('prefers complete API data', () => {
    const [card] = facilitatorCards(MAFA_TITLE, [
      api({
        department_name: 'MAFA',
        image_url: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/facilitators/mafa-x.png',
        bio: 'New bio',
        photo_width: 200,
        photo_height: 120,
        photo_opaque: true,
        photo_blur: 'data:image/jpeg;base64,BBB',
      }),
    ]);
    expect(card).toMatchObject({
      name: 'MAFA',
      photo: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/facilitators/mafa-x.png',
      width: 200,
      height: 120,
      bio: 'New bio',
      opaque: true,
      blurDataURL: 'data:image/jpeg;base64,BBB',
    });
  });

  it('falls back per field for placeholders, Drive view links and nan', () => {
    const [card] = facilitatorCards(MAFA_TITLE, [
      api({ department_name: 'MAFA', image_url: 'https://drive.google.com/file/d/abc/view', bio: 'nan' }),
    ]);
    expect(card.photo).toContain('public.blob.vercel-storage.com');
    expect(card.bio.length).toBeGreaterThan(10);
    const [placeholder] = facilitatorCards('Unknown title', [
      api({ image_url: 'https://placehold.co/400x400?text=TBD', bio: 'Real bio' }),
    ]);
    expect(placeholder.photo).toBeNull();
    expect(placeholder.bio).toBe('Real bio');
  });

  it('rejects https photos on hosts next/image does not allow', () => {
    const [card] = facilitatorCards('Unknown title', [
      api({ image_url: 'https://example.com/photo.png', bio: 'Real bio' }),
    ]);
    expect(card.photo).toBeNull();
    const [fallback] = facilitatorCards(MAFA_TITLE, [
      api({ department_name: 'MAFA', image_url: 'https://i.ytimg.com/vi/x/hq.jpg' }),
    ]);
    expect(fallback.photo).toContain('public.blob.vercel-storage.com');
  });

  it('accepts Drive uc photo links', () => {
    const [card] = facilitatorCards('Unknown title', [
      api({ image_url: 'https://drive.google.com/uc?export=view&id=abc' }),
    ]);
    expect(card.photo).toBe('https://drive.google.com/uc?export=view&id=abc');
  });

  it('returns one card per facilitator on a panel', () => {
    const cards = facilitatorCards('Panel', [api({ department_name: 'A' }), api({ department_name: 'B' })]);
    expect(cards.map((c) => c.name)).toEqual(['A', 'B']);
  });

  it('uses a 180x180 box when no size is known', () => {
    const [card] = facilitatorCards('Unknown', [api({ image_url: 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/x.png' })]);
    expect([card.width, card.height]).toEqual([180, 180]);
    expect(card.blurDataURL).toBeUndefined();
  });

  it('returns nothing for a workshop with no facilitator anywhere', () => {
    expect(facilitatorCards('Unknown', [])).toEqual([]);
  });
});
