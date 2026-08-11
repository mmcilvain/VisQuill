import { useMemo, useState } from 'react'
import { arcPath, clamp } from '../utils/geometry'

type Country = {
  id: 'sweden' | 'japan' | 'nigeria'
  name: string
  shortName: string
  color: string
  location: [number, number]
  population: number
  pyramid: number[]
  mortality: number[]
  fertility: number[]
}

const years = [1953, 1963, 1973, 1983, 1993, 2003, 2013, 2023]

const countries: Country[] = [
  {
    id: 'sweden', name: 'Sweden', shortName: 'Sweden', color: '#485eaf', location: [477, 103], population: 10.5,
    pyramid: [0.43, 0.49, 0.55, 0.64, 0.71, 0.76, 0.7, 0.61, 0.53, 0.43, 0.31, 0.21],
    mortality: [0.05, 0.04, 0.05, 0.07, 0.09, 0.13, 0.19, 0.3, 0.47, 0.66, 0.84, 0.97],
    fertility: [0.04, 0.1, 0.2, 0.27, 0.23, 0.12, 0.04],
  },
  {
    id: 'japan', name: 'Japan', shortName: 'Japan', color: '#b15672', location: [668, 213], population: 124.5,
    pyramid: [0.35, 0.4, 0.46, 0.51, 0.62, 0.75, 0.82, 0.79, 0.72, 0.63, 0.51, 0.38],
    mortality: [0.03, 0.03, 0.04, 0.06, 0.08, 0.12, 0.18, 0.31, 0.5, 0.72, 0.91, 1],
    fertility: [0.03, 0.1, 0.23, 0.3, 0.22, 0.09, 0.03],
  },
  {
    id: 'nigeria', name: 'Nigeria', shortName: 'Nigeria', color: '#5d9979', location: [415, 298], population: 223.8,
    pyramid: [1, 0.93, 0.81, 0.69, 0.56, 0.44, 0.34, 0.26, 0.18, 0.13, 0.09, 0.05],
    mortality: [0.09, 0.08, 0.08, 0.09, 0.12, 0.16, 0.22, 0.3, 0.42, 0.58, 0.76, 0.93],
    fertility: [0.05, 0.13, 0.25, 0.29, 0.2, 0.07, 0.01],
  },
]

type Tooltip = { label: string; value: string; x: number; y: number } | null

