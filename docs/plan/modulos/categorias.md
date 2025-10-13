# Categorias — Cadastro e Listagem

Contexto
- Suporte a Produtos e Serviços.
- Endpoints: `POST /categories`, `GET /categories`, `PATCH /categories/:id`.

Telas
- Listagem de Categorias: `[locale]/dashboard/categories/(list)`
- Cadastro/Edição de Categoria: `[locale]/dashboard/categories/register` e `.../detail/[id]` (opcional)

Tasks
1) API Client
   - [x] Garantir `features/categories/api.ts` com listagem paginada e mutate (create/update)
   - [ ] Chaves React Query: `['categories', { q, page, perPage }]` (padronizar v2)
2) Listagem
   - [x] Página `(list)` criada e integrada a template existente
   - [ ] Validar colunas/filtros e empty state no novo padrão
3) Cadastro/Edição
   - [x] Páginas `register` e `detail/[id]` conectadas
   - [ ] Validar Zod/Toasts/Redirecionamento conforme guidelines
4) Integração cruzada
   - [ ] Expor hook `useCategoriesOptions()` para selects de Produtos/Serviços
5) UX/Design
   - [ ] Seguir ui-layout-guidelines: SectionHeader, Buttons, Card/Form

Critérios de aceite
- Criar/editar/listar categorias com feedbacks e validações
- Listagem com busca e paginação funcionais
- Select reutilizável disponível para outros módulos

Referências
- docs/tech/backend-endpoints.md (Categorias)
- src/features/categories/{schemas.ts, api.ts}
