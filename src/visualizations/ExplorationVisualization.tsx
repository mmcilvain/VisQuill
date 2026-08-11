import { useMemo, useRef, useState } from 'react'
import type { GalleryEntry } from '../data/gallery'

type Point = { x: number; y: number; value: number; label: string }

const palettes: Record<string, readonly string[]> = {
  coast: ['#103f53', '#217b91', '#f0ca70', '#ec8561'],
  collision: ['#f7efe0', '#edbd52', '#df6c48', '#812d3b'],
  rain: ['#e6f1f4', '#69aec2', '#28719a', '#153e65'],
  sun: ['#132e47', '#f1ae47', '#ffd989', '#fff5d7'],
  radial: ['#263f58', '#4e85a4', '#d2b06b', '#d95d55'],
  city: ['#ede7dd', '#8faab1', '#2f5668', '#e78553'],
  terrain: ['#e7edf0', '#8eb0a2', '#3c706c', '#213b4c'],
  election: ['#f4f0e7', '#9bb8cc', '#467a99', '#b74648'],
  transport: ['#f5f1e7', '#8fb1bd', '#3a6e83', '#d8754b'],
  volcano: ['#111b28', '#314d61', '#e66d4a', '#ffd47d'],
  contour: ['#eaf1e8', '#87ad94', '#477569', '#163f4d'],
  profile: ['#edf1e9', '#abc29a', '#547c61', '#214f54'],
}

const descriptors: Record<string, { eyebrow: string; action: string; unit: string }> = {
  coast: { eyebrow: 'COASTAL EXPLORER', action: 'Select a shoreline segment', unit: 'coastal index' },
  collision: { eyebrow: 'ROUTE EXPLORER', action: 'Select a collision cluster', unit: 'incidents / km' },
  rain: { eyebrow: 'RAINFALL EXPLORER', action: 'Select a rainfall cell', unit: 'mm rainfall' },
  sun: { eyebrow: 'SOLAR EXPLORER', action: 'Select a time band', unit: 'minutes of daylight' },
  radial: { eyebrow: 'PATTERN EXPLORER', action: 'Select a radial segment', unit: 'relative measure' },
  city: { eyebrow: 'CITY EXPLORER', action: 'Select a city block', unit: 'urban score' },
  terrain: { eyebrow: 'LANDSCAPE EXPLORER', action: 'Select a terrain point', unit: 'elevation index' },
  election: { eyebrow: 'ELECTION EXPLORER', action: 'Select a district', unit: 'vote share' },
  transport: { eyebrow: 'MOBILITY EXPLORER', action: 'Select a commuting corridor', unit: 'commuters' },
  volcano: { eyebrow: 'VOLCANO EXPLORER', action: 'Select an observation', unit: 'activity score' },
  contour: { eyebrow: 'CONTOUR EXPLORER', action: 'Select a region', unit: 'index score' },
  profile: { eyebrow: 'PROFILE EXPLORER', action: 'Select a route position', unit: 'profile value' },
}

function pointsFor(entry: GalleryEntry): Point[] {
  const seed = entry.slug.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return Array.from({ length: 18 }, (_, index) => {
    const wave = Math.sin((index + seed / 41) * 1.31)
    return {
      x: 48 + index * 48 + ((seed + index * 17) % 22),
      y: 140 + (wave + 1) * 92 + ((seed + index * 23) % 37),
      value: 28 + Math.round((wave + 1) * 34) + ((seed + index * 11) % 18),
      label: `${entry.title} ${String(index + 1).padStart(2, '0')}`,
    }
  })
}

function formatValue(value: number, unit: string) {
  return new Intl.NumberFormat('en-US').format(value * 12) + ` ${unit}`
}

