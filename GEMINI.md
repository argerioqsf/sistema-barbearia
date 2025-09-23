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
-   `src/features`: Contains code related to specific features of the application.
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

-   **Component Structure:** New pages should be created inside the `src/components/template` directory. The `src/features` directory should only contain logic related to backend requests.
-   **Linting:** The project uses ESLint for linting. Run `npm run lint` to check for linting errors.
-   **Type Checking:** The project uses TypeScript for type checking. Run `npm run typecheck` to check for type errors.
-   **Styling:** The project uses Tailwind CSS for styling.
-   **Authentication:** The project uses `next-auth` for authentication. The authentication configuration is in `src/auth/options.ts`.
-   **API Communication:** The project uses a custom API client in `src/data/api.ts` to communicate with the backend API.
-   **Internationalization:** The project uses `next-intl` for internationalization. The messages are in the `src/messages` directory.
