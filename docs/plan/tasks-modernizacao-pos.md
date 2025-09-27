# Tasks — Modernização Arquitetural (Piloto POS)

Este arquivo concentra o backlog executável. As explicações de arquitetura e planejamento ficam em documentos separados.

## 1. Planejamento e diagnóstico
- [ ] Consolidar diagnóstico técnico dos domínios (POS, Vendas, Clientes, Produtos, etc.)
- [ ] Aprovar blueprint arquitetural (camadas, convenções e dependências)
- [ ] Definir governança individual (ADRs, cadência, branches, flags)
- [ ] Atualizar README/GEMINI com visão macro e links de referência

## 2. Infraestrutura compartilhada e tooling
- [ ] Criar estrutura `src/modules` com blueprint e README interno
- [ ] Implementar utilitários comuns (Result, erros, logger, métricas)
- [ ] Padronizar camada HTTP (client, interceptors, retries, mapeamento de erros)
- [ ] Definir estratégia oficial de estado assíncrono (context/store/query) e wrappers
- [ ] Publicar guidelines do App Router (Server Components, Actions, revalidação, cache)

## 3. Piloto — Fluxo Sale/POS
- [ ] Inventariar endpoints e regras de negócio (create sale, add item, coupon, pay, etc.)
- [ ] Planejar migração incremental (feature flag/fallback)
- [ ] Implementar domínio `sales-pos` (modelos, serviços puros)
- [ ] Escrever casos de uso (CreateSale, AddItem, ApplyCoupon, PaySale, …) com testes unitários
- [ ] Criar gateways de infraestrutura (HTTP/adapters) consumidos pela camada de aplicação
- [ ] Criar store/hooks do POS no módulo e migrar componentes para a nova API
- [ ] Validar integrações adjacentes (clientes, planos, appointments)
- [ ] Construir testes de integração/e2e do fluxo POS e integrar à pipeline

## 4. Rollout para demais domínios
- [ ] Selecionar próximo domínio (agendamentos/produtos) e repetir scaffold
- [ ] Migrar gradualmente actions/hooks legados para casos de uso por módulo
- [ ] Criar playbook de migração (checklist + anti-patterns)

## 5. Observabilidade, qualidade e governança
- [ ] Definir KPIs técnicos (cobertura crítica, MTTR, taxa de erro)
- [ ] Instrumentar logs e métricas padronizados
- [ ] Padronizar toasts/notificações em client hooks
- [ ] Estabelecer rotina de revisão arquitetural e atualizar docs

