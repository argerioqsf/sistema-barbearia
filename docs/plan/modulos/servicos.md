# Serviços — Cadastro e Listagem

Contexto
- Endpoints (v1): `POST /create/service`, `GET /services` (e detalhe se disponível)
- Schemas atuais: ver `features/services/schemas.ts` (campos: name, description, imageUrl, cost, price, defaultTime, commissionPercentage?, categoryId, unitId)

Telas
- Cadastro de Serviço: `[locale]/dashboard/services/register`
- Listagem de Serviços: `[locale]/dashboard/services/(list)`
- Edição Detalhe (opcional): `[locale]/dashboard/services/detail/[id]`

Tasks
1) API/Schema
   - [x] Garantir `features/services/api.ts` com listagem paginada (ajuste de contrato `services`)
   - [ ] Chaves React Query: `['services', { q, categoryId, page, perPage }]`
2) Cadastro
   - [x] Form com: Nome, Descrição, Custo, Preço, Tempo padrão (min), Comissão (%), Categoria (select), Upload de imagem (se aplicável)
   - [x] Server Action para create; validação Zod
3) Listagem
   - [x] Tabela: Nome, Categoria, Preço, Tempo, Ações (DataListTable)
   - [x] Filtros: busca por nome; paginação reutilizando DataListPagination
4) Edição
   - [x] Form igual ao cadastro; `PATCH`/`PUT` conforme disponível
5) UX/Design
   - [x] Seguir ui-layout-guidelines; toasts padronizados (listagem)
6) Integrações
   - [ ] Consumir `useCategoriesOptions()`

Critérios de aceite
- Cadastro/edição com validações e feedback visual
- Listagem com filtros e paginação
- Campos e tipos alinhados ao schema/contrato

Referências
- docs/tech/backend-endpoints.md (Serviços)
- src/features/services/{schemas.ts, api.ts}
