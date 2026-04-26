# Konforme — accessibilité web RGAA & WCAG automatisée par IA

Plateforme SaaS éditée par **KAYZEN SASU** (Lyon).

Stack : **Vite 8 + React 19 + TypeScript + Tailwind v4 + Supabase (Postgres + Auth Google + Storage)** + TanStack Query + Zustand + React Hook Form + Zod + Recharts.

---

## Démarrage rapide

```bash
npm install
cp .env.example .env.local       # remplir les valeurs (voir ci-dessous)
node scripts/migrate.cjs         # applique le schéma SQL initial
npm run dev                      # http://localhost:5173
```

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Vite dev server (port 5173) |
| `npm run build` | Build de production (`dist/`) |
| `npm run preview` | Sert le build de production en local |
| `npm run lint` | ESLint |
| `node scripts/migrate.cjs` | Applique les migrations SQL pendantes (idempotent, suit `_migrations`) |
| `node scripts/backfill-users.cjs` | Crée profils + orgs perso pour les `auth.users` antérieurs au schéma |

## Variables d'environnement

Voir `.env.example` pour la liste complète. Récap :

- `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` — exposées au navigateur
- `SUPABASE_SERVICE_ROLE_KEY` + `SUPABASE_DB_PASSWORD` — server-only, jamais exposées
- `GOOGLE_OAUTH_CLIENT_ID` + `GOOGLE_OAUTH_CLIENT_SECRET` — pour info, configurés directement dans Supabase Auth

---

## Configuration Supabase

1. **Créer le projet** sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Récupérer dans **Settings > API Keys** :
   - URL du projet → `VITE_SUPABASE_URL`
   - `anon public` (legacy JWT) → `VITE_SUPABASE_ANON_KEY`
   - `service_role` (legacy JWT, secret) → `SUPABASE_SERVICE_ROLE_KEY`
3. Récupérer dans **Settings > Database** : le mot de passe Postgres → `SUPABASE_DB_PASSWORD`
4. **Appliquer le schéma** : `node scripts/migrate.cjs`

## Configuration Google OAuth

1. **Google Cloud Console** > **APIs & Services** > **Credentials** > Créer un OAuth Client ID (Application Web)
2. **Origines JavaScript autorisées** : ajouter
   - `http://localhost:5173`
   - votre URL de production (ex. `https://konforme.kayzen-lyon.fr`)
3. **URI de redirection autorisés** : ajouter le callback Supabase
   - `https://<project-ref>.supabase.co/auth/v1/callback`
4. Récupérer Client ID + Secret (créer un secret via "+ Add secret" si nécessaire — le download JSON contient la valeur en clair)
5. Dans **Supabase Dashboard** > **Authentication** > **Sign In / Providers** > **Google** :
   - Coller le Client ID + Secret
   - Activer le toggle "Enable Sign in with Google"
   - Save
6. Dans **Authentication** > **URL Configuration** :
   - **Site URL** : votre URL de production
   - **Redirect URLs** : `http://localhost:5173/**`, `https://votre-domaine.fr/**`

---

## Architecture

```
src/
├── App.tsx                       # Router (BrowserRouter + Routes)
├── main.tsx                      # Entry: <App />
├── index.css                     # Tailwind v4 import + design tokens
├── components/
│   ├── ProtectedRoute.tsx        # Garde les routes /dashboard
│   ├── layout/
│   │   ├── Header.tsx            # Header public avec bouton Contact (drawer QR)
│   │   ├── Footer.tsx            # Footer avec credit Kayzen Web
│   │   ├── PublicLayout.tsx      # Skip-link + Header + Footer
│   │   └── DashboardLayout.tsx   # Sidebar + main
│   └── ui/                       # Button, Card, Input, Skeleton, Logo (shadcn-style)
├── contexts/
│   └── AuthContext.tsx           # Supabase session, signInWithGoogle, signOut
├── lib/
│   ├── supabase.ts               # Client Supabase (PKCE flow)
│   └── utils.ts                  # cn(), formatDate, formatNumber
├── pages/
│   ├── Landing.tsx               # Hero + features + CTA
│   ├── Login.tsx                 # Bouton "Continuer avec Google"
│   ├── AuthCallback.tsx          # Reçoit le code OAuth, redirige /dashboard
│   ├── DashboardHome.tsx         # KPI cards animés + steps onboarding
│   └── DashboardStub.tsx         # Placeholder pour pages en cours de dev
└── types/
```

### Schéma DB

`supabase/migrations/0001_initial_schema.sql` :

- `profiles` (1-1 avec `auth.users`, peuplé via trigger `handle_new_user`)
- `organizations` + `organization_members` (multi-tenant, RBAC : owner/admin/member/viewer)
  - À chaque signup, une org perso est créée auto via `handle_new_user_org`
- `sites` (sites surveillés) + `scans` (audits) + `scan_issues` (findings RGAA/WCAG)
- `accessibility_declarations` (déclarations légales)
- `subscriptions` (lien Stripe pour plus tard)
- **RLS activée** sur toutes les tables, policies basées sur `is_member_of(org_id)` et `is_admin_of(org_id)`

---

## Déploiement

Voir `vercel.json` du projet pour les rewrites SPA et headers.

À faire :
- Ajouter les variables d'environnement Vercel (Settings > Environment Variables)
- Reconnecter le projet GitHub à Vercel pour auto-deploy

---

## Crédit

Édité par **KAYZEN SASU** — 6 rue Pierre Termier, 69009 Lyon — SIREN 999 418 346.
Réalisé par [Kayzen Web](https://internet.kayzen-lyon.fr).
