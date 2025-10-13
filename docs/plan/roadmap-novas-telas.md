# Roadmap — Novas Telas e Fluxos (Execução)

Este plano organiza, por módulo, as próximas adições ao projeto, com foco em:
- Aderência ao contrato do backend (docs/tech/backend-endpoints.md)
- Padrão visual e UX consistente (docs/ui-layout-guidelines.md)
- Aproveitamento de `features/*` existentes, React Query para listagens e Server Actions para mutações
- Controle de acesso por role/permission (ADMIN, OWNER, MANAGER, BARBER)

Arquivos por módulo (detalhamento de tasks)
- docs/plan/modulos/produtos.md
- docs/plan/modulos/servicos.md
- docs/plan/modulos/usuarios.md
- docs/plan/modulos/unidades.md
- docs/plan/modulos/sessao-unidade.md
- docs/plan/modulos/cupons.md
- docs/plan/modulos/planos.md
- docs/plan/modulos/beneficios.md
- docs/plan/modulos/categorias.md
- docs/plan/modulos/organizacoes.md

Ordem sugerida de execução (dependências primeiro)
1) Sessão/Seleção de Unidade (obrigatória pós-login)
2) Categorias (suporte a produtos/serviços)
3) Produtos (cadastro e estoque)
4) Serviços (cadastro/listagem)
5) Usuários (cadastro/listagem + fluxo BARBER)
6) Unidades (cadastro/listagem)
7) Cupons (cadastro/listagem)
8) Benefícios (cadastro/listagem)
9) Planos (cadastro/listagem)
10) Organizações (rota de criação + listagem)

Padrões técnicos e de UX
- App Router first; dados em Server Components; mutações com Server Actions finas quando envolver `FormData`; listagens com React Query
- Componentização: cabeçalho de seção, ações primárias/secundárias, barras de filtros, tabela responsiva, drawers e modais conforme guidelines
- Acesso: usar `verifyPageRole.ts` e `checkUserPermissions.ts` onde aplicável
- Cache/invalidação: padronizar chaves por domínio e invalidar após mutações

Milestones
- M0: Base de navegação + Seleção de Unidade obrigatória
- M1: Catálogos-base (Categorias) e Produtos (cadastro/estoque)
- M2: Serviços + Usuários (inclui fluxo BARBER)
- M3: Unidades + Cupons
- M4: Benefícios + Planos
- M5: Organizações e refinamentos finais

Riscos/pendências conhecidas
- Vínculo serviços/produtos ↔ BARBER: validar payload final via profile endpoints (barberServices/barberProducts)
- Divergências pontuais de rotas legadas vs. docs/tech/backend-endpoints.md: ajustar clients em `features/*/api.ts` conforme necessário

Critérios gerais de aceite
- Telas seguem ui-layout-guidelines: grid, espaçamentos, botões, tabelas, feedbacks de loading/empty/error
- Integração com endpoints conforme documentação; erros normalizados em toasts
- Regras de acesso/visibilidade respeitadas por role
- Navegação coerente no menu com rotas e breadcrumbs
- Progresso atual
- [x] M0 — Seleção de Unidade: seletor no header (`NavBar`) para ADMIN/OWNER, server action `changeActiveUnit` (PATCH `/sessions/unit`) retornando token, `useSession().update` e refresh do dashboard.
- [x] Categorias — rotas de listagem/registro/detalhe conectadas às templates existentes.
- [x] Produtos — listagem no novo padrão DataList/DataTable.
- [x] Serviços — listagem refatorada (DataList + ações).

---
### 11. Tela de Retirada de Valores

- **Status:** A fazer
- **Módulo:** `withdrawals` (novo)
- **Permissões:** `OWNER`, `MANAGER` (requer `MANAGE_USER_TRANSACTION_WITHDRAWAL`)

**Descrição do Fluxo:**
Tela para registrar saídas de dinheiro do caixa da unidade ou de um colaborador específico. O layout seguirá o padrão de duas colunas (`ui-layout-guidelines.md`).

- **Coluna Esquerda (Formulário):**
  - **Tipo de Retirada:** `RadioGroup` para selecionar "Da Unidade" ou "De Colaborador".
  - **Seleção:** Se "Colaborador", um `ComboBox` buscará e listará os usuários da unidade.
  - **Valores:** `Input` para o valor da retirada, `Textarea` para a descrição e um `Input type="file"` para o comprovante (`receipt`).
  - **Ação:** O `SectionHeader` conterá o botão "Confirmar Retirada", que submeterá o formulário via Server Action.

- **Coluna Direita (Resumo):**
  - Um `PageCard` exibirá o saldo atual (da unidade ou do colaborador selecionado).
  - Mostrará o impacto da retirada, calculando o "Saldo Final".

**Padrões Técnicos:**
- **Endpoint:** `POST /withdrawal/transactions` (via `multipart/form-data`).
- **UI:** `PageCard`, `SectionHeader`, `RadioGroup`, `ComboBox`.
- **Lógica:** Server Action para a mutação, processando `FormData`. Validação via Zod. React Query (`useQuery`) para buscar a lista de colaboradores e saldos.
- **Feedback:** `useToast` para notificações de sucesso/erro e invalidação de queries de saldo.

