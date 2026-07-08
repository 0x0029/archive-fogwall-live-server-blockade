/*
  Fogwall asset generation.
  All assets (favicon, logo, hero, social preview) are generated via Canvas API.
  Icons are SVG data URLs.
*/

function ensureRoundRect() {
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number | number[]
    ) {
      const radii = Array.isArray(r) ? r : [r, r, r, r]
      const [tl, tr, br, bl] = radii
      this.beginPath()
      this.moveTo(x + tl, y)
      this.lineTo(x + w - tr, y)
      this.quadraticCurveTo(x + w, y, x + w, y + tr)
      this.lineTo(x + w, y + h - br)
      this.quadraticCurveTo(x + w, y + h, x + w - br, y + h)
      this.lineTo(x + bl, y + h)
      this.quadraticCurveTo(x, y + h, x, y + h - bl)
      this.lineTo(x, y + tl)
      this.quadraticCurveTo(x, y, x + tl, y)
      this.closePath()
      return this
    }
  }
}

function makeCanvas(w: number, h: number): HTMLCanvasElement {
  ensureRoundRect()
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  return canvas
}

function fogShape(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  color: string
) {
  ctx.fillStyle = color
  ctx.beginPath()
  const r = scale
  ctx.arc(cx - r * 0.8, cy + r * 0.2, r * 0.55, 0, Math.PI * 2)
  ctx.arc(cx - r * 0.2, cy - r * 0.3, r * 0.65, 0, Math.PI * 2)
  ctx.arc(cx + r * 0.4, cy - r * 0.1, r * 0.6, 0, Math.PI * 2)
  ctx.arc(cx + r * 0.7, cy + r * 0.25, r * 0.5, 0, Math.PI * 2)
  ctx.arc(cx, cy + r * 0.4, r * 0.7, 0, Math.PI * 2)
  ctx.fill()
}

function purpleGradient(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): CanvasGradient {
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, "#6c5ce7")
  grad.addColorStop(1, "#a78bfa")
  return grad
}

export function generateFavicon(): string {
  const size = 64
  const canvas = makeCanvas(size, size)
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = purpleGradient(ctx, size, size)
  ctx.beginPath()
  ctx.roundRect(2, 2, size - 4, size - 4, 14)
  ctx.fill()

  ctx.save()
  ctx.globalAlpha = 0.3
  fogShape(ctx, size / 2, size / 2 - 2, 18, "#ffffff")
  ctx.restore()

  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 38px Inter, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("F", size / 2, size / 2 + 2)

  return canvas.toDataURL("image/png")
}

export function generateLogo(): string {
  const size = 512
  const canvas = makeCanvas(size, size)
  const ctx = canvas.getContext("2d")!

  ctx.save()
  ctx.shadowColor = "rgba(108, 92, 231, 0.5)"
  ctx.shadowBlur = 40
  ctx.fillStyle = purpleGradient(ctx, size, size)
  ctx.beginPath()
  ctx.roundRect(56, 40, size - 112, size - 112, 48)
  ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.globalAlpha = 0.25
  fogShape(ctx, size / 2, 200, 90, "#ffffff")
  ctx.restore()

  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 120px Inter, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("F", size / 2, 200)

  ctx.fillStyle = "#e8e8f0"
  ctx.font = "bold 52px Inter, sans-serif"
  ctx.fillText("FOGWALL", size / 2, 360)

  ctx.fillStyle = "#8888aa"
  ctx.font = "24px Inter, sans-serif"
  ctx.fillText("Server Status", size / 2, 410)

  return canvas.toDataURL("image/png")
}

