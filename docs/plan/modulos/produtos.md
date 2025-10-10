# Produtos — Cadastro e Estoque

Contexto
- Endpoints: `POST /products` (multipart), `GET /products`, `GET /products/:id`, `PATCH /products/:id`, `DELETE /products/:id`
- Campos: `image (file)`, `name`, `description?`, `quantity?`, `cost`, `price`, `commissionPercentage?`, `categoryId`

Telas
- Cadastro de Produto: `[locale]/dashboard/products/register`
- Estoque (Listagem): `[locale]/dashboard/products/(list)`
- Edição Detalhe (opcional): `[locale]/dashboard/products/detail/[id]`

Tasks
1) API/Schema
   - [x] Revisar/ajustar `features/products/{schemas.ts, api.ts}` para suportar multipart (FormData)
   - [ ] Chaves React Query: `['products', { q, page, perPage }]`
2) Cadastro (Form)
   - [x] Form com upload de imagem (com preview), Nome, Descrição, Quantidade, Custo, Preço, Comissão (%), Categoria (select)
   - [x] Validação com Zod; máscaras/números conforme guideline
   - [x] Server Action: monta `FormData` e chama `POST /products`
   - [x] Redirect para detalhe ou listagem; invalidar cache
3) Estoque (Listagem)
   - [x] Tabela: Imagem, Nome, Categoria, Quantidade, Preço, Ações (Editar/Excluir)
   - [x] Filtros: `name`; paginação; estados de loading/empty/error
   - [x] Ação de excluir via diálogo de confirmação (`DELETE /products/:id`)
4) Edição
   - [x] Form semelhante ao cadastro; `PATCH /products/:id`
5) UX/Design
   - [x] Usar SectionHeader, Cards e DataTable conforme ui-layout-guidelines (lista)
   - [x] Toaster para sucesso/erro (actions client-side)
6) Integrações cruzadas
   - [ ] Consumir `useCategoriesOptions()` (módulo Categorias)

Critérios de aceite
- Cadastro com validações e upload funcional
- Listagem com busca, paginação e ações
- Edição e exclusão com feedback e invalidação de cache

Referências
- docs/tech/backend-endpoints.md (Produtos)
- src/features/products/{schemas.ts, api.ts}
