# Planejamento e Diagnóstico — Modernização Arquitetural (Piloto POS)

Este documento consolida as definições da Etapa 1 do plano (Planejamento e diagnóstico) e serve de referência para a execução das próximas fases.

## Escopo e Premissas
- Escopo: modernização arquitetural de todo o projeto; POS será o piloto.
- Premissas: manter paridade funcional, migração incremental, foco em App Router (Next 13+), sem alterações disruptivas de backend.
- Responsável: único dev (autor do projeto); decisões registradas como log pessoal (ADR‑lite) neste repositório.

## Diagnóstico técnico por domínio (sumário)
- POS/Vendas
  - Principais artefatos atuais: `src/components/template/PointOfSale/*`, `src/hooks/use-pos.ts`, `src/actions/sale.ts`, `src/features/sales/*`, `src/features/saleItems/*`.
  - Dores: regras de negócio diluídas em hooks/UI; chamadas HTTP espalhadas; padrão de erro/estado inconsistente; pouca testabilidade.
  - Riscos: regressões em descontos/cálculo de totais; acoplamento a toasts nos hooks; mutações sem padronização de cache/invalidations.
- Produtos (`src/features/products/*`), Serviços (`src/features/services/*`), Planos (`src/features/plans/*`)
  - Funções de listagem e schemas isolados; integrações diretas com UI; faltam contratos modulados para consumo pelo POS.
- Clientes/Usuários (`src/features/users/*`, `src/actions/user`)
  - Padrões de request e erros variam; responsividade adequada, mas sem camadas que desacoplem domínio do transporte.
- Cupons/Descontos (`src/features/coupons/*`, `src/features/discounts/*`)
  - Regras de aplicação de cupom dispersas; cálculo final do total depende da API e de lógica no cliente.
- Agendamentos (`src/features/appointments/*`)
  - Listagem e seleção integradas ao POS; contratos podem ser formalizados para reduzir acoplamento com UI.

Observações gerais:
- Padrões de erro e `ReturnRequest` convivem com novos utilitários (`Result`, `normalizeError`).
- Carência de testes unitários/integrados para fluxos críticos do POS.
- Toaster e efeitos colaterais ocorrem dentro de hooks que também executam a regra de negócio.

## Blueprint arquitetural aprovado
- Estrutura por módulos de domínio: `src/modules/<domínio>` com as camadas:
  - `domain/`: modelos, value objects, serviços puros (sem React/HTTP).
  - `application/`: casos de uso (commands/queries), orquestram domínio e infraestrutura, retornam `Result`.
  - `infrastructure/`: adaptadores (HTTP/cache), dependem de APIs externas e implementam portas para `application`.
  - `ui/`: componentes/hooks específicos do domínio; client components concentram efeitos/UX, server components concentram dados/SSR.
  - `tests/`: testes do módulo (unit/integrados).
- Dependências permitidas (matriz simplificada):
  - `domain` → não depende de `application`, `infrastructure` ou `ui`.
  - `application` → depende de `domain` e de interfaces/ports da `infrastructure` (não de implementações concretas quando possível).
  - `infrastructure` → pode depender de libs externas, mas não de `ui`.
  - `ui` → depende de `application` (e tipos de `domain`), nunca acessando `infrastructure` diretamente.
- Convenções de nome e arquivos:
  - Casos de uso: `application/commands/<verbo-ação>.ts` e `application/queries/<consulta>.ts`.
  - Componentes client devem conter `use client` no topo e/ou sufixo claro no nome; server components sem sufixo.
  - Exports por camada via `index.ts` da pasta; exports do módulo via `src/modules/<domínio>/index.ts`.
- Erros e resultados:
  - Padrão `Result<T, NormalizedError>` no retorno dos casos de uso.
  - Normalização de erros com `normalizeError` e mapeamento consistente para UX (401 → `onUnauthorizedDefault`, 5xx → toast genérico).
- App Router first:
  - Leitura de dados em Server Components; mutações com Server Actions ou camadas server-side da `application`.
  - Invalidação por `revalidateTag`/`revalidatePath` onde aplicável e documentação de tags por caso de uso.

## Governança e rituais (trabalho individual)
- Log de decisões (ADR‑lite): registrar entradas breves por mudança relevante em `docs/adr/` (ex.: “2025‑09‑27‑app-router-first.md”).
- Cadência: revisão semanal do plano + atualização do backlog técnico; checkpoint pós‑piloto do POS.
- Versionamento/branches: apesar de trabalho solo, manter branches temáticos por feature/refactor; abrir PRs locais para revisão e histórico.

## Atualização de documentação base (planejada)
- README/GEMINI
  - Adicionar visão macro da arquitetura modular por domínio (resumo do blueprint acima).
  - Linkar para: `docs/plan/plano-melhoria-pos.md`, `docs/tech/app-router-guidelines.md` e este documento.
  - Criar seção “Como criar um novo módulo” referenciando `src/modules/_template`.

## Critérios de aceite da Etapa 1
- Diagnóstico dos domínios e dores principais capturado neste documento.
- Blueprint arquitetural aprovado e descrito (camadas, dependências, convenções, erros/Result, App Router first).
- Governança individual definida (ADR‑lite, cadência, branches, flags).
- Itens de atualização de documentação base listados para execução na próxima etapa.

## Anexo A — Mapa rápido dos diretórios relevantes
- POS/Vendas: `src/components/template/PointOfSale`, `src/hooks/use-pos.ts`, `src/actions/sale.ts`, `src/features/sales/*`, `src/features/saleItems/*`.
- Entidades correlatas: produtos (`src/features/products/*`), serviços (`src/features/services/*`), planos (`src/features/plans/*`), cupons (`src/features/coupons/*`), agendamentos (`src/features/appointments/*`), usuários (`src/features/users/*`).
- Módulo piloto criado: `src/modules/sales-pos/*` (domínio, casos de uso, gateway HTTP, hook `useSalesPos`).
- Utilitários compartilhados: `src/shared/result.ts`, `src/shared/errors/*`, `src/shared/logger.ts`, `src/shared/metrics.ts`.
- Diretrizes App Router: `docs/tech/app-router-guidelines.md`.

## Próximos passos imediatos
- Executar etapa 2 (Infraestrutura compartilhada): padronizar camada HTTP e contratos de ports; avaliar estratégia de estado assíncrono.
- Iniciar etapa 3 (Piloto POS): migrar UI para consumir a `application` do módulo, cobrindo o fluxo end‑to‑end com testes mínimos.
