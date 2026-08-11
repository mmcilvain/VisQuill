import { GalleryCard } from '../components/GalleryCard'
import { galleryEntries } from '../data/gallery'

type GalleryPageProps = { onOpen: (slug: string) => void }

export function GalleryPage({ onOpen }: GalleryPageProps) {
  return <main className="gallery-page">
    <section className="gallery-content" aria-labelledby="gallery-title">
      <h1 id="gallery-title">Visualization Gallery</h1>
      <div className="gallery-grid">{galleryEntries.map((entry) => <GalleryCard entry={entry} onOpen={onOpen} key={entry.slug} />)}</div>
    </section>
  </main>
}