export function ExplorationVisualization({ entry }: { entry: GalleryEntry }) {
  const points = useMemo(() => pointsFor(entry), [entry])
  const palette = palettes[entry.thumbnail] ?? palettes.contour
  const descriptor = descriptors[entry.thumbnail] ?? descriptors.contour
  const [active, setActive] = useState(7)
  const [period, setPeriod] = useState(5)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState<number | null>(null)
  const dragOrigin = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null)
  const selected = points[hovered ?? active]
  const isRadial = entry.thumbnail === 'radial' || entry.thumbnail === 'sun'
  const isProfile = entry.thumbnail === 'profile' || entry.thumbnail === 'terrain'

  function move(event: React.PointerEvent<SVGSVGElement>) {
    if (!dragOrigin.current) return
    setOffset({ x: dragOrigin.current.offsetX + event.clientX - dragOrigin.current.x, y: dragOrigin.current.offsetY + event.clientY - dragOrigin.current.y })
  }

  return <div className="exploration-visualization" style={{ '--viz-0': palette[0], '--viz-1': palette[1], '--viz-2': palette[2], '--viz-3': palette[3] } as React.CSSProperties}>
    <div className="exploration-toolbar">
      <div><span className="exploration-eyebrow">{descriptor.eyebrow}</span><strong>{entry.title}</strong></div>
      <div className="exploration-actions">
        <button type="button" onClick={() => setZoom((value) => Math.max(.8, value - .15))} aria-label="Zoom out">−</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={() => setZoom((value) => Math.min(1.8, value + .15))} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); setActive(7) }}>Reset</button>
      </div>
    </div>
    <div className="exploration-stage">
      <svg className="exploration-canvas" viewBox="0 0 960 530" role="img" aria-label={`${entry.title}. ${descriptor.action}. Drag to pan and use zoom controls.`}
        onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); dragOrigin.current = { x: event.clientX, y: event.clientY, offsetX: offset.x, offsetY: offset.y } }}
        onPointerMove={move} onPointerUp={() => { dragOrigin.current = null }} onPointerCancel={() => { dragOrigin.current = null }}>
        <defs>
          <linearGradient id={`background-${entry.slug}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={palette[0]} /><stop offset="1" stopColor={palette[1]} /></linearGradient>
          <radialGradient id={`glow-${entry.slug}`}><stop stopColor={palette[3]} stopOpacity=".86"/><stop offset="1" stopColor={palette[3]} stopOpacity="0"/></radialGradient>
          <filter id={`shadow-${entry.slug}`}><feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#132436" floodOpacity=".24" /></filter>
        </defs>
        <rect width="960" height="530" fill={`url(#background-${entry.slug})`} />
        <g opacity=".15" stroke="#fff">{Array.from({ length: 12 }, (_, index) => <path key={index} d={`M ${index * 94 - 30} 0 L ${index * 94 + 210} 530`} />)}</g>
        <g transform={`translate(${offset.x} ${offset.y}) scale(${zoom})`} style={{ transformOrigin: '480px 265px' }}>
          {isRadial && <g transform="translate(480 265)">{Array.from({ length: 28 }, (_, index) => {
            const angle = index * (360 / 28); const chosen = index === active % 28
            return <path key={index} d={`M 0 0 L ${Math.cos((angle - 5) * Math.PI / 180) * (selected.value + 115)} ${Math.sin((angle - 5) * Math.PI / 180) * (selected.value + 115)} A ${selected.value + 115} ${selected.value + 115} 0 0 1 ${Math.cos((angle + 5) * Math.PI / 180) * (selected.value + 115)} ${Math.sin((angle + 5) * Math.PI / 180) * (selected.value + 115)} Z`} fill={chosen ? palette[3] : index % 3 === 0 ? palette[2] : palette[0]} opacity={chosen ? 1 : .72} onPointerEnter={() => setHovered(index % points.length)} onPointerLeave={() => setHovered(null)} onClick={() => setActive(index % points.length)} />
          })}<circle r="108" fill={palette[0]} opacity=".5"/><circle r="58" fill={`url(#glow-${entry.slug})`} /></g>}
          {isProfile && <g>{Array.from({ length: 5 }, (_, index) => <path key={index} d={`M 0 ${400 - index * 62} C 135 ${270 - index * 14}, 235 ${450 - index * 23}, 375 ${305 - index * 17} S 650 ${380 - index * 12}, 960 ${135 + index * 26}`} fill="none" stroke={index === 2 ? palette[3] : palette[2]} strokeOpacity={index === 2 ? .9 : .34} strokeWidth={index === 2 ? 8 : 2} />)}</g>}
          {!isRadial && <g>{points.map((point, index) => <g key={point.label} transform={`translate(${point.x} ${point.y})`} onPointerEnter={() => setHovered(index)} onPointerLeave={() => setHovered(null)} onClick={() => setActive(index)} className="exploration-mark"><circle r={point.value + 7} fill={palette[3]} opacity={index === active ? .3 : .12} /><circle r={index === active ? 13 : 8} fill={index === active ? palette[3] : palette[2]} filter={index === active ? `url(#shadow-${entry.slug})` : undefined} /><circle r="3" fill="#fff" /></g>)}</g>}
          {!isRadial && <path d={`M ${points.map((point) => `${point.x} ${point.y}`).join(' L ')}`} fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2" strokeDasharray="5 7" />}
        </g>
      </svg>
      <aside className="exploration-inspector" aria-live="polite"><span>Selected</span><strong>{selected.label}</strong><b>{formatValue(selected.value + period * 3, descriptor.unit)}</b><p>{descriptor.action}. Use the canvas to inspect a mark, drag to pan, or change the time slice.</p></aside>
    </div>
    <div className="exploration-timeline"><button type="button" onClick={() => setPeriod((value) => Math.max(0, value - 1))} disabled={period === 0}>‹</button><input aria-label="Visualization time period" type="range" min="0" max="10" value={period} onChange={(event) => setPeriod(Number(event.target.value))} /><span>{1990 + period * 3}</span><button type="button" onClick={() => setPeriod((value) => Math.min(10, value + 1))} disabled={period === 10}>›</button></div>
  </div>
}
