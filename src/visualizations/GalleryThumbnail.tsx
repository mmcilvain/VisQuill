import type { ThumbnailKind } from '../data/gallery'

type GalleryThumbnailProps = {
  kind: ThumbnailKind
  title: string
}

const spokeAngles = Array.from({ length: 12 }, (_, index) => index * 30)
const contours = [
  'M16 130C31 103 40 101 53 88S76 78 81 59 103 51 137 63 139 87s-18 27-32 42-35 23-56 15-56-14z',
  'M21 121c17-24 27-20 36-37s23-15 29-35c22-7 41 8 42 31s-21 21-34 35-26 25-50 17-53-11z',
  'M30 114c13-19 30-15 35-31 12-5 27 2 32 17s-14 21-24 29-25 15-40 5-3-12z',
]

export function GalleryThumbnail({ kind, title }: GalleryThumbnailProps) {
  return (
    <svg className={`thumbnail-art thumbnail-art--${kind}`} viewBox="0 0 150 195" role="img" aria-label={`${title} independent visualization preview`}>
      <defs>
        <linearGradient id="mapWater" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#dce8fb" />
          <stop offset="1" stopColor="#f7f5ee" />
        </linearGradient>
        <linearGradient id="darkMap" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#17263c" />
          <stop offset="1" stopColor="#4b4b69" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodOpacity="0.22" />
        </filter>
      </defs>
      {kind === 'demographics' && <DemographicPreview />}
      {kind === 'coast' && <CoastPreview />}
      {kind === 'collision' && <CollisionPreview />}
      {kind === 'rain' && <RainPreview />}
      {kind === 'sun' && <SunPreview />}
      {kind === 'radial' && <RadialPreview />}
      {kind === 'city' && <CityPreview />}
      {kind === 'terrain' && <TerrainPreview />}
      {kind === 'election' && <ElectionPreview />}
      {kind === 'transport' && <TransportPreview />}
      {kind === 'volcano' && <VolcanoPreview />}
      {kind === 'contour' && <ContourPreview />}
      {kind === 'profile' && <ProfilePreview />}
    </svg>
  )
}

function DemographicPreview() {
  return <>
    <rect width="150" height="195" fill="url(#mapWater)" />
    <path d="M3 28C22 17 31 30 40 44s17 4 24 19 22 9 27 29-14 26-25 27-17 17-31 18-20-15-32-23z" fill="#d9e6d3" />
    <path d="M89 22c20-12 44-9 58 9v98c-19 3-29-16-37-29s-21-8-21-31 12-23 0-47z" fill="#eef0dd" />
    <text x="8" y="15" fontSize="5" fill="#31405d">Demographic Profiles</text>
    {[0, 1, 2, 3, 4].map((row) => <g key={row} transform={`translate(34 ${47 + row * 11})`}>
      <rect x={-3 - row * 2} width={20 + row * 3} height="6" rx="1" fill="#7664b7" />
      <rect x="2" y="7" width={17 + row * 2} height="5" rx="1" fill="#b65a9d" />
    </g>)}
    <circle cx="78" cy="96" r="22" fill="#fff" stroke="#52638a" strokeWidth="1.5" filter="url(#softShadow)" />
    <path d="M62 97c12-8 20-8 32 0M62 103c11 7 21 7 32 0" fill="none" stroke="#c7a86e" strokeWidth="2" />
    <circle cx="78" cy="100" r="4" fill="#304e86" />
    <path d="M75 132c19-3 27 3 32 20M72 134c-20-2-28 5-31 18" fill="none" stroke="#9450a7" strokeWidth="5" strokeLinecap="round" />
    <text x="8" y="181" fontSize="5" fill="#3f4a61">1953 — 2023</text>
  </>
}

