# Tasks — Modernização Arquitetural (Piloto POS)

Este arquivo concentra o backlog executável. As explicações de arquitetura e planejamento ficam em documentos separados.

## 1. Planejamento e diagnóstico
- [x] Consolidar diagnóstico técnico dos domínios (POS, Vendas, Clientes, Produtos, etc.)
- [x] Aprovar blueprint arquitetural (camadas, convenções e dependências)
- [x] Definir governança individual (ADRs, cadência, branches, flags)
- [x] Atualizar README/GEMINI com visão macro e links de referência

## 2. Infraestrutura compartilhada e tooling
- [x] Criar estrutura `src/modules` com blueprint e README interno
- [x] Implementar utilitários comuns (Result, erros, logger, métricas)
- [x] Padronizar camada HTTP (client, interceptors, retries, mapeamento de erros)
- [x] Definir estratégia oficial de estado assíncrono (context/store/query) e wrappers
- [x] Publicar guidelines do App Router (Server Components, Actions, revalidação, cache)

### 2.1 Cache/estado no client — React Query + Executor
- [x] Adicionar e configurar React Query Provider no layout root (apenas client layer)
- [x] Criar adapter de `queryFn`/`mutationFn` para casos de uso (Result → data/throw NormalizedError)
- [x] Definir convenção de query keys por domínio (ex.: `['products',{ q, page, perPage }]`)
- [x] Habilitar DevTools em desenvolvimento e registrar boas práticas no README/Docs
- [x] ADR: formalizar decisão de usar React Query junto ao executor simples

## 3. Piloto — Fluxo Sale/POS
- [x] Inventariar endpoints e regras de negócio (create sale, add item, coupon, pay, etc.)
- [x] Planejar migração incremental (feature flag/fallback)
- [x] Implementar domínio `sales-pos` (modelos, serviços puros)
- [x] Escrever casos de uso (CreateSale, AddItem, ApplyCoupon, PaySale, …) com testes unitários
- [x] Criar gateways de infraestrutura (HTTP/adapters) consumidos pela camada de aplicação
- [x] Criar store/hooks do POS no módulo e migrar componentes para a nova API
- [x] Migrar seletor do POS (produtos/serviços/cupons/planos) para React Query com cache por filtros
- [x] Padronizar invalidação pós-mutações (mapear chaves de cache e tags relacionadas)
- [x] Definir e aplicar chaves de invalidation para ações do POS (ex.: pagar venda → invalidar `['sales', saleId]` e listas relacionadas)
- [x] Validar integrações adjacentes (clientes, planos, appointments)
- [x] Construir testes de integração/e2e do fluxo POS e integrar à pipeline *(Vitest testes de domínio + utilitários; e2e completo ficará no backlog para Playwright)*

### 3.x DDD‑lite no POS (Ports/DTO/Mappers/VO)
- [x] Criar `application/ports/SalesPosGatewayPort` e adaptar o gateway atual para implementar a Port
- [x] Adicionar `application/dto/*` com Zod (create-sale, add-item, apply-coupon, update-item, update-client, pay-sale)
- [x] Introduzir `infrastructure/mappers/*` (sale.api-mapper.ts, sale-item.api-mapper.ts) para isolar formato da API
- [x] Renomear `domain/models` → `domain/entities` e mover tipagens correspondentes
- [x] Criar `domain/value-objects/*` (money.ts, percentage.ts, sale-status.ts) e usar onde fizer sentido
- [x] Ajustar casos de uso para consumir Ports + DTOs e retornar Result consistente
- [x] Testes de use cases com fakes das Ports (create-sale, apply-coupon) e de mappers (API ↔ domínio)
- [ ] Server Actions finas (quando houver FormData) fazendo: Request → DTO → Use Case
- [x] ADR: formalizar adoção de Ports + DTO + Mappers + VOs no POS

### 3.y Saneamento de Tipagem (Typecheck)
- Quick wins (alto impacto)
  - [x] Corrigir narrowing de `status` em `src/app/api/pos/utils.ts` (usar fallback por tipo quando ausente)
  - [x] Tornar `src/shared/http-client.ts` permissivo em `init.next` (repasse transparente; evitar conflito de tipos do Next)
  - [x] Corrigir chamada em `src/components/template/ListProducts/index.tsx:27` (usar `listProductsPaginated('1', { name })` ou ajustar assinatura de `listProducts`)
  - [x] Adicionar guards para `profile` e tipar `unit` em `src/components/template/ProfileDetail/index.tsx` (remover `any` implícito)
  - [x] Ajustar campos inválidos das templates (Coupons/Services) para usar chaves válidas dos schemas (`discountValue`/`active` → corrigir)
  - [x] Resolver import quebrado `src/app/[locale]/dashboard/sales/register/page.tsx` (remover página ou ajustar import de `RegisterSales`)
