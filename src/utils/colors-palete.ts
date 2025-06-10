export function hexToHsl(hex: string): string {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  const hh = Math.round(h * 360)
  const ss = Math.round(s * 100)
  const ll = Math.round(l * 100)
  return `${hh} ${ss}% ${ll}%`
}

export function lighten(hsl: string, amount = 20): string {
  const [h, s, l] = hsl.split(/\s+/).map((v) => parseFloat(v.replace('%', '')))
  const newL = Math.min(100, l + amount)
  return `${h} ${s}% ${newL}%`
}

export function applyPalette(primary: string, secondary: string) {
  const primaryHsl = hexToHsl(primary)
  const secondaryHsl = hexToHsl(secondary)
  const primary50 = lighten(primaryHsl)
  const secondary50 = lighten(secondaryHsl)
  document.documentElement.style.setProperty('--primary', primaryHsl)
  document.documentElement.style.setProperty('--primary-50', primary50)
  document.documentElement.style.setProperty('--primary-100', primaryHsl)
  document.documentElement.style.setProperty('--secondary', secondaryHsl)
  document.documentElement.style.setProperty('--secondary-50', secondary50)
  document.documentElement.style.setProperty('--secondary-100', secondaryHsl)
}
