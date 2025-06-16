# bandwidth_selling

## Overview

`bandwidth_selling` is a backend project built on [Bun](https://bun.sh) with TypeScript, utilizing the Hono web framework. It exposes several API endpoints and incorporates modules for bot integration, database interaction, and module management. The application is designed to be fast and lightweight, leveraging Bun’s ecosystem and powerful dependency management.

## Features

- **REST API**: Built with [Hono](https://honojs.dev/), providing endpoints for logs and modules.
- **Bot Integration**: Loads a Telegram bot module dynamically on startup.
- **Database Support**: Integrates with Redis (and possibly more) for data storage.
- **Streaming Support**: Uses Hono's streaming capabilities for efficient data delivery.
- **CORS Enabled**: Cross-origin requests are permitted.
- **Environment Configuration**: Loads environment variables from `.env`.
- **Pluggable Modules**: Easily add new modules via the `/routes/getModules` endpoint.
- **Proxy and Docker Integration**: Utilizes proxies to spin up Docker containers for bandwidth sharing apps.

## Directory Structure

- `main.ts` — Main entrypoint, server setup, API routing
- `bot/` — Telegram bot and related actions (dynamically imported)
- `database/` — Database connectors (e.g., Redis)
- `routes/` — API route handlers (e.g., logs, modules)
- `helpers/` — Utility/helper functions, including Docker/proxy logic
- `utils/` — General-purpose utilities
- `.env` — Environment variables (not tracked in version control)
- `proxies.txt` — Proxy list (see below for usage)

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

Create a `.env` file in the project root. At minimum, you should define any required environment variables for database or API connections (such as your Redis connection string and Telegram bot token).

### 4. Configure Proxies

The application uses proxies to spin up Docker containers for bandwidth sharing apps (`tun2socks`, `repocket`, `honeygain`, `iproyal`). Proxies must be specified in `proxies.txt` in the root directory.

**Example `proxies.txt` format:**
```
http://username:password@ip:port
http://username:password@ip:port
```

- Each line represents a single proxy.
- Proxies must be in the format: `http://username:password@ip:port`
- Blank lines and improperly-formatted proxies will be ignored (with errors logged).

These proxies are read and used to create isolated Docker containers for each bandwidth sharing module. Ensure your proxies are valid and able to tunnel traffic.

### 5. Docker Requirements

The core functionality relies on Docker. Ensure Docker is installed and running on the host system. The app will attempt to create and manage containers using the following images:
- `xjasonlyu/tun2socks`
- `repocket/repocket:latest`
- `honeygain/honeygain:latest`
- `iproyal/pawns-cli:latest`

Make sure your user has permissions to manage Docker containers.

### 6. Run the Application

```bash
bun run main.ts
```
or use the defined script:
```bash
bun run start
```

The server will start on port 3000 by default.

### 7. Using the API

- `GET /` — Health check, returns `OK`
- `GET /getLogs/:name` — Fetch logs by name
- `GET /getModules` — List available modules

Additional endpoints may be available depending on the modules enabled in the `routes/` directory.

### 8. Using the Telegram Bot

The app includes a Telegram bot providing management commands (`Status`, `Restart`, `App details`, `Pause/Resume`, `Stop/Start`). Set your Telegram bot token in `.env` as `BOT_TOKEN` and interact with the bot for application control.

## Scripts

- `bun run start` — Runs `main.ts`
- `bun run build` — Builds the project (see `package.json` for details)

## Development

This project was created using `bun init` in bun v1.2.8.

To explore or extend the project, see the source files in the respective folders (`bot/`, `database/`, `routes/`, `helpers/`, `utils/`).

## Important Notes & Caveats

- **Proxy Quality**: The quality and validity of your proxies directly impact the stability and performance of the Docker containers and, by extension, the bandwidth sharing apps.
- **Docker Access**: You must have Docker running with sufficient permissions to create and manage containers.
- **Resource Usage**: Running multiple containers (one per proxy) can consume significant system resources. Monitor your host’s CPU, memory, and network.
- **Environment Variables**: Some modules (e.g., Repocket, Honeygain, IPRoyal) have hardcoded credentials in the code. For production use, update or secure these credentials.
- **Security**: All proxies and credentials should be kept secure, as misuse can compromise your system or accounts.
- **Platform Compatibility**: The app assumes a Unix-like environment with Docker and Bun. Windows users may need to adapt Docker binding paths (e.g., `/dev/net/tun`).
- **API and Bot**: Do not expose the API or bot token publicly. Restrict network access if necessary.
- **First Run**: The cold start logic (spinning up containers with proxies) is present but commented out by default in `main.ts`. Uncomment and invoke as needed, or use the bot to manage instances.

## More

- For advanced configuration, check `tsconfig.json` and `.env`.
- See the [Bun documentation](https://bun.sh/docs) for runtime details.

---

> **Note:** This is a summary based on the available code and structure. For the most up-to-date or complete documentation, please refer to the [project on GitHub](https://github.com/thekingpin969/bandwidthselling).
