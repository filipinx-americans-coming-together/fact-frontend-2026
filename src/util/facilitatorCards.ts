import { FACILITATORS_BY_WORKSHOP_TITLE, type FacilitatorInfo } from '@/util/facilitatorPhotos';

/** A facilitator as /registration/workshops/all/ returns it (the `fields` object). */
export type ApiFacilitator = {
  department_name: string;
  facilitators: string[] | null;
  image_url: string;
  bio: string;
  position: string | null;
  photo_width: number | null;
  photo_height: number | null;
  photo_blur: string;
  photo_opaque: boolean;
};

export type FacilitatorCard = {
  name: string;
  photo: string | null;
  width: number;
  height: number;
  blurDataURL?: string;
  opaque: boolean;
  bio: string;
};

const DEFAULT_BOX = 180;
const BLOB_PREFIX = 'https://d8t8hw5atqxm3ugh.public.blob.vercel-storage.com/';
const DRIVE_UC_PREFIX = 'https://drive.google.com/uc';

// Leftovers from the 2026 spreadsheet import that must never show on the page.
function usablePhoto(url: string | null | undefined): url is string {
  if (!url) return false;
  // Only hosts next/image is configured for (next.config.mjs remotePatterns).
  // Drive view/open links and placeholders fall through to false here.
  return url.startsWith(BLOB_PREFIX) || url.startsWith(DRIVE_UC_PREFIX);
}

function usableText(value: string | null | undefined): value is string {
  return !!value && value.trim() !== '' && value.trim().toLowerCase() !== 'nan';
}

function fromHardcoded(info: FacilitatorInfo): FacilitatorCard {
  return {
    name: info.name,
    photo: info.photo,
    width: info.width,
    height: info.height,
    blurDataURL: info.blurDataURL || undefined,
    opaque: !info.flatPhoto,
    bio: info.bio,
  };
}

/**
 * The facilitator cards for one workshop. The backend is the source of
 * truth; the hardcoded entry (keyed by exact title) fills any field the
 * backend doesn't have yet. Remove the fallback once the one-time import
 * has been verified on the live page.
 */
export function facilitatorCards(title: string, api: ApiFacilitator[]): FacilitatorCard[] {
  const hardcoded = FACILITATORS_BY_WORKSHOP_TITLE[title.trim()];
  if (api.length === 0) return hardcoded ? [fromHardcoded(hardcoded)] : [];

  return api.map((f) => {
    const fallback =
      hardcoded && (api.length === 1 || hardcoded.name.toLowerCase() === f.department_name.toLowerCase())
        ? hardcoded
        : undefined;

    if (usablePhoto(f.image_url)) {
      return {
        name: f.department_name,
        photo: f.image_url,
        width: f.photo_width ?? DEFAULT_BOX,
        height: f.photo_height ?? DEFAULT_BOX,
        blurDataURL: f.photo_blur || undefined,
        opaque: f.photo_opaque,
        bio: usableText(f.bio) ? f.bio : fallback?.bio ?? '',
      };
    }
    return {
      name: f.department_name,
      photo: fallback?.photo ?? null,
      width: fallback?.width ?? DEFAULT_BOX,
      height: fallback?.height ?? DEFAULT_BOX,
      blurDataURL: fallback?.blurDataURL || undefined,
      opaque: fallback ? !fallback.flatPhoto : true,
      bio: usableText(f.bio) ? f.bio : fallback?.bio ?? '',
    };
  });
}
