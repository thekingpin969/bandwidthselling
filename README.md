# bandwidth_selling

## Overview

`bandwidth_selling` is a backend project built on [Bun](https://bun.sh) with TypeScript, utilizing the Hono web framework. It exposes several API endpoints and incorporates modules for bot integration, database interaction, and module management. The application is designed to be fast and lightweight, leveraging Bun’s ecosystem and powerful dependency management.

## Features

- **REST API**: Built with [Hono](https://honojs.dev/), providing endpoints for logs and modules.
- **Bot Integration**: Loads a bot module dynamically on startup.
- **Database Support**: Integrates with Redis (and possibly more) for data storage.
- **Streaming Support**: Uses Hono's streaming capabilities for efficient data delivery.
- **CORS Enabled**: Cross-origin requests are permitted.
- **Environment Configuration**: Loads environment variables from `.env`.
- **Pluggable Modules**: Easily add new modules via the `/routes/getModules` endpoint.

## Directory Structure

- `main.ts` — Main entrypoint, server setup, API routing
- `bot/` — Bot-related functionality (dynamically imported)
- `database/` — Database connectors (e.g., Redis)
- `routes/` — API route handlers (e.g., logs, modules)
- `helpers/` — Utility/helper functions
- `utils/` — General-purpose utilities
- `.env` — Environment variables (not tracked in version control)

## Dependencies

Key dependencies include:
- `bun` (runtime)
- `hono` (web framework)
- `redis` (database)
- `axios` (HTTP requests)
- `dockerode` (Docker API)
- `telegraf` (Telegram bot support)
- `express` (legacy or alternative routing)
- ...and others.

For the complete list, see [`package.json`](./package.json).

## Getting Started

### 1. Install Bun

If you don’t have Bun installed, follow the instructions at [https://bun.sh](https://bun.sh).

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root. At minimum, you should define any required environment variables for database or API connections.

### 4. Run the Application

```bash
bun run main.ts
```
or use the defined script:
```bash
bun run start
```

The server will start on port 3000 by default.

### 5. Using the API

- `GET /` — Health check, returns `OK`
- `GET /getLogs/:name` — Fetch logs by name
- `GET /getModules` — List available modules

Additional endpoints may be available depending on the modules enabled in the `routes/` directory.

## Scripts

- `bun run start` — Runs `main.ts`
- `bun run build` — Builds the project (see `package.json` for details)

## Development

This project was created using `bun init` in bun v1.2.8.

To explore or extend the project, see the source files in the respective folders (`bot/`, `database/`, `routes/`, `helpers/`, `utils/`).

## More

- For advanced configuration, check `tsconfig.json` and `.env`.
- See the [Bun documentation](https://bun.sh/docs) for runtime details.

---

> **Note:** This is a summary based on the available code and structure. For the most up-to-date or complete documentation, please refer to the [project on GitHub](https://github.com/thekingpin969/bandwidthselling).
