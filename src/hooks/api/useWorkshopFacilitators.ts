import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/util/constants';
import type { ApiFacilitator } from '@/util/facilitatorCards';

type AllWorkshopsResponse = Record<string, { facilitators?: { fields: ApiFacilitator }[] }>;

const EMPTY = new Map<number, ApiFacilitator[]>();

async function fetchWorkshopFacilitators(): Promise<Map<number, ApiFacilitator[]>> {
  const response = await fetch(`${API_URL}/registration/workshops/all/`);
  if (!response.ok) throw new Error('Could not load facilitators');
  const json: AllWorkshopsResponse = await response.json();
  return new Map(
    Object.entries(json).map(([id, workshop]) => [
      Number(id),
      (workshop?.facilitators ?? []).map((f) => f.fields),
    ])
  );
}

/**
 * Facilitators per workshop id from /registration/workshops/all/. Any
 * failure returns an empty map, so the page falls back to the hardcoded cards.
 */
export function useWorkshopFacilitators(): Map<number, ApiFacilitator[]> {
  const { data } = useQuery({
    queryKey: ['workshop-facilitators'],
    queryFn: fetchWorkshopFacilitators,
    retry: 0,
  });
  return data ?? EMPTY;
}
