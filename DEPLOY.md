# Deploying bookit

bookit runs on **Vercel** (Next.js host) + **Neon** (serverless Postgres) +
**Vercel Blob** (image uploads). All three have free tiers that are plenty for a
feedback-stage site. Once set up, every `git push` to `main` redeploys, and every
pull request gets its own preview URL — ideal for sharing changes with clients.

## What you'll need
- A **GitHub** repo (already: `KalemdzievskiV/Travel-Agency`).
- A **Vercel** account (sign in with GitHub).
- A **Neon** account (free Postgres).

## Environment variables (set these in Vercel → Project → Settings → Environment Variables)
| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Neon **pooled** connection string (host ends in `-pooler`, include `?sslmode=require`). |
| `AUTH_SECRET` | Generate: `openssl rand -base64 32`. |
| `BLOB_READ_WRITE_TOKEN` | From a Vercel Blob store (Storage tab). Required — uploads fail without it in prod. |
| `NEXT_PUBLIC_SITE_URL` | Your public URL, e.g. `https://your-app.vercel.app` (set after the first deploy, or your custom domain). |

`.env.local` is git-ignored and only for local dev — production values live in Vercel.

---

## Steps

### 1. Create the database (Neon)
1. Create a project at <https://neon.tech>.
2. Copy the **pooled** connection string from the dashboard.

### 2. Set up the schema + first admin (run once, locally, against Neon)
The public home and destinations pages are prerendered at build time and read from
the database, so **the tables must exist (and ideally be seeded) before the first
Vercel build.** Point your local tools at Neon and run:

```bash
# temporarily put the Neon URL in .env.local (or prefix the commands)
DATABASE_URL="<neon-pooled-url>" npm run db:migrate
DATABASE_URL="<neon-pooled-url>" npm run db:seed
DATABASE_URL="<neon-pooled-url>" ADMIN_EMAIL="you@bookit.mk" ADMIN_PASSWORD="<strong-pass>" npm run db:create-admin
```

> Restore your local dev `DATABASE_URL` (the Docker one) in `.env.local` afterwards.

### 3. Create a Vercel Blob store (for admin image uploads)
Vercel → your project → **Storage** → create a **Blob** store → copy its
`BLOB_READ_WRITE_TOKEN`.

### 4. Push to GitHub
```bash
git push origin main
```

### 5. Import into Vercel
1. Vercel → **Add New → Project** → import `KalemdzievskiV/Travel-Agency`.
2. Framework preset: **Next.js** (auto-detected). Leave build/output defaults.
3. Add the four env vars above (you can set `NEXT_PUBLIC_SITE_URL` after step 6 and redeploy).
4. **Deploy.**

### 6. Finish
- Note the deployment URL, set `NEXT_PUBLIC_SITE_URL` to it, and redeploy (or add a
  custom domain like `bookit.mk` under Settings → Domains).
- Visit `/login` and sign in with the admin you created in step 2.

---

## Day-to-day
- **Make changes → push → it deploys.** `git push origin main` redeploys production.
- **Client feedback:** open a branch / PR; Vercel posts a **preview URL** for that
  change. Share it, gather feedback, merge when happy.
- **Schema changes:** after editing `src/db/schema.ts`, generate + apply a migration,
  then run it against Neon before deploying:
  ```bash
  npm run db:generate
  DATABASE_URL="<neon-pooled-url>" npm run db:migrate
  ```
- **Content edits** (destinations/trips/etc.) are done in `/admin` and show on the
  live site immediately (on-demand revalidation) — no redeploy needed.

## Local development
```bash
docker start bookit-pg          # or: docker run -d --name bookit-pg -e POSTGRES_USER=bookit -e POSTGRES_PASSWORD=bookit -e POSTGRES_DB=bookit -p 5434:5432 postgres:16
npm install
npm run db:migrate && npm run db:seed && npm run db:create-admin
npm run dev                     # http://localhost:3000
```
If the dev server ever renders unstyled after a big refactor, stop it, `rm -rf .next`,
and restart (stale Turbopack cache).

## Notes / gotchas
- **Uploads need Blob in prod** — the local-disk fallback can't write on Vercel.
- **DB before first build** — migrate/seed Neon before importing to Vercel, or the
  build-time prerender of `/` and `/destinations` will fail on missing tables.
- **Auth** works on Vercel out of the box (`trustHost`, HTTPS secure-cookie handling
  are already wired); just set `AUTH_SECRET`.
- Vercel **Hobby** is free for non-commercial use; upgrade to Pro when it goes
  commercial.
