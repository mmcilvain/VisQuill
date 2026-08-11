import { useState } from 'react'
import { findGalleryEntry } from '../data/gallery'
import { GalleryThumbnail } from '../visualizations/GalleryThumbnail'
import { DemographicProfile } from '../visualizations/DemographicProfile'

type VisualizationPageProps = {
  slug: string
  onBack: () => void
}

const details = {
  description: 'Every country has a demographic fingerprint: a distinct combination of how its population is distributed by age, how mortality varies across the lifespan, and where childbearing is concentrated. This visualization brings those three dimensions together in a single interactive profile, letting you explore and compare countries across the world.',
  metrics: [
    ['Population', 'The upper left arm shows the population pyramid: the share of females and males in each five-year age group relative to the total population.'],
    ['Mortality', 'The upper right arm shows the mortality profile: the percentage of deaths occurring in each five-year age group relative to the total number of deaths.'],
    ['Fertility', 'The lower arm shows the fertility distribution based on the proportional age-specific fertility rate.'],
  ],
}

export function VisualizationPage({ slug, onBack }: VisualizationPageProps) {
  const [showDetails, setShowDetails] = useState(false)
  const entry = findGalleryEntry(slug)
  const isDemographics = entry?.slug === 'world-demographics'

  if (!entry) return <main className="not-found"><h1>Visualization not found</h1><button type="button" onClick={onBack}>← Back to Gallery</button></main>

  function scrollToDetails() {
    document.getElementById('visualization-details')?.scrollIntoView({ behavior: 'smooth' })
  }

  return <main className="gallery-item-page">
    <section className="embed-wrapper" aria-label={`${entry.title} visualization`}>
      {isDemographics ? <DemographicProfile /> : <div className="pending-visualization"><div className="pending-visualization__art"><GalleryThumbnail kind={entry.thumbnail} title={entry.title} /></div><div><p className="pending-visualization__eyebrow">VISUALIZATION RECREATION</p><h1>{entry.title}</h1><p>{entry.summary}</p><p className="pending-visualization__status">This module is next in the incremental parity queue. Its gallery navigation and detail shell are ready.</p></div></div>}
      <div className="mobile-visual-message"><div className="mobile-visual-message__inner"><h2>Best viewed on a larger screen</h2><p>This interactive visualization is optimized for a desktop or tablet viewport. Its technical details remain available below.</p><button type="button" onClick={scrollToDetails}>View details</button></div></div>
      <div className="overlay-buttons">
        <button type="button" className={`overlay-btn ${showDetails ? 'active' : ''}`} onClick={() => setShowDetails((current) => !current)}>{showDetails ? 'Hide details' : 'About this visual'}</button>
      </div>
      {showDetails && <aside className="visualization-panel"><h2>{entry.title}</h2><p>{isDemographics ? details.description : entry.summary}</p><button type="button" onClick={scrollToDetails}>Read technical notes</button></aside>}
      <div className="scroll-down-wrapper"><button type="button" className="scroll-btn" onClick={scrollToDetails} aria-label="Scroll to details">⌄</button></div>
    </section>
    <section id="visualization-details" className="details-section">
      <div className="details-inner">
        <div className="details-header"><div className="details-thumb"><GalleryThumbnail kind={entry.thumbnail} title={entry.title} /></div><h1 className="details-title">{entry.title}</h1></div>
        {isDemographics ? <>
          <p>{details.description}</p>
          <h2>Metrics</h2>
          <ul className="details-list">{details.metrics.map(([label, copy]) => <li key={label}><strong>{label}</strong> — {copy}</li>)}</ul>
          <p>A timeline slider lets you step through snapshots at ten-year intervals from 1953 to 2023. Hover marks to reveal values, or select one of the three country profiles from the map.</p>
          <h2>Data source</h2><p>Demographic figures in this independent first milestone are illustrative values used to reproduce the interaction model. The reference site credits United Nations World Population Prospects 2024.</p>
          <h2>Built for this recreation</h2><p>The implementation uses responsive SVG, local reactive state, accessible range controls, pointer hover handling, and CSS transitions. No VisQuill GDK or original visualization source is included.</p>
        </> : <><p>{entry.summary}</p><h2>Current recreation status</h2><p>The route template is implemented. The full SVG interaction module will be added after source comparison for this specific gallery entry.</p></>}
        <button className="back-to-gallery" type="button" onClick={onBack}>← Back to Gallery</button>
      </div>
    </section>
  </main>
}
