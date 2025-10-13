# Organizações — Criação e Listagem

Contexto
- Endpoints: `POST /organizations`, `GET /organizations`, `GET /organizations/:id`, `PATCH /organizations/:id`, `DELETE /organizations/:id`
- Regras sugeridas: criação apenas para ADMIN; listagem para ADMIN e OWNER (OWNER limitado à sua organização, se aplicável)

Telas
- Criação de Organização (ADMIN): `[locale]/dashboard/organizations/register`
- Listagem de Organizações (ADMIN/OWNER): `[locale]/dashboard/organizations/(list)`
- Detalhe/Edição: `[locale]/dashboard/organizations/detail/[id]`

Tasks
1) API/Schema
   - [ ] Implementar/ajustar clients em `features/organization/api.ts` (separado de `src/actions/organization.ts`)
   - [ ] Chaves React Query: `['organizations',{ q, page, perPage }]`
2) Cadastro/Edição
   - [ ] Form: Nome, Slug
   - [ ] Server Actions para create/update
3) Listagem
   - [ ] Tabela: Nome, Slug, Ações
   - [ ] Filtros; paginação
4) Acesso
   - [ ] Guard de rotas por role (ADMIN para create; ADMIN/OWNER para list)
5) UX/Design
   - [ ] Seguir ui-layout-guidelines; feedbacks padronizados

Critérios de aceite
- ADMIN cria/edita organizações
- Listagem paginada com filtros e ações
- Contratos alinhados ao backend-endpoints

Referências
- docs/tech/backend-endpoints.md (Organizações)
- src/actions/organization.ts (legado) — migrar para client em `features/organization/api.ts`

