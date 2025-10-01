# Módulos de domínio

Cada domínio do sistema deve residir em `src/modules/<domínio>` seguindo camadas explícitas:

```
src/modules/<domínio>/
  domain/          # Entidades, value objects, regras puras
  application/     # Casos de uso, orquestração entre domínio e infra
  infrastructure/  # Adaptadores (HTTP/cache/gateways externos)
  ui/              # Componentes e hooks específicos do domínio (RSC/Client)
  tests/           # Testes do módulo
```

Regras de dependência e convenções estão em `docs/tech/arquitetura-modular.md`.