- NormalizedError legado → novo
  - [x] Criar helper `toNormalizedError(message: string, status?: number)` e padronizar retorno em `src/actions/*`
  - [x] Substituir `error: { request: ... }` por `error: toNormalizedError(...)` nas actions legadas mais usadas
  - [x] Atualizar UIs que leem `error.request` para consumir `error.message`
- QueryParams genéricos
  - [x] Ajustar assinaturas em `src/features/*/api.ts` para `where?: QueryParams<T>` (ou `<T, true>` quando `withCount`)
  - [x] Atualizar chamadas em `src/actions/*` informando generics corretos (ex.: `QueryParams<ZService>`)
- FormData × JSON
  - [x] Para rotas JSON: transformar `FormData` via `Object.fromEntries(formData)` em `Record<string, unknown>` e ajustar headers
  - [x] Para rotas multipart: manter `FormData` e remover `Content-Type: application/json`
  - [x] Corrigir pontos em `src/actions/appointment.ts`, `src/actions/debt.ts`, `src/actions/barber.ts` (e similares)
- UI e assinaturas adicionais
  - [x] `DetailUsers/index.tsx`: ajustar uso de `ReturnRequest` (checar `.ok` e acessar `data`/`error` coerentemente)
  - [ ] Tipar parâmetros/props faltantes e remover `any` implícitos
- Validação
  - [x] Rodar `npm run typecheck` e abrir subitens por domínio para erros remanescentes (leads, coupons, services, etc.)

### 3.z Entidades POS (Sale/SaleItem)
- Entidades e VOs
  - [x] Criar entidade `SaleItem` (classe) utilizando VOs (`Money`, `Percentage`)
    - [x] Campos: `id`, `quantity`, `price: Money`, `customPrice?: Money`, `discounts`, refs (`productId|serviceId|planId|appointmentId`, `barberId?`)
    - [x] Métodos: `unitPriceFromCatalog()`, `effectiveUnitPrice()`, `lineTotal()` implementados; `applyCoupon()` [depriorizado — regra complexa ficará no backend]; validações básicas ok (quantidade mínima, preço não negativo)
  - [x] Evoluir entidade `Sale` (classe) desacoplada dos DTOs da API
    - [x] Campos: `id`, `status: SaleStatus`, `clientId`, `observation?`, `items: SaleItem[]`
    - [x] Métodos: `totals()` e `canPay()` prontos; `addItem`, `removeItem`, `updateItemQuantity`, `updateItemCustomPrice`, `applyCouponToItem` implementados com validações leves (regras complexas seguem no backend)
- Serviços/mapeamento
  - [x] Mover totalização para o domínio (serviço agora delega para `Sale.totals()`)
  - [x] Atualizar mapeadores `infrastructure/mappers/*` para converter `ZSale`/`ZSaleItems` → entidades + VOs
  - [x] (Opcional) Mapeamento de volta domínio → API exposto via `Sale.toDTO()`
- Gateway e casos de uso
  - [x] Atualizar `SalesPosGateway` para retornar entidades mapeadas (removido pass-through)
  - [ ] Ajustar use cases para invocar invariantes leves do domínio (sem replicar regras complexas) e continuar retornando `SaleDTO`; backend permanece como fonte da verdade
- UI/hooks e utilitários
  - [ ] Adaptar `useSale` e componentes para consumir `Sale` enriquecida [depriorizado — manter `SaleDTO` no client por serialização/cache]
  - [x] Deprecar `src/utils/saleItems.ts` em favor de métodos de `SaleItem` (ou criar adaptador temporário) — util removido; componentes usam entidade/adaptadores
- Compatibilidade e factories
  - [x] Garantir compatibilidade de shape no mapper (preservados campos lidos pela UI atual)
  - [x] Adicionar factories estáticas (`Sale.create`/`SaleItem.create`) centralizando validações e facilitando testes
- Testes e docs
  - [x] Tests de unidade adicionais para `SaleItem`/`Sale` (preço efetivo, descontos, comissões, totais)
  - [x] Atualizar testes de mappers e de totalização
  - [x] ADR curto formalizando "Entidades de domínio independentes dos DTOs da API" no POS

