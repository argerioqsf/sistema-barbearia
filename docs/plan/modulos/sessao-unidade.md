# Sessão de Unidade — Seleção Obrigatória Pós-Login

Contexto
- Usuários ADMIN e OWNER escolhem a unidade ativa diretamente no header do dashboard.
- Backend: `PATCH /sessions/unit` pode devolver novo token no corpo (`token`) ou header `x-new-token`.
- `GET /units` mantém filtro por organização para OWNER.

Componente
- `NavBar` exibe um `select` com as unidades disponíveis quando o usuário tem role ADMIN/OWNER.

Tasks
1) Data sourcing no layout
   - [x] Buscar unidades via `features/units/api.ts` no layout do dashboard
   - [x] Obter unidade atual via `fetchProfile`
   - [x] Passar dados para `ContainerLayoutDashboard` → `NavBar`
2) Server Action — escolher unidade
   - [x] Criar `changeActiveUnit` (`src/actions/session.ts`) chamando `PATCH /sessions/unit`
   - [x] Sincronizar token (header/body) e revalidar caches (`units`, `users`)
3) Componente de seleção
   - [x] Mostrar seletor apenas para ADMIN/OWNER
   - [x] Desabilitar durante envio (`useTransition`) e exibir toast de sucesso/erro
   - [x] Atualizar interface com `router.refresh()` após troca
   - [ ] Ajustar estilo/loading states conforme ui-layout-guidelines (aprimoramento)
4) Limpeza
   - [x] Remover página `[locale]/select-unit`
   - [x] Remover redirecionamento obrigatório em `dashboard/home`

Critérios de aceite
- Apenas ADMIN/OWNER visualizam o seletor; lista já filtrada pelo backend
- Troca de unidade atualiza token/sessão e reflete no dashboard (refresh)
- Comportamento consistente com ui-layout-guidelines (ajustes finos pendentes)

Referências
- docs/tech/backend-endpoints.md (Sessão/Unidade e Unidades)
- src/app/[locale]/dashboard/layout.tsx, src/components/organisms/NavBar/index.tsx
- src/actions/session.ts, src/features/units/api.ts, src/utils/authServer.ts
