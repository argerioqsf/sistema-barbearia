# Usuários — Cadastro e Listagem (com fluxo BARBER)

## Contexto

- Endpoints: `POST /barber/users` (criação), `GET /roles`, `GET /permissions`, `GET /users`, `PUT /barber/users/:id` (status)
- Para BARBER: `commissionPercentage` e vínculo de serviços/produtos via `barberServices`/`barberProducts`.

## Telas

- Cadastro de Usuário: `[locale]/dashboard/users/register`
- Listagem de Usuários (ADMIN/OWNER): `[locale]/dashboard/users/(list)`
- Detalhe/Edição: `[locale]/dashboard/users/detail/[id]`

## Arquitetura de Formulários (Novo Padrão)

Para o cadastro de usuário, foi estabelecido um novo padrão de formulários mais simples e componível, localizado em `src/components/organisms/Form/`.

- **`FormLayout`**: Componente principal que estrutura a página do formulário, com título, descrição e layout de cartão.
- **`FormSection`**: Usado para agrupar campos em seções lógicas dentro do formulário (ex: "Dados Pessoais", "Acesso").
- **`FormField`**: Encapsula cada campo do formulário, incluindo `Label`, o componente de input (`Input`, `Select`, etc.) e a exibição de mensagens de erro de validação do Zod.

Adicionalmente, foram criados novos componentes de UI genéricos em `src/components/ui/` para suportar este novo padrão:
- `select.tsx`
- `label.tsx`
- `calendar.tsx`
- `popover.tsx`
- `datepicker.tsx`

Este padrão deve ser seguido para a criação de novos formulários.

## Tasks

1) **API e Schemas**
   - [x] Ajustar/implementar clients em `features/users/api.ts`. (Corrigido `createCollaborator` e adicionado `updateCollaboratorStatus`).
   - [x] Clients auxiliares: `features/roles/api.ts` utilizado para buscar papéis. (`permissions/api.ts` pendente).
   - [ ] Chaves React Query: `['users',{ q, role, page, perPage }]`, `['roles']`, `['permissions']` (atualmente usando Server Actions para busca inicial).

2) **Cadastro**
   - [x] Form multisseção: Dados pessoais, Acesso (email/senha), Papel (role).
   - [x] Estratégia de persistência: `POST /barber/users` enviando todos os dados de uma vez.
   - [x] Server Actions com validação Zod, toasts e redirect.
   - [ ] **Próximo Passo**: Implementar campos condicionais para o papel "BARBER".

3) **Listagem (ADMIN/OWNER)**
   - [x] Tabela: Nome, Email, Papel, Status, Ações (DataListTable).
   - [x] Filtros: nome/email; paginação com DataListPagination.
   - [x] Role guard: Adicionado `checkUserPermissions('user.list', ...)` para proteger a página.
   - [x] Refatorada a ação de ativar/desativar usuário (`ToggleUserButton`) para usar o endpoint correto (`PUT /barber/users/:id`).

4) **Edição**
   - [x] Permitir atualização de Dados pessoais/Role/Permissões.
   - [x] Se BARBER, manter/editar vínculos e comissão.

5) **Integrações/Seletores**
   - [ ] `useServicesOptions`, `useProductsOptions`, `usePermissionsOptions` (necessário para os próximos passos).

## Próximos Passos: Campos Condicionais (BARBER)

A implementação do formulário continuará com os campos que são exibidos apenas quando o papel "BARBER" é selecionado.

1.  **Lógica Condicional no Formulário**:
    -   No `RegisterUserForm.tsx`, observar a seleção do campo `roleId`.
    -   Quando o papel "BARBER" for selecionado, exibir uma nova seção no formulário.

2.  **Campo de Permissões (`permissions`)**:
    -   Criar uma API e action para buscar as permissões (`GET /permissions`).
    -   Criar um novo componente de formulário, como `FormCheckboxGroup` ou `FormMultiSelect` em `src/components/organisms/Form/`.
    -   Adicionar o campo de seleção de permissões à seção condicional do BARBER.

3.  **Campo de Comissão (`commissionPercentage`)**:
    -   Adicionar um `FormField` com um `Input type="number"` para a comissão geral do colaborador.

4.  **Tabela de Associação de Serviços**: 
    -   Criar um novo componente `FormItemAssociation.tsx`.
    -   Este componente buscará a lista de serviços (`GET /services`).
    -   Exibirá os serviços em uma tabela com checkboxes.
    -   Para cada serviço selecionado, permitirá a inserção de dados específicos (`tempo`, `comissão`, `tipo de comissão`).
    -   O estado deste componente complexo precisará ser gerenciado e serializado para ser enviado via `FormData`.

5.  **Tabela de Associação de Produtos**: 
    -   Reutilizar ou adaptar o `FormItemAssociation.tsx` para produtos.

6.  **Atualizar `createUserAction`**:
    -   Expandir a action para processar os novos campos: `permissions`, `commissionPercentage`, e os arrays de `services` e `products`.