# ADR: React Query junto ao Executor Simples

Status: Aceito
Data: 2025-09-27

## Contexto
O projeto possui múltiplas listagens com filtros/paginação e fluxo POS interativo. Já existe um executor simples (`src/shared/async-executor.ts`) para padronizar operações com `Result<T, NormalizedError>`, porém faltam capacidades de cache/dedupe/invalidations reativas no client.

## Decisão
- Adotar React Query para cache no client, deduplicação, revalidação em segundo plano e invalidação declarativa por chaves.
- Manter o executor simples como boundary e para operações pontuais sem cache.
- Casos de uso continuam retornando `Result<T, NormalizedError>`; adapters (queryFn/mutationFn) convertem `Result` em `data` ou lançam erro normalizado para os handlers do React Query.

## Escopo
- Leituras server-side (RSC/SSR) continuam nos casos de uso sem React Query.
- Client interativo (seletor POS e listas com filtros) utiliza React Query.
- Mutações simples podem permanecer no executor; mutações que impactam múltiplas views usam React Query + invalidação.

## Alternativas consideradas
- Apenas executor simples + cache manual: maior boilerplate, duplicação de lógica de cache/dedupe e invalidação.
- SWR: bom para fetching, mas React Query oferece melhores primitives para mutações complexas e invalidation granular.

## Consequências
- Positivas: velocidade de desenvolvimento, menos boilerplate, melhor UX reativa e ferramentas (DevTools).
- Negativas: dependência adicional e necessidade de convenções de chaves e políticas de invalidação.

## Ações relacionadas
- Configurar Provider e adapters; definir keys por domínio.
- Migrar seletor do POS para queries com cache.
- Documentar convenções em `docs/tech/async-state-strategy.md` e `docs/plan/tasks-modernizacao-pos.md`.

## Referências
- `../plan/tasks-modernizacao-pos.md`
- `../tech/async-state-strategy.md`
- `../tech/arquitetura-modular.md`
