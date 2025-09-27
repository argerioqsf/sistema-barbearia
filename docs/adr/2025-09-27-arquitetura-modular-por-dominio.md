# ADR: Arquitetura Modular por Domínio (Domain/Application/Infrastructure/UI)

Status: Aceito
Data: 2025-09-27

## Contexto
O código atual mistura regras de negócio, acesso HTTP e UI. Precisamos de camadas explícitas, testáveis e com baixo acoplamento para escalar.

## Decisão
- Adotar módulos por domínio sob `src/modules/<domínio>` com as camadas: `domain`, `application`, `infrastructure`, `ui`, `tests`.
- Restringir dependências conforme matriz definida em `docs/arquitetura-modular.md`.
- Expor casos de uso com `Result<T, NormalizedError>`.

## Alternativas consideradas
- Continuar com `features/` mista (API + regras + UI): mantém status quo, mas perpetua acoplamento e baixa testabilidade.
- Microfrontends: granularidade excessiva para o escopo atual e overhead de build/deploy.

## Consequências
- Positiva: maior testabilidade, clareza de responsabilidades e reuso de casos de uso entre UIs.
- Negativa: custo de migração inicial e necessidade de documentação viva.

## Relacionados
- `../tech/arquitetura-modular.md`
- `../plan/planejamento-diagnostico.md`
- `../plan/tasks-modernizacao-pos.md`
