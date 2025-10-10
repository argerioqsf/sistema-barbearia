# Plano de Melhoria — Rotação de Token (x-new-token)

Este documento padroniza como o frontend atualiza o accessToken quando o backend devolve um token novo via header `x-new-token`, mantendo compatibilidade com Next.js 14.1 e NextAuth 4.24 (strategy `jwt`).

## Objetivo
- Garantir atualização correta do token no frontend quando o backend o rotacionar.
- Evitar manipulação manual de cookies; usar o pipeline oficial do NextAuth.
- Permitir adoção progressiva sem quebrar requests existentes.

## Contexto e Premissas
- Sessão gerida pelo NextAuth v4 com `session.strategy = 'jwt'`.
- Backend envia o token novo exclusivamente no header `x-new-token` (prefixo opcional `Bearer `).
- Server Components leem dados no servidor usando o token do request; para refletir o token novo na rota atual, um refresh de rota é necessário.

## Decisão Técnica (Padrão)
- Fonte de verdade do token: sessão do NextAuth (JWT).
- Detecção de token novo: ler somente o header `x-new-token` (ou `X-New-Token`).
- Atualização da sessão: no cliente, via `useSession().update({ accessToken: token })`.
- Server Actions não escrevem cookies/sessão; apenas retornam `{ ok, token? }` ao cliente.
- SSR: após `session.update`, usar `router.refresh()` quando a tela atual depende de dados carregados no servidor com o token.

## Fluxo (alto nível)
1) UI (cliente) dispara uma mutação (ex.: trocar unidade) que chama uma Server Action.
2) A Server Action chama o backend e extrai `x-new-token` da resposta.
3) A Server Action retorna `{ ok, token? }` para a UI (sem efeitos colaterais em cookies).
4) A UI, ao receber `token`, executa `useSession().update({ accessToken: token })` e, se necessário, `router.refresh()`.

## Alterações Técnicas
- NextAuth Callbacks
  - `jwt`: tratar `trigger === 'update'` copiando `session.accessToken` → `token.accessToken`.
  - `session`: expor `session.accessToken = token.accessToken`.
- HTTP Helper
  - `updateTokenFromResponse(res): string | undefined` — retornar apenas o token do header (sem side effects).
- Server Action (piloto)
  - `changeActiveUnit(unitId)`: retornar `{ ok, token? }` usando `updateTokenFromResponse`.
- UI (piloto)
  - Componente client (NavBar): após sucesso, se houver `token`, chamar `useSession().update({ accessToken: token })` e `router.refresh()` se a página atual tiver leitura server-side dependente do token.

## Helpers Recomendados (evolução)
- `extractNewToken(res: Response): string | undefined`
  - Centraliza a leitura do header `x-new-token` (equivalente ao `updateTokenFromResponse` atual).
- `useTokenSync()` (client)
  - `apply(token?: string)`: chama `useSession().update({ accessToken: token })` quando existir.
  - Facilita reutilização em várias UIs.
- (Opcional) `useClientApi()`
  - Wrapper de fetch no client que injeta `Authorization` (da sessão) e, ao receber resposta, chama `useTokenSync().apply(headerToken)` quando disponível.

## SSR e Server Components
- Por que `router.refresh()`? Ele força o Next (App Router) a refazer o payload RSC e reexecutar Server Components no servidor com os cookies atualizados, garantindo que o token novo seja usado nos fetches server-side.
- Quando usar:
  - Após `session.update`, se a rota atual exibe dados carregados no servidor com o token.
  - Se haverá navegação (`router.push/replace`), o refresh é desnecessário.

## Adoção Progressiva
- Fase 0 (base)
  - [x] `updateTokenFromResponse(res)` retorna apenas o token (string | undefined).
  - [x] Callbacks do NextAuth ajustados (`jwt` com `trigger === 'update'`; `session` com `accessToken`).
- Fase 1 (piloto)
  - [x] `changeActiveUnit` retorna `{ ok, token? }`.
  - [x] NavBar aplica `useSession().update` + `router.refresh()` após troca.
- Fase 2 (padronização)
  - [x] Criar `useTokenSync()` e usar em todas as UIs que aplicam rotação (piloto em `NavBar`).
  - [x] Unificar leitura do header em `extractNewToken` (alias de `updateTokenFromResponse`).
  - [ ] Padronizar retorno `{ ok, token?, error? }` em todas as Server Actions que possam girar token (permissões/role, organização, etc.).
- Fase 3 (client fetch)
  - [ ] Introduzir `useClientApi()` para mutations client-side e adotar em 1–2 fluxos de alto uso.
- Fase 4 (rollout)
  - [ ] Propagar padrão às demais mutações com rotação de token.
  - [ ] Atualizar docs/README com o padrão e exemplos.

## Tarefas Detalhadas
1) Helper
   - [x] Renomear/duplicar `updateTokenFromResponse` → `extractNewToken` mantendo assinatura.
   - [x] Cobrir o prefixo `Bearer` (se presente) e normalizar o valor.
2) Hook client
   - [x] Criar `src/hooks/use-token-sync.ts` com `apply(token?: string)` chamando `useSession().update` quando houver token.
3) Server Actions
   - [ ] Garantir que todas as actions que podem rotacionar o token usem `extractNewToken` e retornem `{ ok, token? }`.
   - [ ] Não fazer `redirect` dentro da Action; retornar status e deixar UI decidir navegação/refresh.
4) UI
   - [x] Substituir chamadas diretas por `useTokenSync().apply(result.token)` + `router.refresh()` quando fizer sentido (piloto em `NavBar`).
5) Client fetch wrapper (opcional)
   - [ ] Criar `useClientApi()` para mutations client-side e adotar em fluxo piloto.
6) Documentação
   - [ ] Adicionar guia “Como lidar com x-new-token” com exemplos de Server Action + UI + SSR.

## Critérios de Aceite
- Após trocar unidade/permissões/organização:
  - O client tem `session.accessToken` atualizado sem reload completo.
  - A tela atual, quando dependente de SSR, reflete os dados do novo contexto após `router.refresh()`.
  - Nenhum fluxo antigo quebra (endpoints que não retornam `x-new-token` continuam funcionando).
- Não há escrita manual de cookies para o token.

## Riscos e Mitigações
- Requisições subsequentes acontecerem antes de `session.update` finalizar
  - Mitigar chamando `await updateSession(...)` e após isso `router.refresh()`/navegação.
- Rotação ocorrendo em chamadas server-only (sem boundary client)
  - Evitar; quando inevitável, combinar grace period no backend (token antigo ainda válido por curto período) e/ou mover o gatilho para um client boundary.
- Múltiplas rotações em sequência
  - O padrão é idempotente; a última atualização prevalece.

## Referências
- NextAuth v4 — callbacks `jwt` (trigger 'update') e `session` (expor dados adicionais na sessão)
- App Router — `router.refresh()` para revalidar RSC e refazer leitura server-side
