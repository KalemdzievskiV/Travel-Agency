/**
 * Background layers for a card photo.
 *
 * The tonal gradient stays *underneath* the photo rather than being the
 * either/or alternative to it, so an image that fails to load degrades to the
 * brand gradient instead of an empty box. That is not hypothetical: the seeded
 * photography points at picsum.photos, and when that host is down every card
 * carrying it goes blank — on the deployed site first, since a developer's
 * browser still has the images in cache.
 *
 * CSS paints background layers front-to-back, so the photo is listed first.
 */
export function photoLayers(
  image?: string | null,
  grad?: string | null,
): string | undefined {
  if (image && grad) return `url(${image}), ${grad}`;
  if (image) return `url(${image})`;
  return grad || undefined;
}
