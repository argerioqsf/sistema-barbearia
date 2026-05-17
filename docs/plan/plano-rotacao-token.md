# Plano de Melhoria — Rotação de Token com Refresh Token

Este documento padroniza como o frontend renova o access token do backend usando o refresh token armazenado na sessão do NextAuth.

## Objetivo
- Usar a sessão JWT do NextAuth como fonte de verdade para `accessToken`, `refreshToken` e expirações.
- Renovar o access token via `POST /sessions/refresh`, sem depender de token retornado em header.
- Evitar escrita manual de cookies e manter o fluxo compatível com Server Components.

## Contexto e Premissas
- Sessão gerida pelo NextAuth v4 com `session.strategy = 'jwt'`.
- `POST /sessions` retorna `{ token, refreshToken, tokenExpiresIn, refreshTokenExpiresIn, user, roles? }`.
- `POST /sessions/refresh` recebe `{ refreshToken }` e retorna novo par `{ token, refreshToken, tokenExpiresIn, refreshTokenExpiresIn }`.
- Rotas protegidas podem responder `401 { message: 'TOKEN_EXPIRED' }` quando o access token atual foi invalidado.

## Decisão Técnica
- Fonte de verdade do token: JWT interno do NextAuth.
- Renovação programada: o callback `jwt` renova o access token quando ele está próximo do vencimento.
- Renovação forçada: fluxos que invalidam o token atual, como troca de unidade, chamam `useSession().update({ accessTokenExpires: Date.now() })` para forçar o callback `jwt` a chamar `/sessions/refresh`.
- Erro de refresh: o callback `session` expõe `session.error`; o provider client faz logout/redirecionamento quando recebe `RefreshAccessTokenError` ou `RefreshTokenExpired`.
- SSR: após renovar a sessão em uma tela que depende de dados carregados no servidor, usar `router.refresh()`.

## Fluxo de Login
1. UI chama NextAuth Credentials.
2. `authorize` chama `POST /sessions`.
3. O callback `jwt` persiste access token, refresh token e expirações.
4. O callback `session` expõe `session.accessToken` e metadados necessários ao client.

## Fluxo de Renovação Automática
1. Algum código chama `getServerSession`, `useSession` ou atualiza a sessão.
2. O callback `jwt` compara `accessTokenExpires` com a hora atual.
3. Se estiver no intervalo de segurança, chama `POST /sessions/refresh`.
4. Se o refresh falhar, grava erro na sessão para o client encerrar a sessão.

## Fluxo de Troca de Unidade
1. `UnitSwitcher` chama `changeActiveUnit(unitId)`.
2. A Server Action chama `PATCH /sessions/unit` com o access token atual.
3. Em caso de sucesso, a UI chama `useRefreshSessionToken({ unitId })`.
4. O hook força `accessTokenExpires = Date.now()` via `useSession().update`.
5. O callback `jwt` chama `/sessions/refresh` e persiste o novo par de tokens.
6. A UI chama `router.refresh()` para refazer leituras server-side com o token renovado.

## Arquivos Envolvidos
- `src/auth/options.ts`: login, persistência dos tokens, refresh automático e erros de sessão.
- `src/types/next-auth.d.ts`: tipos extras da sessão/JWT.
- `src/app/[locale]/providers.tsx`: watcher de erro de sessão.
- `src/hooks/use-refresh-session-token.ts`: força renovação em fluxos que invalidam o token.
- `src/actions/session.ts`: troca de unidade sem retornar token ao client.
- `src/components/organisms/NavBar/UnitSwitcher.tsx`: troca de unidade, refresh de sessão e `router.refresh()`.

## Critérios de Aceite
- Login armazena access token, refresh token e expirações no NextAuth.
- Access token é renovado antes de expirar.
- Troca de unidade renova a sessão sem depender de header de rotação.
- Refresh expirado ou inválido encerra a sessão de forma controlada.
- Nenhum token sensível é escrito em logs ou arquivos locais versionáveis.
