# Planos — Cadastro e Listagem

Contexto
- Endpoints: `POST /plans`, `GET /plans`, `GET /plans/:id`, `PATCH /plans/:id`, `DELETE /plans/:id`
- Campos: `name`, `price`, `typeRecurrenceId`, `benefitIds[]`

Telas
- Cadastro de Plano: `[locale]/dashboard/plans/register`
- Listagem de Planos: `[locale]/dashboard/plans/(list)`
- Detalhe/Edição: `[locale]/dashboard/plans/detail/[id]`

Tasks
1) API/Schema
   - [ ] Validar `features/plans/{api.ts, schema.ts}` (ajustar list paginada se necessário)
   - [ ] Chaves React Query: `['plans',{ q, page, perPage }]`
2) Cadastro/Edição
   - [ ] Form: Nome, Preço, Recorrência (select), Benefícios (multi-select)
   - [ ] Server Actions para create/update
3) Listagem
   - [ ] Tabela: Nome, Preço, Recorrência, Ações
   - [ ] Filtros; paginação
4) Integrações
   - [ ] Hooks: `useBenefitsOptions`, `useTypeRecurrencesOptions`
5) UX/Design
   - [ ] Seguir ui-layout-guidelines; feedbacks padronizados

Critérios de aceite
- CRUD completo com validações
- Integração com benefícios/recorrências

Referências
- docs/tech/backend-endpoints.md (Planos/Tipos de recorrência)
- src/features/plans/{api.ts, schema.ts}

