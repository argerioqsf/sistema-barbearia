// Convenção de chaves de cache para React Query
// Sempre use arrays estáveis; objetos de filtro devem ser serializáveis

export const qk = {
  products: {
    list: (filters?: Record<string, unknown>) =>
      ['products', { ...(filters || {}) }] as const,
    detail: (id: string) => ['products', id] as const,
  },
  services: {
    list: (filters?: Record<string, unknown>) =>
      ['services', { ...(filters || {}) }] as const,
    detail: (id: string) => ['services', id] as const,
  },
  coupons: {
    list: (filters?: Record<string, unknown>) =>
      ['coupons', { ...(filters || {}) }] as const,
    detail: (id: string) => ['coupons', id] as const,
  },
  sales: {
    byId: (id: string) => ['sales', id] as const,
    list: (filters?: Record<string, unknown>) =>
      ['sales', { ...(filters || {}) }] as const,
  },
  appointments: {
    list: (filters?: Record<string, unknown>) =>
      ['appointments', { ...(filters || {}) }] as const,
    detail: (id: string) => ['appointments', id] as const,
  },
}
