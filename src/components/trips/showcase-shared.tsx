/**
 * Shared types for the trip-page itinerary layout.
 *
 * MapStop / MapDay live here (rather than in a map component) so the map and the
 * page can share them without either importing the other.
 */
export type MapStop = { name: string; slug: string; lat: number; lng: number };
export type MapDay = { n: number; text: string; stopIndex: number; label?: string | null };

export type TripShowcaseProps = {
  images: string[];
  title: string;
  grad: string;
  staticImg?: string;
  stops: MapStop[];
  days: MapDay[];
  labels: {
    eyebrow: string;
    itinerary: string;
    gallery: string;
    map: string;
    day: string;
  };
  /** Short intro copy above the itinerary. */
  introText: string;
};
