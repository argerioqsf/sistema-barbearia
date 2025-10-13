# Codex – Guideline Notes

- Sempre que implementar uma listagem/tela que possa ser reutilizada, prefira criar componentes globais antes de usar a solução local. Verifique se já existe algo em `src/components/organisms` ou `src/components/ui` que atenda ao padrão.
- Revisar `docs/ui-layout-guidelines.md` antes de montar telas para garantir consistência visual (uso de SectionHeader, PageCard, DataList etc.).
- Ao aplicar novas lógicas compartilháveis (ex.: listagens, toolbars, empty states), centralizar os componentes para reuso e evitar duplicação.
