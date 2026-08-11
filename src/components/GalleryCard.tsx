import type { GalleryEntry } from '../data/gallery'
import { GalleryThumbnail } from '../visualizations/GalleryThumbnail'

type GalleryCardProps = {
  entry: GalleryEntry
  onOpen: (slug: string) => void
}

export function GalleryCard({ entry, onOpen }: GalleryCardProps) {
  return <button className="gallery-card" type="button" onClick={() => onOpen(entry.slug)} aria-label={`Open ${entry.title}`}>
    <GalleryThumbnail kind={entry.thumbnail} title={entry.title} />
    <span className="gallery-card__title">{entry.title}</span>
    <span className="gallery-card__cta">Click to explore</span>
  </button>
}