function CoastPreview() {
  return <>
    <rect width="150" height="195" fill="#aebbef" />
    <path d="M82 0c-2 17-23 27-19 43 3 13-19 22-12 42 8 24-13 38-3 59 7 14 20 11 30 30h72V0z" fill="#e7e6bf" />
    <path d="M79 4C76 20 59 30 63 45c3 13-17 22-12 41 9 25-12 37-2 60" fill="none" stroke="#ffffff" strokeWidth="4" />
    <path d="M113 19c-18 19-25 41-15 71s-8 51-14 68" fill="none" stroke="#a14d50" strokeWidth="3" />
    {[30, 72, 112, 152].map((cy, index) => <g key={cy} filter="url(#softShadow)"><circle cx={index % 2 ? 118 : 35} cy={cy} r="15" fill="#243943" /><path d={`M${index % 2 ? 106 : 23} ${cy + 2}c8-12 18-11 25 0`} fill="none" stroke="#b7e3ef" strokeWidth="2" /></g>)}
    <text x="99" y="188" fontSize="5" fill="#364158">Atlantic</text>
  </>
}

function CollisionPreview() {
  return <>
    <rect width="150" height="195" fill="url(#mapWater)" />
    <path d="M11 20c24 11 15 30 39 39s12 27 36 40 11 28 43 47" fill="none" stroke="#dfdfc9" strokeWidth="10" />
    <path d="M18 18c26 15 17 35 43 44s10 29 38 42 12 30 39 46" fill="none" stroke="#5d4aa0" strokeWidth="3" />
    {[18, 38, 56, 80, 106, 128].map((x, index) => <g key={x}><circle cx={x} cy={27 + index * 20} r={4 + index % 3} fill="#fff" stroke="#252b43" /><text x={x - 3} y={30 + index * 20} fontSize="4" fill="#202b3f">{index + 1}</text></g>)}
    <rect x="8" y="150" width="46" height="30" rx="3" fill="#fff" opacity=".93" /><text x="13" y="162" fontSize="5" fill="#24334b">05:09</text><text x="13" y="172" fontSize="5" fill="#7d679b">northbound</text>
  </>
}

function RainPreview() {
  return <>
    <rect width="150" height="195" fill="url(#darkMap)" />
    <path d="M17 164C12 95 32 35 82 23s51 54 48 120" fill="none" stroke="#697794" strokeWidth=".7" opacity=".8" />
    {Array.from({ length: 10 }, (_, index) => <circle key={index} cx={75 + Math.cos(index * 0.63) * (18 + (index % 3) * 9)} cy={92 + Math.sin(index * 0.63) * (18 + (index % 3) * 9)} r="2.2" fill={index % 2 ? '#c26dc2' : '#a9d9e1'} />)}
    <path d="M72 119c11-25 22-39 43-57" fill="none" stroke="#f1d664" strokeWidth="2" />
    <rect x="8" y="10" width="68" height="25" rx="3" fill="#172133" opacity=".9" /><text x="12" y="20" fontSize="5" fill="#fff">Where the Rain Fell</text><text x="12" y="29" fontSize="4" fill="#c2cce1">2012–2023</text>
  </>
}

function SunPreview() {
  return <>
    <rect width="150" height="195" fill="#b8dbe4" />
    <path d="M0 137C28 118 36 134 63 112s52-5 87-25v108H0z" fill="#eef2e2" />
    {[30, 45, 60, 75, 90, 105].map((r, index) => <circle key={r} cx="76" cy="96" r={r} fill="none" stroke={index % 2 ? '#f2c46d' : '#66787e'} strokeWidth={index === 2 ? 10 : 1} opacity={index === 2 ? .7 : .7} />)}
    {spokeAngles.map((angle) => <line key={angle} x1="76" y1="96" x2={76 + Math.cos(angle * Math.PI / 180) * 69} y2={96 + Math.sin(angle * Math.PI / 180) * 69} stroke="#586b70" strokeWidth="1" opacity=".55" />)}
    <circle cx="76" cy="96" r="20" fill="#f6f0db" stroke="#788991" /><path d="M66 96h20M76 86v20" stroke="#c58a35" strokeWidth="2" />
  </>
}

