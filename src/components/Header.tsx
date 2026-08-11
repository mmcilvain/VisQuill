import { useState } from 'react'

type HeaderProps = {
  currentPath: string
  onNavigate: (path: string) => void
}

type NavLink = { label: string; path: string; children?: NavLink[] }

const links: NavLink[] = [
  { label: 'VisQuill', path: '/visquill' },
  { label: 'GDK', path: '/products' },
  { label: 'Custom Work', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Developers', path: '/developers', children: [
    { label: 'Overview', path: '/developers' },
    { label: 'Lab', path: '/developers/demos' },
    { label: 'Guide', path: '/developers/guide' },
    { label: 'Docs', path: '/developers/docs' },
  ] },
  { label: 'About', path: '/about' },
]

export function Header({ currentPath, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [developerOpen, setDeveloperOpen] = useState(false)

  function navigate(path: string) {
    setMenuOpen(false)
    onNavigate(path)
  }

  return <header className="topbar">
    <button className="brand" type="button" onClick={() => navigate('/gallery')} aria-label="Return to the gallery">
      <img src="/assets/quill-mark-compact.png" alt="" className="brand-mark" />
      <span className="brand-label">VisQuill</span>
    </button>
    <nav className="desktop-menu" aria-label="Primary">
      <div className="nav-links">
        {links.map((link) => <div className="nav-item" key={link.label} onMouseEnter={() => link.children && setDeveloperOpen(true)} onMouseLeave={() => link.children && setDeveloperOpen(false)}>
          <button type="button" className={`nav-link ${currentPath === link.path ? 'active' : ''}`} onClick={() => navigate(link.path)}>{link.label}</button>
          {link.children && <div className={`sub-links ${developerOpen ? 'visible' : ''}`} aria-hidden={!developerOpen}>{link.children.map((child) => <button type="button" className="sub-link" tabIndex={developerOpen ? 0 : -1} onClick={() => navigate(child.path)} key={child.label}>{child.label}</button>)}</div>}
        </div>)}
      </div>
    </nav>
    <button type="button" className="burger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><span /><span /><span /></button>
    {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site navigation">
      <button type="button" className="close-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
      <img src="/assets/quill-mark-compact.png" alt="" className="mobile-menu__mark" />
      <nav className="mobile-menu-list" aria-label="Mobile primary navigation">
        {links.map((link) => <div className="mobile-link-group" key={link.label}>
          <button className="mobile-link" type="button" onClick={() => navigate(link.path)}>{link.label}</button>
          {link.children && <div className="mobile-submenu">{link.children.map((child) => <button type="button" className="mobile-sublink" onClick={() => navigate(child.path)} key={child.label}>{child.label}</button>)}</div>}
        </div>)}
      </nav>
    </div>}
  </header>
}