### 3.w Extração do Domínio Sales (Core)
- Repositório e pastas
  - [x] Criar módulo `src/modules/sales` (core do domínio de Vendas)
  - [x] Mover `domain/entities` (Sale, SaleItem) para `modules/sales/domain/entities`
  - [x] Mover `domain/value-objects/sale-status.ts` para `modules/sales/domain/value-objects`
  - [x] Mover `Money` para `src/shared/domain/value-objects`
  - [x] Mover mapeadores `sale.mapper.ts` e `sale-item.mapper.ts` para `modules/sales/infrastructure/mappers`
  - [x] Mover gateway HTTP de vendas do POS para `modules/sales/infrastructure/http` (renomear para `SalesGateway`)
  - [x] Mover casos de uso genéricos de vendas (get-sale, add/remove item, update-item*, apply/remove coupon, update-client, pay-sale) para `modules/sales/application`
- Dependências e imports
  - [x] Ajustar imports do POS para consumir `@/modules/sales/...` (entidades, mappers, gateway e use cases)
  - [x] Garantir dependência unidirecional: `sales-pos` → `sales` (sem import reverso)
  - [x] Atualizar barrels/exports (`modules/sales-pos/ui/index.ts`, etc.)
- API Routes / Cache
  - [x] Atualizar API Routes do POS para chamar use cases em `modules/sales/application` (mantendo DTO como resposta)
  - [x] Revisar e confirmar invalidação de cache (query keys) após as mutações
- UI
  - [x] Manter componentes específicos do PDV em `modules/sales-pos/ui/components`
  - [x] (Quando necessário) mover telas administrativas de vendas (List/Detail/Reports) para `modules/sales/ui` *(avaliado: nenhuma tela demandou migração nesta etapa)*
- Testes e docs
  - [x] Atualizar testes (mappers, totalização e use cases) para o novo módulo `sales`
  - [x] Rodar `npm run typecheck` e suites de testes
  - [x] Atualizar ADRs/README do módulo com convenções de dependência e organização
- Migração incremental / compatibilidade
  - [x] Adicionar reexports temporários em `sales-pos` apontando para `sales` (para evitar churn durante a migração)
  - [x] Garantir que o Tailwind `content` inclua `./src/modules/sales/**/*` (evitar purge em estilos da UI do módulo)


### 3.aa Refatoração da Camada de Dados do POS para Server Actions (Rota A — incremental, com TODOs de migração por domínio)

Objetivo: remover a camada HTTP intermediária do POS (`sale-operations.ts`, `get-catalog.ts` e rotas `app/api/pos/**`) entre a UI (hooks do POS) e a lógica de domínio. Os hooks passarão a consumir diretamente Server Actions que retornam `Result<T, NormalizedError>`, adaptadas ao React Query via helpers existentes.

Observação: seguiremos a Rota A (incremental). As Server Actions de Catálogo serão criadas dentro de `sales-pos` (1 arquivo por recurso) com TODO explícito para migração futura aos módulos de domínio (products/services/plans/appointments/clients/barbers).

**Arquivos a serem eliminados ao final:**
- `src/modules/sales-pos/application/commands/sale-operations.ts`
- `src/modules/sales-pos/application/queries/get-catalog.ts`
- Todas as API Routes em `src/app/api/pos/**` (inclui `src/app/api/pos/utils.ts`)

**Hooks a serem refatorados:**
- `src/modules/sales-pos/ui/hooks/useSale.ts`
- `src/modules/sales-pos/ui/hooks/useCreateSale.ts`
- `src/modules/sales-pos/ui/hooks/useCatalog.ts`

**Plano de Ação (refinado):**

- [x] Passo 0 — Confirmar adaptadores de React Query
  - [x] Reutilizar `makeQueryFn` e `makeMutationFn` de `src/shared/react-query-adapter.ts` (não criar novo adaptador).

- [x] Passo 1 — Criar Server Actions de Catálogo (Rota A, 1 arquivo por recurso)
  - [x] Criar diretório `src/modules/sales-pos/application/queries/catalog/`
  - [x] Criar as actions com `'use server'`, retornando `Result<{ items, count?, page?, perPage? }, NormalizedError>` e consumindo `features/*/api`:
    - [x] `get-products.ts` → `export async function getProductsCatalog({ search? }: { search?: string })`
    - [x] `get-services.ts` → `export async function getServicesCatalog({ search? }: { search?: string })`
    - [x] `get-plans.ts` → `export async function getPlansCatalog({ search? }: { search?: string })`
    - [x] `get-appointments.ts` → `export async function getAppointmentsCatalog({ date? }: { date?: string })`
    - [x] `get-clients.ts` → `export async function getClientsCatalog({ search? }: { search?: string })`
    - [x] `get-barbers.ts` → `export async function getBarbersCatalog()`
  - [x] Normalizar erros via `normalizeError` e encapsular em `Result`
  - [x] Validar payloads quando aplicável (ex.: `BarberSchema.parse` nos itens de barbeiros)
  - [x] TODO em cada arquivo: “Migrar para o respectivo módulo de domínio futuramente (ex.: `src/modules/products/application/queries/list-products.ts`)”

