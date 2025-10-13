# Cupons — Cadastro e Listagem

Contexto
- Endpoints: `POST /coupons`, `GET /coupons`, `GET /coupons/:id`, `PATCH /coupons/:id`, `DELETE /coupons/:id`
- Campos: `code`, `description?`, `discount(number)`, `discountType ('PERCENTAGE'|'VALUE')`, `imageUrl?`, `quantity?`
- Status atual: v1 existente — migrar para novo layout

Telas
- Cadastro de Cupom: `[locale]/dashboard/coupons/register`
- Listagem de Cupons: `[locale]/dashboard/coupons/(list)`
- Detalhe/Edição: `[locale]/dashboard/coupons/detail/[id]`

Tasks
1) API/Schema
   - [ ] Revisar `features/coupons/{schemas.ts, api.ts}` e normalizar contratos (list paginada)
   - [ ] Chaves React Query: `['coupons',{ q, page, perPage }]`
2) Cadastro/Edição
   - [ ] Form com validação Zod; dicas visuais para tipos de desconto
   - [ ] Server Actions para create/update
3) Listagem
   - [ ] Tabela: Código, Tipo, Desconto, Quantidade, Ações
   - [ ] Filtros por código/tipo; paginação
4) UX/Design
   - [ ] Migrar para ui-layout-guidelines (SectionHeader, Cards, DataTable, Empty/Loading)

Critérios de aceite
- CRUD funcional com feedbacks e invalidação de cache
- UI alinhada com novo padrão visual

Referências
- docs/tech/backend-endpoints.md (Cupons)
- src/features/coupons/{schemas.ts, api.ts}

