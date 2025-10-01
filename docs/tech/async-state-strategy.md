# Estratégia de Estado Assíncrono

Decisão: adotar um padrão leve baseado em `Result<T, NormalizedError>` e um executador utilitário para padronizar loading/erro/valor em hooks Client. Para casos mais complexos no futuro, considerar `@tanstack/react-query` (backlog), mantendo a mesma interface de resultados.

Princípios
- Casos de uso (application) sempre retornam `Result<T, NormalizedError>`.
- Hooks Client usam um executador utilitário para expor `{ loading, error, data }` e emitir toasts quando necessário.
- Server Components permanecem puros, sem toasts.

## React Query (client interativo)
- Provider configurado no App Router (`src/app/[locale]/providers.tsx`) com DevTools em desenvolvimento.
- Adapters expostos em `src/shared/react-query-adapter.ts` (Result → data/throw) para queries e mutations.
- Convenção de chaves em `src/shared/query-keys.ts` (ex.: `qk.products.list({ q, page, perPage })`).
- Boas práticas: usar objetos de filtros serializáveis nas keys e invalidar por chaves após mutações.

### Invalidação recomendada (POS)
- `qk.sales.byId(saleId)` após add/remove/atualizações e pagamento.
- `qk.products.list`, `qk.services.list`, `qk.coupons.list` quando catálogos forem alterados.
- Integrar com `revalidateTag` no backend (`sales`, `products`, etc.) para manter paridade SSR.

Ver também:
- `src/shared/async-executor.ts`
- `src/shared/result.ts`
- `docs/tech/arquitetura-modular.md`
 - `src/shared/react-query-adapter.ts`
 - `src/shared/query-keys.ts`
