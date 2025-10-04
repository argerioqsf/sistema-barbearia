import { z } from 'zod'

export const UUID = () => z.string().uuid()
export const ISODateTime = () => z.string().datetime() // exemplo: 2025-09-13T20:34:53.113Z
export const ISODate = () => z.string() // manter string simples (ex.: "2000-01-01")
export const isValidCPF = (cpf: string) => {
  // regra básica para rejeitar todos dígitos iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false
  // calc dígitos — simplificado; substitua por validação oficial se necessário
  const calc = (base: string, factor: number) =>
    base.split('').reduce((acc, cur) => acc + parseInt(cur, 10) * factor--, 0)
  const b9 = cpf.slice(0, 9)
  const d1 = ((calc(b9, 10) * 10) % 11) % 10
  const d2 = ((calc(b9 + d1, 11) * 10) % 11) % 10
  return cpf.endsWith(`${d1}${d2}`)
}
export const HHmmRegex = /^([01]\d|2[0-3]):[0-5]\d$/
export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
