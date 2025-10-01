# Arquitetura Modular — Camadas e Convenções

Este documento explica a arquitetura-alvo adotada para todo o projeto, usando o POS como piloto de implementação.

## Estrutura por domínio
```
src/modules/<domínio>/
  domain/          # Modelos, value objects, serviços puros (sem React/HTTP)
  application/     # Casos de uso (commands/queries) que orquestram domínio + infra
    dto/           # DTOs (Zod) para validar entrada/saída
    ports/         # Interfaces que casos de uso consomem
  infrastructure/  # Adaptadores concretos (HTTP/cache) e gateways externos
    mappers/       # Conversão API ↔ domínio
  ui/              # Componentes e hooks específicos do domínio (RSC/Client)
  tests/           # Testes unitários/integrados do módulo
```

## Regras de dependência
- `domain` não depende de `application`, `infrastructure` ou `ui`.
- `application` depende de `domain` e das “ports” expostas por `infrastructure`.
- `infrastructure` não depende de `ui`.
- `ui` consome `application` (e tipos de `domain`), nunca `infrastructure` diretamente.

## Convenções de nomeação
- Casos de uso: `application/commands/<verbo>.ts` e `application/queries/<consulta>.ts`.
- DTOs e Ports ficam agrupados em `application/dto` e `application/ports`; exports por camada via `index.ts` da pasta.
- Value Objects ficam em `domain/value-objects/*`.
- Client Components devem conter `use client` no topo; Server Components não.

## Erros e resultados
- Padrão de retorno: `Result<T, NormalizedError>` nos casos de uso.
- Normalização de erros centralizada; 401 aciona `onUnauthorized`, 5xx gera toast genérico na camada client.
- Toasters/notificações somente em hooks Client; Server Components permanecem puros.

## App Router (Next.js)
- Data fetching prioritariamente em Server Components; mutações via Server Actions quando fizer sentido.
- Invalidação via `revalidateTag`/`revalidatePath` documentada por caso de uso.
- Detalhes operacionais: ver `docs/tech/app-router-guidelines.md`.

## POS como piloto
- O módulo `sales-pos` aplica este blueprint e servirá de referência para migrar outros domínios.
- Integrações com camadas legadas devem ser encapsuladas em gateways na `infrastructure` do módulo.
