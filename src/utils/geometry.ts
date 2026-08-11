export function clamp(value: number, lower: number, upper: number): number {
  return Math.max(lower, Math.min(upper, value))
}

export function polar(cx: number, cy: number, radius: number, angleDegrees: number): [number, number] {
  const radians = (angleDegrees - 90) * (Math.PI / 180)
  return [cx + radius * Math.cos(radians), cy + radius * Math.sin(radians)]
}

export function arcPath(cx: number, cy: number, radius: number, start: number, end: number): string {
  const [sx, sy] = polar(cx, cy, radius, end)
  const [ex, ey] = polar(cx, cy, radius, start)
  const largeArc = end - start <= 180 ? 0 : 1
  return `M ${sx} ${sy} A ${radius} ${radius} 0 ${largeArc} 0 ${ex} ${ey}`
}
