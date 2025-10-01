import { z } from 'zod'

export const UUID = () => z.string().uuid()
export const ISODateTime = () => z.string().datetime() // exemplo: 2025-09-13T20:34:53.113Z
export const ISODate = () => z.string() // manter string simples (ex.: "2000-01-01")
