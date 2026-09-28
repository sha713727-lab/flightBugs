import { getSignedBackend } from "@/lib/backend-request";
import type {
  DestinationDetail,
  DestinationNavItem,
  DestinationSummary,
} from "@/types/destinations";

export class DestinationFetchError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "DestinationFetchError";
    this.status = status;
  }
}

export async function fetchDestinationNav(): Promise<
  ReadonlyArray<DestinationNavItem>
> {
  const result = await getSignedBackend<{
    destinations: ReadonlyArray<DestinationNavItem>;
  }>("/destinations/nav");

  if (!result.ok) {
    if (result.status === 401 || result.status === 503 || result.status === 429) {
      return [];
    }
    throw new DestinationFetchError(result.message, result.status);
  }

  return result.data.destinations;
}

export async function fetchPublishedDestinations(): Promise<
  ReadonlyArray<DestinationSummary>
> {
  const result = await getSignedBackend<{
    destinations: ReadonlyArray<DestinationSummary>;
  }>("/destinations/list");

  if (!result.ok) {
    throw new DestinationFetchError(result.message, result.status);
  }

  return result.data.destinations;
}

export async function fetchDestinationBySlug(
  slug: string,
): Promise<DestinationDetail | null> {
  const result = await getSignedBackend<{
    destination: DestinationDetail;
  }>(`/destinations/details?slug=${encodeURIComponent(slug)}`);

  if (!result.ok) {
    if (result.status === 404) {
      return null;
    }
    throw new DestinationFetchError(result.message, result.status);
  }

  return result.data.destination;
}

export async function loadDestinationPublicData(): Promise<{
  readonly destinations: ReadonlyArray<DestinationSummary>;
  readonly destinationNav: ReadonlyArray<DestinationNavItem>;
}> {
  const [destinations, destinationNav] = await Promise.all([
    fetchPublishedDestinations(),
    fetchDestinationNav(),
  ]);
  return { destinations, destinationNav };
}
