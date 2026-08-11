import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { GalleryPage } from '../gallery/GalleryPage'
import { VisualizationPage } from '../gallery/VisualizationPage'

function currentLocation(): string {
  return window.location.pathname.replace(/\/$/, '') || '/gallery'
}

export function App() {
  const [path, setPath] = useState(currentLocation)

  useEffect(() => {
    const onPopState = () => setPath(currentLocation())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function navigate(nextPath: string) {
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const visualSlug = path.match(/^\/gallery\/([^/]+)$/)?.[1]

  return <div className="app-shell">
    <Header currentPath={path} onNavigate={navigate} />
    {visualSlug ? <VisualizationPage slug={visualSlug} onBack={() => navigate('/gallery')} /> : <GalleryPage onOpen={(slug) => navigate(`/gallery/${slug}`)} />}
    <Footer />
  </div>
}
