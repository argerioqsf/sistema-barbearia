# Benefícios — Cadastro e Listagem

Contexto
- Endpoints: `POST /benefits`, `GET /benefits`, `GET /benefits/:id`, `PATCH /benefits/:id`, `DELETE /benefits/:id`
- Campos: `name`, `description?`, `discount(number)`, `discountType ('PERCENTAGE'|'VALUE')`, `categories?[]`, `services?[]`, `products?[]`, `plans?[]`

Telas
- Cadastro de Benefício: `[locale]/dashboard/benefits/register`
- Listagem de Benefícios: `[locale]/dashboard/benefits/(list)`
- Detalhe/Edição: `[locale]/dashboard/benefits/detail/[id]`

Tasks
1) API/Schema
   - [ ] Implementar `features/benefits/api.ts` seguindo schemas existentes
   - [ ] Chaves React Query: `['benefits',{ q, page, perPage }]`
2) Cadastro/Edição
   - [ ] Form com validação Zod; seleção múltipla de categorias/serviços/produtos/planos
   - [ ] Server Actions para create/update
3) Listagem
   - [ ] Tabela: Nome, Tipo de Desconto, Valor, Ações
   - [ ] Filtros; paginação; empty/loading states
4) Integrações
   - [ ] Utilizar hooks de opções: `useCategoriesOptions`, `useServicesOptions`, `useProductsOptions`, `usePlansOptions`
5) UX/Design
   - [ ] Seguir ui-layout-guidelines e padrões de feedback

Critérios de aceite
- CRUD funcional, com filtros e paginação
- Seletores múltiplos integrados com catálogos existentes

Referências
- docs/tech/backend-endpoints.md (Benefícios)
- src/features/benefits/schema.ts