function RadialPreview() {
  return <>
    <rect width="150" height="195" fill="#f7f5ee" />
    <circle cx="75" cy="92" r="43" fill="#edf1ea" stroke="#354758" strokeWidth="1.5" />
    {spokeAngles.map((angle, index) => <path key={angle} d={`M75 92 L${75 + Math.cos((angle - 9) * Math.PI / 180) * 36} ${92 + Math.sin((angle - 9) * Math.PI / 180) * 36} A38 38 0 0 1 ${75 + Math.cos((angle + 9) * Math.PI / 180) * 36} ${92 + Math.sin((angle + 9) * Math.PI / 180) * 36}Z`} fill={['#c45467', '#8e63b6', '#54a6ba', '#e2a847'][index % 4]} opacity=".88" />)}
    <circle cx="75" cy="92" r="21" fill="#fff" stroke="#69777f" /><path d="M54 92h42M75 71v42" stroke="#657684" strokeWidth="1" />
    <rect x="19" y="151" width="112" height="7" rx="3.5" fill="#dcd8cd" /><circle cx="77" cy="154.5" r="5" fill="#303f50" />
  </>
}

function CityPreview() {
  return <>
    <rect width="150" height="195" fill="#f8f8f3" />
    <path d="M0 35h150M0 61h150M0 87h150M0 113h150M0 139h150M0 165h150M20 0v195M47 0v195M74 0v195M101 0v195M128 0v195" stroke="#d7d5cd" strokeWidth="2" />
    <circle cx="75" cy="98" r="34" fill="#fff" stroke="#2d394f" strokeWidth="2" />
    {spokeAngles.slice(0, 9).map((angle, index) => <line key={angle} x1="75" y1="98" x2={75 + Math.cos(angle * Math.PI / 180) * (36 + index % 3 * 7)} y2={98 + Math.sin(angle * Math.PI / 180) * (36 + index % 3 * 7)} stroke={['#8b5bb3', '#4fabc1', '#e2834b'][index % 3]} strokeWidth="7" strokeLinecap="round" />)}
    <circle cx="75" cy="98" r="18" fill="#f7e9bf" stroke="#384962" /><path d="M63 98h24" stroke="#9a6f41" strokeWidth="2" />
  </>
}

function TerrainPreview() {
  return <>
    <rect width="150" height="195" fill="#8bc7ba" />
    {Array.from({ length: 8 }, (_, index) => <path key={index} d={`M-10 ${30 + index * 24} Q45 ${2 + index * 24} 75 ${35 + index * 24} T160 ${30 + index * 24}`} fill="none" stroke={index % 2 ? '#c58e59' : '#e5c289'} strokeWidth="9" opacity=".8" />)}
    <path d="M10 165 57 126 91 150 140 83" fill="none" stroke="#e9f0e9" strokeWidth="2" /><path d="M14 165 57 124 94 151 141 81" fill="none" stroke="#4d6b5c" strokeWidth="1" />
    <rect x="8" y="10" width="76" height="24" rx="3" fill="#193b3b" opacity=".9" /><text x="12" y="20" fontSize="5" fill="#fff">Permafrost</text><text x="12" y="29" fontSize="4" fill="#a8e0d4">Alaska</text>
  </>
}

function ElectionPreview() {
  return <>
    <rect width="150" height="195" fill="#eff0e8" />
    <path d="M7 30c35-22 66-10 81 19s35 31 55 37v72c-31 15-57-10-80-3S24 168 7 141z" fill="#d7dfce" />
    <circle cx="77" cy="97" r="34" fill="#fff" stroke="#526171" strokeWidth="2" />
    {spokeAngles.map((angle, index) => <line key={angle} x1={77 + Math.cos(angle * Math.PI / 180) * 35} y1={97 + Math.sin(angle * Math.PI / 180) * 35} x2={77 + Math.cos(angle * Math.PI / 180) * (49 + index % 3 * 8)} y2={97 + Math.sin(angle * Math.PI / 180) * (49 + index % 3 * 8)} stroke={['#22252d', '#b94147', '#7866b0', '#e1b74a'][index % 4]} strokeWidth="6" />)}
    <circle cx="77" cy="97" r="18" fill="#afc2ae" /><rect x="51" y="156" width="54" height="6" rx="3" fill="#4e5966" /><circle cx="77" cy="159" r="5" fill="#f5f5f1" stroke="#4e5966" />
  </>
}

