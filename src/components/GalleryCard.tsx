import type { GalleryEntry } from '../data/gallery'

type GalleryCardProps = {
  entry: GalleryEntry
  onOpen: (slug: string) => void
}

export function GalleryCard({ entry, onOpen }: GalleryCardProps) {
  return <button className="gallery-card" type="button" onClick={() => onOpen(entry.slug)} aria-label={`Open ${entry.title}`}>
    <span className="thumbnail-art" aria-hidden="true">
      <img src={entry.thumbnailSrc} alt="" />
    </span>
    <span className="gallery-card__title">{entry.title}</span>
    <span className="gallery-card__cta">Click to explore</span>
  </button>
}