- [x] Passo 2 — Refatorar Hooks de Catálogo (`useCatalog.ts`)
  - [x] Atualizar imports para as novas actions em `sales-pos/application/queries/catalog/*`
  - [x] Substituir `queryFn` para usar `makeQueryFn(() => getXxxCatalog(params))`
  - [x] Manter chaves de cache atuais (ex.: `qk.products.list({ q: search })`)
  - [x] Remover dependência de `get-catalog.ts`

- [x] Passo 3 — Refatorar Hooks de Venda (`useSale.ts`, `useCreateSale.ts`)
  - [x] Atualizar `queryFn`/`mutationFn` para chamar diretamente `@/modules/sales/application` com `makeQueryFn`/`makeMutationFn`
  - [x] Mapeamento real dos nomes (sem sufixo “Action”):
    - [x] `createSaleRequest` (em `useCreateSale`) → `createSale`
    - [x] `fetchSaleById` (em `useSale`) → `getSale`
    - [x] `addSaleItem` → `addItem`
    - [x] `removeSaleItem` → `removeItem`
    - [x] `updateSaleClient*` → `updateClient`
    - [x] `applySaleCoupon` → `applyCoupon`
    - [x] `removeSaleCoupon` → `removeCoupon`
    - [x] `paySaleRequest` → `paySale`
    - [x] `updateSaleItemCoupon|Quantity|CustomPrice|Barber` → equivalentes em `update-sale-item.ts`
  - [x] Invalidação de cache: `qk.sales.byId(saleId)` após mutações
  - [ ] (Opcional) preparar Optimistic Updates conforme TODO já descrito no hook - ( deixar para o fim de tudo e me pergunte antes se eu vou querer implementar esse item, nao implmentar esse item sem me perguntar antes se eu vou querer!! )

- [x] Passo 4 — Limpeza Final (Cleanup)
  - [x] Remover `src/modules/sales-pos/application/commands/sale-operations.ts`
  - [x] Remover `src/modules/sales-pos/application/queries/get-catalog.ts`
  - [x] Remover as rotas `src/app/api/pos/**` e `src/app/api/pos/utils.ts` (as ações passam a ser chamadas diretamente)
  - [x] Observação: a rota `/api/pos/catalog/clients` não existe hoje; a Server Action `getClientsCatalog` substituirá essa dependência

- [x] Passo 5 — Tratamento de erros e autenticação
  - [x] Garantir toasts consistentes em `onError`/`onSuccess`
  - [x] (Opcional) Para erros 401, usar `handleUnauthorized` (`src/shared/auth/handleUnauthorized.ts`) nos `onError` dos hooks

- [x] Passo 6 — Tipos, cache e compatibilidade
  - [x] Manter tipos de saída compatíveis com a UI (ex.: `GetSaleOutput['sale']` / `SaleDTO`)
  - [x] Manter `queryKey`s estáveis (`qk/*`) e filtros serializáveis
  - [x] Confirmar que o cache SSR dos `features/*/api` (revalidate/tags) permanece efetivo dentro das Server Actions

- [ ] Passo 7 — Validação e QA
  - [x] Rodar `npm run typecheck` e ajustar eventuais quebras
  - [ ] Executar testes (se aplicável) e flow manual no POS: criar venda, adicionar/remover itens, atualizar cliente, aplicar/remover cupom, pagar, carregar catálogos *(pendente: aguardar execução manual dos testes)*


## 4. Rollout para demais domínios
- [ ] Selecionar próximo domínio (agendamentos/produtos) e repetir scaffold
- [ ] Migrar gradualmente actions/hooks legados para casos de uso por módulo
- [ ] Criar playbook de migração (checklist + anti-patterns)

## 5. Observabilidade, qualidade e governança
- [ ] Definir KPIs técnicos (cobertura crítica, MTTR, taxa de erro)
- [ ] Instrumentar logs e métricas padronizados
- [ ] Padronizar toasts/notificações em client hooks
- [ ] Estabelecer rotina de revisão arquitetural e atualizar docs
