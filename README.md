# Batter Bites

A monorepo for the Batter Bites e-commerce site — selling traditional Indian batter mixes (idli, dosa, paniyaram, etc.) online.

## Structure

```
apps/
├── web/     — Next.js 15 frontend (static export for Cloudflare Pages)
└── api/     — Cloudflare Worker (API: catalog + product endpoints)
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, TypeScript
- **Backend**: Cloudflare Worker, TypeScript, Vitest
- **Package Manager**: pnpm (workspaces)
- **CI/CD**: GitHub Actions → Cloudflare Pages + Workers
- **Hosting**: CloudFlare (Pages + Workers)

## Development

```bash
# Install all dependencies
pnpm install

# Run frontend locally
pnpm dev:web

# Run API locally (requires wrangler)
pnpm dev:api

# Run API tests
pnpm test:api

# Build frontend
pnpm build:web
```

## Deployment

### CI/CD
Pushing to `main` triggers GitHub Actions:
1. Runs API tests
2. Deploys the Worker (`apps/api`) to Cloudflare
3. Builds and deploys the frontend (`apps/web`) to Cloudflare Pages

### Secrets Required (in GitHub repo settings)
- `CLOUDFLARE_API_TOKEN` — Cloudflare API token with Workers + Pages permissions
- `CF_ACCOUNT_ID` — Cloudflare account ID
- `NEXT_PUBLIC_API_URL` — Worker URL (e.g., `https://batter-bites-api.vineshraju.workers.dev`)

## Environment Variables

### Frontend (apps/web)
| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | API base URL | `https://batterbites.vineshraju.workers.dev` |

### API (apps/api)
Config is in `apps/api/wrangler.jsonc`. No env vars required currently.
