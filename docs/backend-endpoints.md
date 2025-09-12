Backend Endpoints (Contrato + Checklist)

Este arquivo consolida o contrato do backend e referencia a integração no frontend (pasta features/* e actions/*). Use como fonte de verdade para priorizar/migrar integrações.

Convenções gerais
- Autenticação: Bearer token (header `Authorization`) após `POST /sessions`.
- Refresh de token: backend pode devolver novo token no corpo JSON (campo `token`) OU no header `x-new-token`. O frontend deve detectar e substituir o token ativo.
- Content-Type padrão: `application/json`; rotas com upload usam `multipart/form-data` (campo de arquivo indicado no endpoint).
- Paginação (v1): query param `page`; resposta preferencial { items, count }. O frontend tolera array puro.
- Paginação (v2): quando houver `withCount=true`, resposta vira `{ items, count, page, perPage }`.
- Busca: quando aplicável, use `q` ou filtros específicos (`name`, `code`, etc.).
- Erros: backend deve retornar `{ message }` em erros HTTP; o frontend propaga essa mensagem.
- i18n: páginas usam locale dinâmico; evitar prefixos fixos.

Formato recomendado de resposta
- Listagem: { <resourcePlural>: T[], count: number }
- Detalhe: { <resourceSingular>: T }
- Alternativa tolerada pelo front (migração): T[] (listagem) ou T (detalhe) — já tratado nos fetchers.

Contrato detalhado por domínio (fornecido)

Autenticação
- POST `/users` (cria usuário) [público]
  - Body: `{ name, email, password, phone, cpf, genre, birthday, pix, unitId, roleId, permissions?[] }`
- POST `/sessions` (login) [público]
  - Body: `{ email, password }`
  - Resposta: `{ user, roles, token }`
- POST `/forgot-password` [público]
  - Body: `{ email }`
- POST `/reset-password` [público]
  - Body: `{ token, password }`

Sessão
- PATCH `/sessions/unit` (altera unidade ativa) [protegido]
  - Body: `{ unitId }`
  - Pode retornar novo token (corpo ou header `x-new-token`).

Uploads
- POST `/upload` (arquivo único) [sem JWT]
  - multipart/form-data campo `file`: `avatar`
- GET `/uploads` [sem JWT]
- GET `/uploads/:filename` [sem JWT]
- DELETE `/uploads/:filename` [sem JWT]

Perfil (do logado e administrativo)
- GET `/profile` [protegido] → `{ profile, roles }`
- POST `/create/profile` [protegido]
  - Body: `{ phone, cpf, genre, birthday, pix, roleId, permissions?[] }`
- PUT `/profile/:id` [protegido]
  - Body: `{ name, email, active, phone, cpf, genre, birthday, pix, roleId }`
- PUT `/profile` [protegido]
  - Body: `{ name, email, active, phone, cpf, genre, birthday, pix }`

Perfil – Horários de trabalho/bloqueio
- POST `/profile/:profileId/work-hours` [protegido]
  - Body: `{ weekDay(0–6), startHour, endHour }`
- DELETE `/profile/:profileId/work-hours/:id` [protegido] → 204
- POST `/profile/:profileId/blocked-hours` [protegido]
  - Body: `{ startHour(date), endHour(date) }`
- DELETE `/profile/:profileId/blocked-hours/:id` [protegido] → 204

Usuários da barbearia (gestão)
- POST `/barber/users` [protegido]
  - Body: `{ name, email, password, phone, cpf, genre, birthday, pix, unitId?, roleId }`
- GET `/barber/users` [protegido] → `{ users: [..., balance] }`
- GET `/barber/users/:id` [protegido] → `{ ...user, balance, loans }`
- PUT `/barber/users/:id` [protegido]
  - Body parcial: `{ name?, phone?, cpf?, genre?, birthday?, pix?, unitId?, roleId?, permissions?[], commissionPercentage?, active? }`
  - Pode renovar token do próprio usuário
- DELETE `/barber/users/:id` [protegido] → 204

Serviços (barbearia)
- POST `/create/service` [protegido]
  - multipart/form-data (arquivo: `image`)
  - Campos de form: `{ name, description?, cost, price, categoryId, defaultTime?, commissionPercentage? }`
- GET `/services` [protegido]
  - Query: `{ withCount?, page?, perPage?, name?, categoryId? }`
  - Resposta: `items` ou `{ items, count, page, perPage }`

Agendamentos
- POST `/create/appointment` [protegido]
  - Body: `{ clientId, barberId, serviceIds:[string]+, date(date), unitId? }`
- GET `/appointments` [protegido]
  - Query: `{ withCount?, page?, perPage? }`
- GET `/appointment-barbers` [protegido] → `users`
- PATCH `/appointments/:id` [protegido]
  - Body: `{ status?, observation? }`

Produtos
- POST `/products` [protegido]
  - multipart/form-data (arquivo: `image`)
  - Form: `{ name, description?, quantity?, cost, price, commissionPercentage?, categoryId }`
- GET `/products` [protegido]
  - Query: `{ withCount?, page?, perPage?, name? }`
  - Resposta: `items` ou `{ items, count, page, perPage }`
- GET `/products/:id` [protegido] → `product` (404 se não existir)
- PATCH `/products/:id` [protegido]
  - Body parcial: `{ name?, description?, quantity?, cost?, price?, commissionPercentage?, categoryId? }`
- DELETE `/products/:id` [protegido] → 204
- GET `/product-sellers` [protegido] → `users`

Categorias
- POST `/categories` [protegido] → `category`
- GET `/categories` [protegido] → `categories`
- PATCH `/categories/:id` [protegido] → `category`

Cupons
- POST `/coupons` [protegido]
  - Body: `{ code, description?, discount(number), discountType: 'PERCENTAGE'|'VALUE', imageUrl?, quantity? }`
- GET `/coupons` [protegido]
  - Query: `{ withCount?, page?, perPage?, code? }`
  - Resposta: `items` ou `{ items, count, page, perPage }`
- GET `/coupons/:id` [protegido] → `coupon`
- PATCH `/coupons/:id` [protegido] → `coupon` (ex.: atualiza quantidade)
- DELETE `/coupons/:id` [protegido] → 204

Caixa (Cash Register)
- POST `/cash-session/open` [protegido]
  - Body: `{ initialAmount(number) }`
- PUT `/cash-session/close` [protegido]
- GET `/cash-session` [protegido]

Empréstimos
- POST `/loans` [protegido]
  - Body: `{ amount(number) }`
- GET `/users/:userId/loans` [protegido]
- PATCH `/loans/:id/status` [protegido] (ADMIN/MANAGER/OWNER)
  - Body: `{ status: 'PENDING'|'APPROVED'|'PAID'|... }`
- PATCH `/loans/:id/pay` [protegido]
  - Body: `{ amount(number) }`

Transações/Comissões
- POST `/pay/transactions` [protegido]
  - multipart/form-data (arquivo: `receipt`)
  - Body: `{ description?, amount? (>0), saleItemIds? (string[]|JSON), appointmentServiceIds? (string[]|JSON), affectedUserId, discountLoans? (boolean) }`
- GET `/pay/pending/:userId` [protegido]
  - Exige permissão MANAGE_OTHER_USER_TRANSACTION
- GET `/transactions` [protegido]

Permissões e Papéis
- POST `/permissions`, GET `/permissions`, PUT `/permissions/:id` [protegido]
- POST `/roles`, GET `/roles`, PUT `/roles/:id` [protegido]

Organizações
- POST `/organizations`, GET `/organizations`, GET `/organizations/:id`, PUT `/organizations/:id`, DELETE `/organizations/:id` [protegido]

Unidades
- POST `/units`, GET `/units`, GET `/units/:id`, PUT `/units/:id`, DELETE `/units/:id` [protegido]

Horários de funcionamento da unidade
- POST `/units/:unitId/opening-hours`, DELETE `/units/:unitId/opening-hours/:id`, GET `/units/opening-hours` [protegido]

Planos
- POST `/plans`, GET `/plans`, GET `/plans/:id`, PATCH `/plans/:id`, DELETE `/plans/:id` [protegido]

Contas a receber (Debts)
- POST `/debts`, GET `/debts`, GET `/debts/:id`, PATCH `/debts/:id`, PATCH `/debts/:id/pay`, DELETE `/debts/:id` [protegido]

Benefícios
- CRUD `/benefits` [protegido]

Tipos de recorrência
- CRUD `/type-recurrences` [protegido]

Relatórios
- GET `/reports/sales`, `/reports/barber/:barberId/balance`, `/reports/owner/:ownerId/balance`, `/reports/cash-session/:sessionId`, `/reports/unit/:unitId/loan-balance`, `/reports/user/:userId/products` [protegido]

Vendas
- POST `/sales`, GET `/sales`, GET `/sales/:id`,
  PATCH `/sales/:id`, `/sales/:id/saleItems`, `/sales/:id/coupon`, `/sales/:id/pay`, `/sales/:id/client`, `/sales/saleItem/:id` [protegido]

Config
- GET `/config/export/users` [protegido]

1) Autenticação/Perfil
- POST /sessions → { token, user, roles? }
- POST /forgot-password
- POST /reset-password
- GET /profile
- PUT /profile e/ou PUT /profile/:id
Frontend: next-auth (Credentials) em src/auth/options.ts; sincronização de sessão → cookies HttpOnly via /api/session-sync.

2) Agenda e Disponibilidade
- POST /create/appointment
- GET /appointments
- GET /appointment-barbers
- PATCH /appointments/:id
- POST /profile/:profileId/work-hours
- POST /profile/:profileId/blocked-hours
- DELETE /profile/:profileId/work-hours/:id
- DELETE /profile/:profileId/blocked-hours/:id
Frontend: a implementar (features/appointments/*, features/work-hours/*).

3) PDV/Vendas
- POST /sales
- GET /sales
- GET /sales/:id
- PATCH /sales/:id
- PATCH /sales/:id/saleItems
- PATCH /sales/:id/coupon
- PATCH /sales/:id/pay
- PATCH /sales/:id/client
- PATCH /sales/saleItem/:id
Frontend: a implementar (features/sales/*).

4) Planos, Recorrências e Benefícios
- Planos: POST /plans, GET /plans, GET /plans/:id, PATCH /plans/:id, DELETE /plans/:id
- Tipos de Recorrência: POST /type-recurrences, GET /type-recurrences, GET /type-recurrences/:id, PATCH /type-recurrences/:id, DELETE /type-recurrences/:id
- Benefícios: POST /benefits, GET /benefits, GET /benefits/:id, PATCH /benefits/:id, DELETE /benefits/:id
Frontend: a implementar (features/plans/*, features/recurrences/*, features/benefits/*).

5) Assinaturas (PlanProfiles)
- Criação/renovação via vendas: POST /sales e PATCH /sales/:id/pay
- Débitos: GET /debts, GET /debts/:id, PATCH /debts/:id/pay
Frontend: a implementar (features/subscriptions/*) — consumir via sales/debts.

6) Débitos de Plano
- POST /debts
- GET /debts
- GET /debts/:id
- PATCH /debts/:id
- PATCH /debts/:id/pay
- DELETE /debts/:id
Frontend: a implementar (features/debts/*).

7) Histórico e Documentos
- GET /sales (vendas)
- GET /sales/:id
Frontend: a implementar (features/sales/*).

8) Serviços/Produtos/Categorias/Estoque
- Serviços (barber-shop):
  - POST /create/service
  - GET /services
- Produtos:
  - POST /products (upload image)
  - GET /products
  - GET /products/:id
  - PATCH /products/:id
  - DELETE /products/:id
  - GET /product-sellers
- Categorias:
  - POST /categories
  - GET /categories
  - PATCH /categories/:id
Frontend: IMPLEMENTADO (v1)
  - features/products/{schemas.ts, api.ts}, actions/product.ts
  - features/services/{schemas.ts, api.ts}, actions/service.ts
  - features/categories/{schemas.ts, api.ts}, actions/category.ts
  - pages/templates: List/Register/Detail para products, services, categories

9) Cupons
- POST /coupons
- GET /coupons
- GET /coupons/:id
- PATCH /coupons/:id
- DELETE /coupons/:id
Frontend: IMPLEMENTADO (v1)
  - features/coupons/{schemas.ts, api.ts}, actions/coupon.ts
  - pages/templates: List/Register/Detail de cupons

10) Caixa & Transações
- Caixa:
  - POST /cash-session/open
  - PUT /cash-session/close
  - GET /cash-session
- Transações/Comissões:
  - POST /pay/transactions (anexa receipt)
  - GET /pay/pending/:userId
  - GET /transactions
Frontend: a implementar (features/cash-session/*, features/transactions/*, features/commissions/*).

11) Empréstimos
- POST /loans
- GET /users/:userId/loans
- PATCH /loans/:id/status
- PATCH /loans/:id/pay
Frontend: a implementar (features/loans/*).

12) Clientes & Perfis
- GET /profile
- POST /create/profile
- PUT /profile/:id
- PUT /profile
Frontend: parte existente (users/profile), precisa migrar para novo contrato quando disponível (features/profiles/*).

13) Usuários/Barbeiros
- Admin/Auth:
  - POST /users (criação)
- Barbeiros:
  - POST /barber/users, GET /barber/users, GET /barber/users/:id, PUT /barber/users/:id, DELETE /barber/users/:id
- Sessão/Unidade:
  - PATCH /sessions/unit
Frontend: já há base (users) — migrar gradualmente para novos endpoints (features/barbers/*, features/users/*, action para sessions/unit).

14) Organização & Unidades
- Organizações:
  - POST /organizations, GET /organizations, GET /organizations/:id, PATCH /organizations/:id, DELETE /organizations/:id
- Unidades:
  - POST /units, GET /units, GET /units/:id, PUT /units/:id, DELETE /units/:id
- Horários de Abertura:
  - POST /units/:unitId/opening-hours
  - DELETE /units/:unitId/opening-hours/:id
  - GET /units/opening-hours
Frontend: parcialmente implementado; migrar para features/organizations/* e features/units/* (já existe base para units v1).

15) Papéis & Permissões
- Papéis: POST /roles, GET /roles, PUT /roles/:id
- Permissões: POST /permissions, GET /permissions, PUT /permissions/:id
Frontend: a implementar (features/roles/*, features/permissions/*). Middleware já normaliza role name.

16) Relatórios & Dashboard
- GET /reports/sales
- GET /reports/barber/:barberId/balance
- GET /reports/owner/:ownerId/balance
- GET /reports/cash-session/:sessionId
- GET /reports/unit/:unitId/loan-balance
- GET /reports/user/:userId/products
- Indicadores (base para dashboard): GET /sales, GET /appointments, GET /debts, GET /reports/*
Frontend: a implementar (features/reports/*, features/dashboard/*). Já existe base para gráficos em features/graphics.

17) Configurações & Integrações
- GET /config/export/users
- GET /health
Frontend: a implementar (features/config/*, features/health/*).

Mapa Frontend (status)
- Auth: OK (NextAuth Credentials + cookies HttpOnly)
- Products: OK (List/Register/Detail + CRUD)
- Coupons: OK (List/Register/Detail + CRUD)
- Services: OK (List/Register/Detail + CRUD)
- Categories: OK (List/Register/Detail + CRUD)
- Units: Parcial (List/Detail/Register v1)
- Segments/Courses: Parcial (v1)
- Leads: Parcial (v1)
- Demais domínios: pendente

Próximos passos sugeridos
1) Consolidar “response shapes” do backend para todos os recursos (usar { list, count } e { item }).
2) Migrar endpoints prioritários: appointments, sales, debts.
3) Criar features/* para cada domínio pendente (schemas + api) e refatorar actions (server) consumindo-os.
4) Atualizar templates/páginas conforme novos contratos.
