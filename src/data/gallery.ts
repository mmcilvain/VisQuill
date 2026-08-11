export type ThumbnailKind =
  | 'demographics'
  | 'coast'
  | 'collision'
  | 'rain'
  | 'sun'
  | 'radial'
  | 'city'
  | 'terrain'
  | 'election'
  | 'transport'
  | 'volcano'
  | 'contour'
  | 'profile'

export type GalleryEntry = {
  slug: string
  title: string
  thumbnail: ThumbnailKind
  thumbnailSrc: string
  summary: string
}

export const galleryEntries: GalleryEntry[] = [
  { slug: 'world-demographics', title: 'Demographic Profiles', thumbnail: 'demographics', thumbnailSrc: '/assets/reference/thumbnail-world-demographics.jpg', summary: 'Population, mortality, and fertility profiles across the world.' },
  { slug: 'ireland-atlantic-coast', title: "Ireland's Atlantic Coast", thumbnail: 'coast', thumbnailSrc: '/assets/reference/thumbnail-ireland-atlantic-coast.jpg', summary: 'An explorable cartographic story of the Atlantic coast.' },
  { slug: 'uk-a1', title: 'A1 Collision Density', thumbnail: 'collision', thumbnailSrc: '/assets/reference/thumbnail-uk-a1.jpg', summary: 'A route-level view of collision density.' },
  { slug: 'rainfall', title: 'Where the Rain Fell', thumbnail: 'rain', thumbnailSrc: '/assets/reference/thumbnail-rainfall.jpg', summary: 'A time-aware rainfall display.' },
  { slug: 'sun-map', title: 'Sunrise and Sunset', thumbnail: 'sun', thumbnailSrc: '/assets/reference/thumbnail-sunmap.jpg', summary: 'Light, time, and place around a radial map.' },
  { slug: 'nyc-311', title: 'Calling 311 in New York City', thumbnail: 'radial', thumbnailSrc: '/assets/reference/thumbnail-nyc-311.jpg', summary: 'A circular look at 311 calls in New York City.' },
  { slug: 'london-price-of-space', title: 'The Price of Space in London', thumbnail: 'radial', thumbnailSrc: '/assets/reference/thumbnail-london-housing.jpg', summary: 'A radial comparison of London housing values.' },
  { slug: 'city-lens', title: 'City Lens', thumbnail: 'city', thumbnailSrc: '/assets/reference/thumbnail-city-lens.jpg', summary: 'Layered urban detail through a geographic lens.' },
  { slug: 'permafrost-alaska', title: 'Permafrost in Alaska', thumbnail: 'terrain', thumbnailSrc: '/assets/reference/thumbnail-permafrost.jpg', summary: 'Permafrost conditions across Alaska.' },
  { slug: 'bw-elections', title: 'State Elections BaWü', thumbnail: 'election', thumbnailSrc: '/assets/reference/thumbnail-bw-elections.jpg', summary: 'Election patterns in Baden-Württemberg.' },
  { slug: 'us-transport', title: 'U.S. Commuting to Work', thumbnail: 'transport', thumbnailSrc: '/assets/reference/thumbnail-us-transportation.jpg', summary: 'National commuting patterns in the United States.' },
  { slug: 'volcanoes', title: 'Volcanoes at Night', thumbnail: 'volcano', thumbnailSrc: '/assets/reference/thumbnail-volcanoes-at-night.jpg', summary: 'Volcanic activity mapped against a dark globe.' },
  { slug: 'nordics-climate', title: 'Climate Change', thumbnail: 'radial', thumbnailSrc: '/assets/reference/thumbnail-nordics-climate-change.jpg', summary: 'A circular climate change display.' },
  { slug: 'election-lens', title: 'Electoral Districts', thumbnail: 'election', thumbnailSrc: '/assets/reference/thumbnail-election-lens.jpg', summary: 'District-level electoral exploration.' },
  { slug: 'contour-map-europe-democracy', title: 'Democracy Indices', thumbnail: 'contour', thumbnailSrc: '/assets/reference/thumbnail-european-indices.jpg', summary: 'European democracy indices as contours.' },
  { slug: 'bubble-map-german-elections', title: 'German Elections', thumbnail: 'transport', thumbnailSrc: '/assets/reference/thumbnail-bm-german-election.jpg', summary: 'German election results through a bubble map.' },
  { slug: 'profile-kungsleden', title: 'Kungsleden', thumbnail: 'profile', thumbnailSrc: '/assets/reference/thumbnail-sweden-kungsleden.jpg', summary: 'An elevation profile of the Kungsleden trail.' },
  { slug: 'profile-rhine-cycling', title: 'Along the Rhine', thumbnail: 'profile', thumbnailSrc: '/assets/reference/thumbnail-rhine-cycling.jpg', summary: 'A cycling profile along the Rhine.' },
  { slug: 'profile-rhine-water-levels', title: 'Water Levels', thumbnail: 'profile', thumbnailSrc: '/assets/reference/thumbnail-rhine-waterlevel.jpg', summary: 'Water levels across a long river profile.' },
  { slug: 'profile-german-coast', title: 'German Coast', thumbnail: 'profile', thumbnailSrc: '/assets/reference/thumbnail-german-coast.jpg', summary: 'An explorative coastal profile.' },
  { slug: 'contour-map-germany-elections', title: 'German Elections', thumbnail: 'contour', thumbnailSrc: '/assets/reference/thumbnail-german-elections.jpg', summary: 'Election results as a territorial contour map.' },
  { slug: 'contour-map-sweden-elections', title: 'Swedish Elections', thumbnail: 'contour', thumbnailSrc: '/assets/reference/thumbnail-swedish-elections.jpg', summary: 'Sweden election results in a contour display.' },
  { slug: 'contour-map-germany-landuse', title: 'German Landuse', thumbnail: 'contour', thumbnailSrc: '/assets/reference/thumbnail-german-landuse.jpg', summary: 'Land-use patterns revealed by contours.' },
]

export function findGalleryEntry(slug: string): GalleryEntry | undefined {
  return galleryEntries.find((entry) => entry.slug === slug)
}
