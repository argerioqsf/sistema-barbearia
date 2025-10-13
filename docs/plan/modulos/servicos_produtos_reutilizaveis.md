# Componentes Reutilizáveis — Base para Listas e Cadastros

Objetivo
- Maximizar reuso e consistência visual nas telas novas, seguindo docs/ui-layout-guidelines.md

Tasks (cross-cutting)
- [ ] `SectionHeader` padronizado com ações à direita e breadcrumbs (reaproveitar `src/components/ui/section-header.tsx` se aderente)
- [ ] `DataTable` com:
     - Paginação controlada, busca (debounced), estados empty/loading/error
     - Slots para colunas customizadas (ex.: avatar/imagem)
- [ ] `FiltersBar` com select/inputs e estado controlado por URL (searchParams)
- [ ] `FormPage` com `Card`, `FormSection`, `FormActions` (Salvar/Cancelar)
- [ ] `EntityPicker` (modal/drawer) para seleção de Serviços/Produtos com paginação
- [ ] Hooks utilitários: `usePaginatedQueryKeys(domain)`, `useDebouncedSearch()`

Aplicação
- Produtos: Estoque (DataTable), Cadastro (FormPage + EntityPicker Categoria)
- Serviços: List (DataTable), Cadastro (FormPage)
- Usuários (BARBER): Abas com EntityPicker de Serviços/Produtos
- Benefícios/Planos: Multi-select assistidos por EntityPicker

