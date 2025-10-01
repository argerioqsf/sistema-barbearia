# ADR: DDD‑lite no POS — Ports, DTOs, Mappers e Value Objects

Status: Aceito
Data: 2025-09-27

## Contexto
O módulo `sales-pos` cresceu e hoje mistura contratos de API com tipagens de domínio. Precisamos de melhor isolamento entre camadas para facilitar testes, evolução do backend e reuso de casos de uso no App Router. A estratégia DDD‑lite propõe interfaces (Ports), DTOs validados, mapeadores dedicados e Value Objects para regras numéricas/estado.

## Decisão
- Adotar Ports em `application/ports/*` (ex.: `SalesPosGatewayPort`) para desacoplar casos de uso da infraestrutura.
- Usar DTOs com Zod em `application/dto/*` para validar entradas/saídas dos casos de uso.
- Criar Mappers em `infrastructure/mappers/*` para conversão API JSON ↔ domínio, evitando “vazamento” do formato externo.
- Introduzir Value Objects em `domain/value-objects/*` (ex.: `money`, `percentage`, `sale-status`) e renomear `domain/models` → `domain/entities`.

## Escopo
- Aplicar no módulo `sales-pos` (piloto). Seguir o mesmo padrão para demais domínios depois da validação.
- Manter o contrato `Result<T, NormalizedError>` dos casos de uso.
- UI permanece consumindo casos de uso via hooks/React Query; Server Actions finas convertem FormData → DTO → Use Case onde necessário.

## Alternativas consideradas
- Manter acoplamento direto a `features/*`: menor esforço imediato, porém baixa testabilidade e maior atrito na evolução.
- Microfrontends: granularidade excessiva para o escopo atual e complexidade de build/deploy.

## Consequências
- Positivas: testes mais simples (fakes de Ports), isolamento do backend, clareza de contratos e menor acoplamento entre camadas.
- Negativas: custo de migração inicial e incremento de arquivos (ports/dtos/mappers/vo).

## Ações relacionadas
- Atualizar `docs/plan/tasks-modernizacao-pos.md` com a subseção “3.x DDD‑lite no POS”.
- Implementar Ports/DTO/Mappers/VOs no módulo `sales-pos` e ajustar casos de uso.
- Adicionar testes de use cases (fakes) e de mappers.

## Referências
- `../plan/tasks-modernizacao-pos.md`
- `../tech/arquitetura-modular.md`
