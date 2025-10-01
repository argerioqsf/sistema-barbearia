# POS — Inventário de Endpoints e Ações

## Fluxo principal
- **GET `/sales/{id}`** – recupera venda + itens
- **POST `/sales`** – cria venda (clientId, observation, method)
- **POST `/sales/{id}/saleItems`** – adiciona itens (products, services, plans, appointments)
- **DELETE `/sales/{id}/saleItems`** – remove itens (ids)
- **PATCH `/sales/saleItem/{saleItemId}`** – atualiza item (service/product/plan)
- **PATCH `/sales/saleItem/{saleItemId}/coupon`** – cupom no item
- **PATCH `/sales/saleItem/{saleItemId}/quantity`** – quantidade
- **PATCH `/sales/saleItem/{saleItemId}/customPrice`** – preço custom
- **PATCH `/sales/saleItem/{saleItemId}/barber`** – barbeiro do item
- **PATCH `/sales/{id}/client`** – atualiza cliente
- **PATCH `/sales/{id}/coupon`** – aplica/remove cupom geral
- **POST `/sales/{id}/pay`** – finaliza pagamento

## Catálogos auxiliares
- **GET `/products`** – lista produtos (filtros: `name`, paginação)
- **GET `/services`** – lista serviços (filtros: `name`, categoria)
- **GET `/plans`** – lista planos disponíveis
- **GET `/appointments`** – agendamentos (filtros: `date`, `status`)
- **GET `/clients`** – clientes (filtro `name`)
- **GET `/users` (barbers)** – colaboradores para comissão

## Dependências externas
- Autenticação via `next-auth` + token backend (server-side)
- Toasts/UX: `showApiSuccessToast` e `showApiErrorToast`
- Estado global: React Query + executor simples (ver ADR `react-query-com-executor-simples`)

## Observações
- Invalidação: principais chaves (`sales`, `products`, `services`, `coupons`, `appointments`).
- Migração incremental: preservar rotas existentes enquanto novos endpoints/hooks entram em produção (rota `/api/pos/*` funciona como proxy controlado pelo frontend).
- Este inventário serve como referência para rotas internas (`/api/pos/*`) e para documentação do backend.

## Plano de migração incremental
1. Introduzir hooks/clientes usando `/api/pos/*` mantendo `actions/*` legados como fallback.
2. Migrar telas para React Query (POS primeiro); componentes herdam dados via hooks.
3. Após validação, remover chamadas diretas a `actions/*` do POS e documentar padrão para outros domínios.