function TransportPreview() {
  return <>
    <rect width="150" height="195" fill="#f4f4ef" />
    <path d="M14 21c25 8 33 21 36 41s23 24 37 26 25 19 39 60" fill="none" stroke="#101a26" strokeWidth="2" />
    {Array.from({ length: 23 }, (_, index) => <circle key={index} cx={20 + (index * 31) % 109} cy={27 + (index * 47) % 130} r={2 + index % 4} fill={['#da6370', '#5aa9bc', '#e2b850', '#7770b6'][index % 4]} opacity=".85" />)}
    <rect x="7" y="154" width="136" height="25" fill="#20242a" rx="3" /><path d="M18 170h35l11-7 17 7h48" fill="none" stroke="#a5c9e3" strokeWidth="2" />
  </>
}

function VolcanoPreview() {
  return <>
    <rect width="150" height="195" fill="#202126" />
    <path d="M0 103c34-35 53-23 76-11s51 1 74-29v132H0z" fill="#10151e" />
    <path d="M15 39c21-12 38-8 49 4M89 30c14 2 31 17 36 37M33 104c11-9 23-8 36 0" fill="none" stroke="#788595" strokeWidth="1" opacity=".7" />
    {[35, 72, 112].map((x, index) => <g key={x}><path d={`M${x - 13} 152  ${x} ${94 - index * 11} ${x + 14} 152z`} fill="#4a4544" /><path d={`M${x - 5} ${130 - index * 4}q5-17 10 0`} fill="none" stroke="#e47f51" strokeWidth="2" /><circle cx={x} cy={113 - index * 11} r="3" fill="#e7b43d" /></g>)}
    <text x="9" y="181" fontSize="6" fill="#f2f2f0">VOLCANOES</text>
  </>
}

function ContourPreview() {
  return <>
    <rect width="150" height="195" fill="#fbfaf3" />
    {contours.map((path, index) => <path key={path} d={path} fill={index === 0 ? '#151618' : 'none'} stroke={index === 0 ? 'none' : '#b49e86'} strokeWidth="1" />)}
    {Array.from({ length: 19 }, (_, index) => <line key={index} x1={12 + (index % 5) * 30} y1={20 + Math.floor(index / 5) * 38} x2={23 + (index % 5) * 30} y2={20 + Math.floor(index / 5) * 38} stroke={['#bc3f4d', '#d59b41', '#5172a7'][index % 3]} strokeWidth="3" />)}
    <text x="8" y="184" fontSize="5" fill="#55514e">regional contours</text>
  </>
}

function ProfilePreview() {
  return <>
    <rect width="150" height="195" fill="#1e2026" />
    <path d="M8 162 20 145 30 141 43 124 55 111 67 94 78 106 91 70 102 85 116 56 128 73 142 43" fill="none" stroke="#728ec8" strokeWidth="3" />
    <path d="M8 162 20 145 30 141 43 124 55 111 67 94 78 106 91 70 102 85 116 56 128 73 142 43V171H8z" fill="#3f4e76" opacity=".42" />
    {[35, 64, 93, 122, 151].map((y) => <line key={y} x1="9" y1={y} x2="142" y2={y} stroke="#58606c" strokeWidth=".7" opacity=".65" />)}
    <rect x="94" y="17" width="38" height="21" rx="2" fill="#292c36" /><text x="98" y="26" fontSize="4" fill="#d9a2c9">elevation</text><text x="98" y="34" fontSize="5" fill="#e9e9e8">1,090 m</text>
  </>
}
