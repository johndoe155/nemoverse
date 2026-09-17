export const cardVertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

export const cardFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uHover;
uniform float uOwned;
uniform float uRarity; // 0 standard, 1 variant, 2 secret
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uAccent;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv;
  float n = noise(uv * 4.0 + uTime * 0.08);
  float n2 = noise(uv * 9.0 - uTime * 0.05);

  // Base dimensional wash
  vec3 col = mix(uColorA, uColorB, uv.y + n * 0.15);
  col = mix(col, uAccent, n2 * 0.18);

  // Soft vignette portal
  float vignette = smoothstep(0.95, 0.25, length(uv - 0.5) * 1.35);
  col *= 0.55 + vignette * 0.55;

  // Fresnel rim
  vec3 viewDir = normalize(cameraPosition - vWorldPos);
  float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 2.8);
  vec3 rim = mix(uAccent, vec3(1.0), 0.35) * fresnel;
  col += rim * (0.45 + uHover * 0.55);

  // Iridescent sweep on hover
  float sweep = sin((uv.x + uv.y) * 6.0 + uTime * 1.5 + uHover * 2.0) * 0.5 + 0.5;
  col += uAccent * sweep * uHover * 0.22;

  // Owned sigil glow
  float ring = smoothstep(0.08, 0.0, abs(length(uv - 0.5) - 0.38));
  col += vec3(0.4, 0.9, 1.0) * ring * uOwned * 0.55;

  // Rarity treatments
  if (uRarity > 0.5 && uRarity < 1.5) {
    // variant gold flecks
    float fleck = step(0.92, noise(uv * 28.0 + uTime * 0.2));
    col += vec3(0.95, 0.78, 0.4) * fleck * 0.5;
  }
  if (uRarity > 1.5) {
    // secret — darker, noise veil
    col *= 0.55 + n * 0.2;
    float veil = smoothstep(0.3, 0.9, noise(uv * 3.0 + uTime * 0.15));
    col = mix(col * 0.3, col, veil * 0.7 + 0.15);
    col += uAccent * fresnel * 0.4;
  }

  // Film grain
  float grain = (hash(uv * 800.0 + fract(uTime)) - 0.5) * 0.06;
  col += grain;

  // Edge frame
  float frame = smoothstep(0.0, 0.02, uv.x) * smoothstep(1.0, 0.98, uv.x)
              * smoothstep(0.0, 0.02, uv.y) * smoothstep(1.0, 0.98, uv.y);
  col *= 0.7 + frame * 0.3;

  gl_FragColor = vec4(col, 1.0);
}
`
