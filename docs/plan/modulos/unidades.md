# Unidades — Cadastro e Listagem

Contexto
- Endpoints: `POST /units`, `GET /units`, `GET /units/:id`, `PUT /units/:id`, `DELETE /units/:id`
- Regras: ADMIN pode ver todas as unidades; OWNER vê somente as da sua organização (backend filtra)

Telas
- Cadastro de Unidade (ADMIN): `[locale]/dashboard/units/register`
- Listagem de Unidades (ADMIN/OWNER): `[locale]/dashboard/units/(list)`
- Detalhe/Edição (opcional): `[locale]/dashboard/units/detail/[id]`

Tasks
1) API/Schema
   - [ ] Garantir `features/units/api.ts` com listagem paginada e mutações
   - [ ] Chaves React Query: `['units',{ q, page, perPage }]`
2) Cadastro
   - [ ] Form: Nome, Slug, Allows loan?, Loan monthly limit, Appointment future limit
   - [ ] Server Action para `POST /units`; validação Zod
   - [ ] Guard: somente ADMIN
3) Listagem
   - [ ] Tabela: Nome, Slug, Flags (loan), Ações
   - [ ] Filtros por nome/slug; paginação; empty state
   - [ ] Guard: ADMIN/OWNER (OWNER somente dados filtrados)
4) Edição
   - [ ] `PUT /units/:id` com campos editáveis
5) UX/Design
   - [ ] Seguir ui-layout-guidelines; toasts de sucesso/erro

Critérios de aceite
- ADMIN cadastra e vê todas as unidades; OWNER acessa listagem filtrada
- Validações e feedbacks consistentes; cache invalidado após mutações

Referências
- docs/tech/backend-endpoints.md (Unidades)
- src/features/units/{schemas.ts, api.ts}

