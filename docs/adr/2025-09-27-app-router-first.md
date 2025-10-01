# ADR: App Router First

Status: Aceito
Data: 2025-09-27

## Contexto
Precisamos padronizar data fetching e mutações no Next.js, evitando lógica de infraestrutura dentro da UI e aproveitando RSC/Suspense.

## Decisão
- Priorizar Server Components para leitura de dados e composição de páginas.
- Usar Server Actions para mutações sensíveis e invalidação (tags/paths) quando aplicável.
- Manter efeitos de UX (toasts) apenas em Client Components/hooks.

## Alternativas consideradas
- Manter tudo client-side: simplifica UX local, mas aumenta acoplamento, piora SEO e complica credenciais.
- API Routes + SWR/Query para tudo: bom isolamento, mas dispersa padrões com App Router.

## Consequências
- Positiva: performance e SEO melhores; contratos server-side mais claros; segurança de credenciais.
- Negativa: exige disciplina em boundaries (Server vs Client) e em invalidação de cache.

## Relacionados
- `../tech/app-router-guidelines.md`
- `../tech/arquitetura-modular.md`
- `../plan/tasks-modernizacao-pos.md`
