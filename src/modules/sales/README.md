# Módulo `sales`

Domínio central de Vendas, compartilhado por diferentes aplicações (POS, administrativo, relatórios).

## Escopo
- **domain/**: Entidades `Sale`, `SaleItem`, value object `SaleStatus` e serviços puros (ex.: totalização).
- **application/**: Casos de uso síncronos (create/get/add item, cupom, pagamento, atualização de cliente/itens) + contratos (`SalesGatewayPort`) e DTOs com validação.
- **infrastructure/**: Implementações de gateway/mappers para a API REST legada (`SalesGateway`).
- **tests/**: Testes unitários cobrindo domínio, mapeadores e casos de uso.

## Dependências
- Pode depender de `@/shared/*` (value objects, resultados, erros, logger).
- **Não** deve importar nada de `sales-pos`; o fluxo POS consome este módulo via `@/modules/sales`.

## Integração com POS
O módulo `sales-pos` reexporta temporariamente tipos/funções do `sales` para manter compatibilidade durante a migração. Novas integrações devem importar diretamente de `@/modules/sales/*`.
