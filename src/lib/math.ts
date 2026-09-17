export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  const t = (value - inMin) / (inMax - inMin || 1)
  return outMin + t * (outMax - outMin)
}

export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt))

export const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min)
