# GEMINI.md

## Project Overview

This is a Next.js project for a barbershop system. It uses Next.js for the frontend framework, `next-auth` for authentication, `next-intl` for internationalization, and Tailwind CSS for styling. The application communicates with a backend API for data.

The project is structured as follows:

-   `src/app`: Contains the main application logic, including pages and layouts.
-   `src/actions`: Contains server-side actions.
-   `src/auth`: Contains the authentication configuration.
-   `src/components`: Contains reusable React components.
-   `src/constants`: Contains application-wide constants.
-   `src/contexts`: Contains React contexts.
-   `src/data`: Contains the API client for communicating with the backend.
-   `src/features`: Legacy layer with feature-specific API logic (in migration).
-   `src/modules`: New modular architecture by domain (domain, application, infrastructure, ui, tests).
-   `src/hooks`: Contains custom React hooks.
-   `src/lib`: Contains utility functions.
-   `src/messages`: Contains the internationalization messages.
-   `src/shared`: Contains shared code.
-   `src/types`: Contains TypeScript type definitions.
-   `src/utils`: Contains utility functions.

## Building and Running

To build and run the project, use the following commands:

-   **Development:** `npm run dev` or `yarn dev`
-   **Production Build:** `npm run build` or `yarn build`
-   **Start Production Server:** `npm run start` or `yarn start`

## Development Conventions

-   **Architecture:** Prefer implementing new flows as modules under `src/modules/<domain>` using domain/application/infrastructure/ui layers. The legacy `src/features` is being migrated.
-   **Component Structure:** UI lives under each module's `ui` or in `src/components/template` for shared templates.
-   **Linting:** The project uses ESLint for linting. Run `npm run lint` to check for linting errors.
-   **Type Checking:** The project uses TypeScript for type checking. Run `npm run typecheck` to check for type errors.
-   **Styling:** The project uses Tailwind CSS for styling.
-   **Authentication:** The project uses `next-auth` for authentication. The authentication configuration is in `src/auth/options.ts`.
-   **API Communication:** The project uses a custom API client in `src/data/api.ts` to communicate with the backend API.
-   **Docs:** See `docs/README.md` for index. Key docs: `docs/plan/plano-melhoria-pos.md`, `docs/plan/planejamento-diagnostico.md`, `docs/tech/arquitetura-modular.md`, `docs/plan/tasks-modernizacao-pos.md`, and ADRs in `docs/adr/`.
- **Internationalization:** The project uses `next-intl` for internationalization. The messages are in the `src/messages` directory.

## User-Provided Guidelines

- **Project Patterns**: Always follow established project patterns. For example, page components in `src/app` should be simple, with the main logic and data fetching abstracted into a template component inside `src/components/template`.
- **Schema Location**: All data schemas (e.g., Zod schemas) must be located in the corresponding `src/features/*/schemas.ts` file. Do not create new schema files in other locations.
- **Toast Notifications**: Use the project's standardized `useToast` hook from `@/components/ui/use-toast.ts` for all user notifications. Do not use other libraries like `sonner` directly.
- **Verification**: After any implementation or modification, always run `npm run lint` and `npm run typecheck` to ensure the code is clean, correct, and free of errors.

## Nomenclature

-   **barber -> collaborator**: The term `barber` is being replaced with `collaborator` throughout the project to reflect a more general and inclusive scope, as the system is not limited to barbershops.