export function DemographicProfile() {
  const [countryId, setCountryId] = useState<Country['id']>('sweden')
  const [yearIndex, setYearIndex] = useState(7)
  const [tooltip, setTooltip] = useState<Tooltip>(null)
  const country = countries.find((entry) => entry.id === countryId) ?? countries[0]
  const year = years[yearIndex]
  const ageScale = useMemo(() => 0.9 + (yearIndex / (years.length - 1)) * 0.1, [yearIndex])

  function updateYear(nextValue: number) {
    setYearIndex(clamp(Math.round(nextValue), 0, years.length - 1))
  }

  return (
    <section className="demographic-visualization" aria-label="Interactive demographic profiles visualization">
      <div className="visualization-toolbar">
        <div className="visualization-toolbar__brand">Demographic Profiles</div>
        <div className="visualization-toolbar__countries" aria-label="Country selection">{countries.map((entry) => <button type="button" key={entry.id} className={entry.id === country.id ? 'is-active' : ''} onClick={() => setCountryId(entry.id)}>{entry.name}</button>)}</div>
        <div className="visualization-toolbar__hint">Select a country or move the timeline</div>
      </div>
      <div className="visualization-layout">
        <svg className="demographic-map" viewBox="0 0 760 470" preserveAspectRatio="none" role="img" aria-label={`Simplified map with demographic profile for ${country.name}`}>
          <rect width="760" height="470" fill="#dce9ee" />
          <path d="M0 8C95-10 128 55 182 68s67 64 39 112-82 13-102 71 43 52 0 119S29 411 0 397z" fill="#e6e5d2" />
          <path d="M199 19c73 1 80 62 133 60s45 48 23 70-85 20-67 73 68 30 75 69-54 49-48 101 34 50 12 78H170c-11-64 10-77-12-120s22-76 3-122 29-67 38-109z" fill="#e6e5d2" />
          <path d="M523 29c89-25 191-18 237 24v336c-58 1-80-53-128-69s-32-69-85-78 10-66-28-99 34-78 4-114z" fill="#e6e5d2" />
          <g fill="none" stroke="#bdc8bf" strokeWidth="1" opacity=".85">
            <path d="M13 117c95-42 138 14 214-11s118-75 204-33 154 11 288-34" />
            <path d="M19 190c95-29 144 35 221 9s142-95 213-40 129 46 276-19" />
            <path d="M6 267c111-43 157 23 239-7s121-44 201 6 147 42 304-28" />
            <path d="M16 348c116-18 171 3 260-20s113-24 184 28 171 15 283-30" />
            <path d="M95 6c-23 127 46 184 3 323M220 3c-11 96 36 183-5 365M358 3c26 124-32 253 3 413M520 4c-12 118 27 219-6 382M646 3c-13 136 33 251-2 432" />
          </g>
          <text x="24" y="32" className="map-note">WORLD POPULATION PROFILES · {year}</text>
          {countries.map((entry) => <g key={entry.id} transform={`translate(${entry.location[0]} ${entry.location[1]})`} role="button" tabIndex={0} aria-label={`Select ${entry.name}`} onClick={() => setCountryId(entry.id)} onPointerDown={() => setCountryId(entry.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setCountryId(entry.id) }} onMouseEnter={() => setTooltip({ label: entry.name, value: `${entry.population.toFixed(1)}m population`, x: entry.location[0] + 15, y: entry.location[1] - 24 })} onMouseLeave={() => setTooltip(null)} className="map-country-marker">
            <circle r={entry.id === country.id ? 11 : 8} fill="#fff" stroke={entry.color} strokeWidth={entry.id === country.id ? 4 : 2} />
            <circle r="3" fill={entry.color} />
            <text x="14" y="4" fill="#304459" fontSize="11" fontWeight="600">{entry.shortName}</text>
          </g>)}
          <g transform="translate(555 292)"><rect width="179" height="148" rx="9" fill="#fff" opacity=".95" /><text x="15" y="24" className="profile-card__eyebrow">SELECTED COUNTRY</text><text x="15" y="51" className="profile-card__title">{country.name}</text><text x="15" y="73" className="profile-card__value">{country.population.toFixed(1)} million</text><line x1="15" x2="164" y1="88" y2="88" stroke="#d4dce1" /><text x="15" y="111" className="profile-card__copy">Population snapshot</text><text x="15" y="131" className="profile-card__copy">for {year}</text></g>
          {tooltip && <g transform={`translate(${tooltip.x} ${tooltip.y})`} className="map-tooltip"><rect width="146" height="46" rx="5" fill="#213547" opacity=".92" /><text x="10" y="18" fill="#fff" fontSize="11" fontWeight="700">{tooltip.label}</text><text x="10" y="34" fill="#c9d5df" fontSize="10">{tooltip.value}</text></g>}
        </svg>
        <svg className="demographic-profile" viewBox="0 0 510 470" preserveAspectRatio="none" role="img" aria-label={`${country.name} age, mortality, and fertility profile`}>
          <rect width="510" height="470" fill="#fcfcfa" />
          <g transform="translate(255 231)">
            <circle r="58" fill="#fff" stroke="#d8dde0" strokeWidth="1.5" />
            <circle r="17" fill={country.color} opacity=".94" />
            <text y="4" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">{year}</text>
            <path d={arcPath(0, 0, 115, 202, 338)} fill="none" stroke="#edf0f2" strokeWidth="1" />
            <path d={arcPath(0, 0, 115, 22, 158)} fill="none" stroke="#edf0f2" strokeWidth="1" />
            <path d={arcPath(0, 0, 115, 82, 278)} fill="none" stroke="#edf0f2" strokeWidth="1" />
            <text x="-175" y="-159" className="chart-zone-label">POPULATION</text>
            <text x="89" y="-159" className="chart-zone-label">MORTALITY</text>
            <text x="-31" y="188" className="chart-zone-label">FERTILITY</text>
            {country.pyramid.map((value, index) => {
              const y = -122 + index * 16
              const width = value * 68 * ageScale
              return <g key={`pyramid-${index}`} onMouseEnter={() => setTooltip({ label: `${80 - index * 5}–${84 - index * 5} years`, value: `${Math.round(value * 10.2)}% population share`, x: 48, y: 39 })} onMouseLeave={() => setTooltip(null)} className="chart-bar">
                <rect x={-135 - width} y={y} width={width} height="11" rx="2" fill="#659bc4" /><rect x="135" y={y} width={width * .96} height="11" rx="2" fill="#c97092" />
              </g>
            })}
            {country.mortality.map((value, index) => {
              const x = 92 + index * 10
              const y = -126 + (1 - value) * 110
              return <g key={`mortality-${index}`} onMouseEnter={() => setTooltip({ label: `${80 - index * 5}–${84 - index * 5} years`, value: `${Math.round(value * 100)}% relative mortality`, x: 296, y: 40 })} onMouseLeave={() => setTooltip(null)} className="chart-bar"><line x1={x} y1="-16" x2={x} y2={y} stroke="#8e63b6" strokeWidth="7" strokeLinecap="round" /></g>
            })}
            <path d={`M ${country.fertility.map((value, index) => `${-64 + index * 21} ${89 + (1 - value) * 70}`).join(' L ')}`} fill="none" stroke="#d18c43" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {country.fertility.map((value, index) => <circle key={`fertility-${index}`} cx={-64 + index * 21} cy={89 + (1 - value) * 70} r="5" fill="#f4c37d" stroke="#b77231" strokeWidth="1.5" className="chart-bar" onMouseEnter={() => setTooltip({ label: `Age ${15 + index * 5}–${19 + index * 5}`, value: `${Math.round(value * 100)}% fertility contribution`, x: 184, y: 406 })} onMouseLeave={() => setTooltip(null)} />)}
            <text x="-190" y="149" className="chart-axis-label">female</text><text x="154" y="149" className="chart-axis-label">male</text>
          </g>
          {tooltip && <g transform={`translate(${tooltip.x} ${tooltip.y})`} className="profile-tooltip"><rect width="164" height="44" rx="5" fill="#213547" opacity=".95" /><text x="10" y="17" fill="#fff" fontSize="11" fontWeight="700">{tooltip.label}</text><text x="10" y="33" fill="#c9d5df" fontSize="10">{tooltip.value}</text></g>}
        </svg>
      </div>
      <div className="visualization-timeline" aria-label="Timeline controls">
        <button type="button" className="timeline-step" onClick={() => updateYear(yearIndex - 1)} disabled={yearIndex === 0} aria-label="Previous time period">‹</button>
        <div className="timeline-track"><input type="range" min="0" max={years.length - 1} step="1" value={yearIndex} onChange={(event) => updateYear(Number(event.target.value))} aria-label="Year" /><div className="timeline-years" aria-hidden="true">{years.map((item, index) => <span className={index === yearIndex ? 'is-active' : ''} key={item}>{item}</span>)}</div></div>
        <button type="button" className="timeline-step" onClick={() => updateYear(yearIndex + 1)} disabled={yearIndex === years.length - 1} aria-label="Next time period">›</button>
      </div>
      <a className="made-with" href="https://visquill.com/" target="_blank" rel="noreferrer">Inspired by the VisQuill Gallery</a>
    </section>
  )
}
