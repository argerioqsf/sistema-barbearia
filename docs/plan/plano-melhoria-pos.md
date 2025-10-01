# Plano de Ação — Modernização Arquitetural (Visão Geral)

Documento de visão e objetivos do esforço de modernização. Os detalhes foram movidos para arquivos específicos para manter responsabilidades bem separadas.

## Objetivos
- Definir arquitetura de referência modular por domínio para todo o projeto.
- Padronizar contratos, tratamento de erros, fluxos de dados e organização de pastas.
- Usar POS como piloto para validar a arquitetura e servir de blueprint.

## Navegação
- Planejamento e diagnóstico (Etapa 1): `./planejamento-diagnostico.md`
- Inventário POS: `./pos-endpoints.md`
- Arquitetura modular (camadas e convenções): `../tech/arquitetura-modular.md`
- Tasks e roadmap executável: `./tasks-modernizacao-pos.md`
- Diretrizes App Router: `../tech/app-router-guidelines.md`
- ADRs de suporte: `../adr/`

## Escopo
- Modernização arquitetural de todo o sistema com migração incremental.
- POS será o primeiro fluxo a adotar a nova arquitetura.
