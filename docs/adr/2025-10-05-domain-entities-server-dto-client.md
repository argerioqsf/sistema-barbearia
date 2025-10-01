# ADR — Entidades de Domínio no Servidor, DTOs no Client (POS)

## Contexto

O piloto do POS introduziu entidades de domínio (`Sale`, `SaleItem`) com VOs (`Money`, `SaleStatus`) para encapsular regras de negócio. Ao mesmo tempo, a UI utiliza React Query e API Routes JSON. Surgiu a dúvida se deveríamos enviar as entidades diretamente para o client ou manter DTOs serializáveis.

## Decisão

- As entidades vivem no servidor (casos de uso, mapeadores, gateway) e encapsulam invariantes/comportamentos.
- As API Routes retornam snapshots JSON (`SaleDTO`). A camada de aplicação converte entidades → DTO via `toDTO()` antes de enviar para a UI.
- O client continua consumindo `SaleDTO` serializável, armazenado em React Query e hidratado sem rehidratação especial.

## Justificativa

- **Serialização/cache**: React Query e DevTools esperam objetos serializáveis. Classes perdem comportamento ao cruzar a fronteira e quebram hidratação.
- **Bundle/Tamanho**: manter a lógica pesada no servidor reduz o bundle do client.
- **Single Source of Truth**: regras complexas (cupons, preços) permanecem no backend; o domínio server-side garante consistência sem duplicar lógica no client.
- **Compatibilidade incremental**: facilita migração de código legado, pois a UI continua lendo estruturas equivalentes às antigas (`ZSale`).

## Consequências

- Camada de aplicação deve continuar chamando `sale.toDTO()`/`saleItem.toDTO()` antes de responder via API Route.
- Helpers client-side (ex.: cálculos exibidos) devem ser funções puras sobre DTOs ou utilizar adaptadores (`SaleItem.fromDTO`) quando necessário, nunca classes diretamente em cache.
- Testes do domínio residem no server (Vitest). Testes de UI continuam consumindo snapshots.
- Se um fluxo precisar de comportamento no client, criar view models/seletores puros a partir dos DTOs, não exportar entidades.

## Próximos Passos

- Documentar no README do módulo a convenção "Server → Entidade", "Client → DTO".
- Revisitar periodicamente se algum fluxo justifica Server Components (onde o domínio poderia ser usado diretamente sem transitar para o client).
