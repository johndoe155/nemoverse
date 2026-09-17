import type { Universe } from '@/data/universes'

/** Procedural CSS gradient art for universe cards / placeholders */
export function universeGradient(u: Universe, angle = 145): string {
  const { hue, sat, light, secondaryHue, rarity } = u
  const c1 = `hsl(${hue} ${sat}% ${light}%)`
  const c2 = `hsl(${secondaryHue} ${Math.min(sat + 10, 80)}% ${Math.min(light + 18, 60)}%)`
  const c3 = `hsl(${(hue + 40) % 360} ${sat * 0.6}% ${Math.max(light - 12, 8)}%)`
  const glow =
    rarity === 'secret'
      ? `radial-gradient(circle at 70% 20%, hsla(${hue}, 40%, 50%, 0.35), transparent 50%)`
      : rarity === 'variant'
        ? `radial-gradient(circle at 30% 80%, hsla(42, 80%, 55%, 0.28), transparent 45%)`
        : `radial-gradient(circle at 50% 0%, hsla(${secondaryHue}, 60%, 60%, 0.2), transparent 55%)`

  return `${glow}, linear-gradient(${angle}deg, ${c3} 0%, ${c1} 45%, ${c2} 100%)`
}

export function universeMeshColor(u: Universe): string {
  return `hsl(${u.hue} ${u.sat}% ${Math.min(u.light + 10, 55)}%)`
}

export function shortAddress(addr: string) {
  if (addr.length < 12) return addr
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}