export function generateHeroBg(): string {
  const w = 1920
  const h = 1080
  const canvas = makeCanvas(w, h)
  const ctx = canvas.getContext("2d")!

  const radial = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 1.5)
  radial.addColorStop(0, "#14141e")
  radial.addColorStop(0.5, "#0a0a0f")
  radial.addColorStop(1, "#050508")
  ctx.fillStyle = radial
  ctx.fillRect(0, 0, w, h)

  const orbs = [
    { x: 0.2, y: 0.3, r: 300, a: 0.12 },
    { x: 0.8, y: 0.2, r: 250, a: 0.10 },
    { x: 0.7, y: 0.8, r: 350, a: 0.14 },
    { x: 0.3, y: 0.7, r: 200, a: 0.08 },
    { x: 0.5, y: 0.5, r: 180, a: 0.06 },
  ]
  for (const orb of orbs) {
    const g = ctx.createRadialGradient(
      orb.x * w,
      orb.y * h,
      0,
      orb.x * w,
      orb.y * h,
      orb.r
    )
    g.addColorStop(0, `rgba(108, 92, 231, ${orb.a})`)
    g.addColorStop(1, "rgba(108, 92, 231, 0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  }

  for (let i = 0; i < 120; i++) {
    const x = Math.random() * w
    const y = Math.random() * h
    const r = Math.random() * 2 + 0.5
    const a = Math.random() * 0.15 + 0.03
    ctx.fillStyle = `rgba(255, 255, 255, ${a})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  return canvas.toDataURL("image/jpeg", 0.85)
}

export function generateSocialPreview(): string {
  const w = 1200
  const h = 630
  const canvas = makeCanvas(w, h)
  const ctx = canvas.getContext("2d")!

  const radial = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 1.2)
  radial.addColorStop(0, "#14141e")
  radial.addColorStop(1, "#0a0a0f")
  ctx.fillStyle = radial
  ctx.fillRect(0, 0, w, h)

  const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 400)
  g.addColorStop(0, "rgba(108, 92, 231, 0.15)")
  g.addColorStop(1, "rgba(108, 92, 231, 0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  const iconSize = 140
  const iconX = w / 2
  const iconY = 200

  ctx.save()
  ctx.shadowColor = "rgba(108, 92, 231, 0.6)"
  ctx.shadowBlur = 30
  ctx.fillStyle = purpleGradient(ctx, iconSize, iconSize)
  ctx.beginPath()
  ctx.roundRect(
    iconX - iconSize / 2,
    iconY - iconSize / 2,
    iconSize,
    iconSize,
    28
  )
  ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.globalAlpha = 0.25
  fogShape(ctx, iconX, iconY, 45, "#ffffff")
  ctx.restore()

  ctx.fillStyle = "#ffffff"
  ctx.font = "bold 72px Inter, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText("F", iconX, iconY + 4)

  ctx.fillStyle = "#e8e8f0"
  ctx.font = "bold 56px Inter, sans-serif"
  ctx.fillText("FOGWALL", w / 2, 360)

  ctx.fillStyle = "#8888aa"
  ctx.font = "28px Inter, sans-serif"
  ctx.fillText("Blockade3D Server Status", w / 2, 420)

  return canvas.toDataURL("image/jpeg", 0.85)
}

/* ---- SVG icon data URLs ---- */

function svgDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function svgIcon(inner: string, extra = ""): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${inner}</svg>`
}

export const icons = {
  online: svgDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00d4aa"><circle cx="12" cy="12" r="6"><animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/></circle><circle cx="12" cy="12" r="10" fill="none" stroke="#00d4aa" stroke-width="1" opacity="0.3"><animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/></circle></svg>`
  ),
  offline: svgDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff6b6b"><circle cx="12" cy="12" r="6"/></svg>`
  ),
  players: svgDataUrl(
    svgIcon(
      `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`
    )
  ),
  map: svgDataUrl(
    svgIcon(
      `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`
    )
  ),
  mode: svgDataUrl(
    svgIcon(
      `<line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 3-1 3-3 0 0 0-3 4-3s4 3 4 3c0 2 2 3 3 3a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>`
    )
  ),
  refresh: svgDataUrl(
    svgIcon(
      `<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>`
    )
  ),
  servers: svgDataUrl(
    svgIcon(
      `<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>`
    )
  ),
  playersTab: svgDataUrl(
    svgIcon(
      `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`
    )
  ),
  analytics: svgDataUrl(
    svgIcon(
      `<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16l4-4 4 4 5-5"/>`
    )
  ),
  chevron: svgDataUrl(
    svgIcon(`<path d="m6 9 6 6 6-6"/>`)
  ),
  empty: svgDataUrl(
    svgIcon(
      `<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>`
    )
  ),
}

export function generateSpinnerSvg(): string {
  return svgDataUrl(
    `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="rgba(108,92,231,0.2)" stroke-width="4"/><circle cx="24" cy="24" r="20" stroke="#6c5ce7" stroke-width="4" stroke-linecap="round" stroke-dasharray="80 200"><animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="1s" repeatCount="indefinite"/></circle></svg>`
  )
}
