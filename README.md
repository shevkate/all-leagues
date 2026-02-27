# All Leagues

A single-page application that fetches and displays sports leagues from [TheSportsDB](https://www.thesportsdb.com/), with filtering by name and sport type. Clicking a league loads its season badge image.

Built with Vue 3 + TypeScript + Vite.

**Live demo:** https://shevkate.github.io/all-leagues/

## Prerequisites

- Node.js 18+

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/shevkate/all-leagues.git
cd all-leagues

# 2. Create the environment file
cp .env.example .env

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL for TheSportsDB API |

The default value in `.env.example` uses the free API key and is ready to use without any changes.
