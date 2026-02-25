# Kasi Lami

Kasi Lami is a lightweight community forum for South African townships (“kasis”) — share **Events**, **Businesses**, **News**, and **Chat**. No login required.

### Live
https://kasi-lami.vercel.app/

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS + shadcn-ui
- Supabase (Postgres + Realtime)
- React Query + React Router

## Local Development

1) Install deps
- `npm ci`

2) Configure environment variables (do **not** commit these)

Create `.env.local` (recommended) with:
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_ANON_KEY=...`

3) Run dev server
- `npm run dev`

## Production (Vercel)

Vercel does **not** use your local `.env` file. Add these in **Vercel → Project → Settings → Environment Variables**:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Only the **anon/public** key is allowed in the browser.

## Supabase Database

1) Run `supabase-schema.sql` in Supabase SQL Editor (creates tables, indexes, and public RLS policies).
2) (Recommended) Run `supabase-hardening.sql` to add production constraints (length limits, non-empty checks).

## Useful Scripts
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run ci` (lint + typecheck + build)
