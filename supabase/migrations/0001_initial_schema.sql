-- ============================================================
-- Konforme — initial schema
-- 2026-04-26 · KAYZEN SASU
-- ============================================================
-- Multi-tenant: each user belongs to one or more organizations.
-- Sites and scans are scoped per organization.
-- All tables have RLS enabled with policies based on org membership.
-- ============================================================

create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- 1. profiles  (1-to-1 with auth.users)
-- ------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  locale text default 'fr-FR',
  marketing_opt_in boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
comment on table public.profiles is 'Public-facing user info, mirrored from auth.users on signup';
create index profiles_email_idx on public.profiles(email);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- 2. organizations
-- ------------------------------------------------------------
create table public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  plan text default 'free' check (plan in ('free','pro','enterprise')),
  trial_ends_at timestamptz,
  stripe_customer_id text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
create index organizations_slug_idx on public.organizations(slug);

-- ------------------------------------------------------------
-- 3. organization_members  (m-to-m profiles<->orgs)
-- ------------------------------------------------------------
create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','member','viewer')),
  invited_by uuid references public.profiles(id) on delete set null,
  joined_at timestamptz default now() not null,
  primary key (organization_id, user_id)
);
create index organization_members_user_idx on public.organization_members(user_id);

-- Auto-create personal org on signup
create or replace function public.handle_new_user_org()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_org_id uuid;
  new_slug text;
begin
  new_slug := lower(regexp_replace(coalesce(new.full_name, split_part(new.email, '@', 1)), '[^a-z0-9]+', '-', 'g')) || '-' || substr(new.id::text, 1, 8);
  insert into public.organizations (name, slug, created_by)
  values (
    coalesce(new.full_name, split_part(new.email, '@', 1)) || ' — Espace personnel',
    new_slug,
    new.id
  )
  returning id into new_org_id;

  insert into public.organization_members (organization_id, user_id, role)
  values (new_org_id, new.id, 'owner');

  return new;
end;
$$;

create or replace trigger on_profile_created_init_org
  after insert on public.profiles
  for each row execute function public.handle_new_user_org();

-- ------------------------------------------------------------
-- 4. sites  (sites being audited)
-- ------------------------------------------------------------
create table public.sites (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  url text not null,
  description text,
  monitoring_enabled boolean default false,
  monitoring_frequency text default 'weekly' check (monitoring_frequency in ('daily','weekly','monthly')),
  last_scan_at timestamptz,
  last_score numeric(5,2),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
create index sites_org_idx on public.sites(organization_id);
create index sites_url_idx on public.sites(url);

-- ------------------------------------------------------------
-- 5. scans  (audit runs)
-- ------------------------------------------------------------
create table public.scans (
  id uuid primary key default uuid_generate_v4(),
  site_id uuid not null references public.sites(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','running','done','failed')),
  trigger text default 'manual' check (trigger in ('manual','schedule','api','ci')),
  started_at timestamptz default now(),
  finished_at timestamptz,
  duration_ms integer,
  pages_count integer default 0,
  issues_count integer default 0,
  score numeric(5,2),
  rgaa_score numeric(5,2),
  wcag_score numeric(5,2),
  report_url text,
  error text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null
);
create index scans_site_idx on public.scans(site_id);
create index scans_org_idx on public.scans(organization_id);
create index scans_status_idx on public.scans(status) where status in ('pending','running');

-- ------------------------------------------------------------
-- 6. scan_issues  (per-issue findings, denormalized for query speed)
-- ------------------------------------------------------------
create table public.scan_issues (
  id uuid primary key default uuid_generate_v4(),
  scan_id uuid not null references public.scans(id) on delete cascade,
  rule_id text not null,           -- e.g. "RGAA-1.1.1" or "WCAG-1.4.3"
  severity text not null check (severity in ('critical','serious','moderate','minor')),
  category text,                    -- e.g. "Images", "Couleurs"
  title text not null,
  description text,
  page_url text,
  selector text,
  html_snippet text,
  suggested_fix text,
  status text default 'open' check (status in ('open','in_progress','fixed','wont_fix','false_positive')),
  fixed_at timestamptz,
  created_at timestamptz default now() not null
);
create index scan_issues_scan_idx on public.scan_issues(scan_id);
create index scan_issues_severity_idx on public.scan_issues(severity);

-- ------------------------------------------------------------
-- 7. accessibility_declarations
-- ------------------------------------------------------------
create table public.accessibility_declarations (
  id uuid primary key default uuid_generate_v4(),
  site_id uuid not null references public.sites(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  conformity_level text not null check (conformity_level in ('total','partial','non_conforme')),
  conformity_rate numeric(5,2),
  reference_standard text default 'RGAA-4.1',
  audit_method text default 'auto',
  audit_org text,
  contact_email text,
  exemptions jsonb default '[]'::jsonb,
  action_plan jsonb default '[]'::jsonb,
  published_at timestamptz default now(),
  pdf_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null
);
create index accessibility_declarations_site_idx on public.accessibility_declarations(site_id);

-- ------------------------------------------------------------
-- 8. subscriptions  (Stripe link, future)
-- ------------------------------------------------------------
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  stripe_subscription_id text unique,
  stripe_price_id text,
  status text not null,             -- active, trialing, past_due, canceled, incomplete
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
create index subscriptions_org_idx on public.subscriptions(organization_id);

-- ============================================================
-- RLS POLICIES
-- ============================================================
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.sites enable row level security;
alter table public.scans enable row level security;
alter table public.scan_issues enable row level security;
alter table public.accessibility_declarations enable row level security;
alter table public.subscriptions enable row level security;

-- Helper: is user member of org ?
create or replace function public.is_member_of(_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members
    where organization_id = _org_id and user_id = auth.uid()
  );
$$;

-- Helper: is user admin/owner of org ?
create or replace function public.is_admin_of(_org_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members
    where organization_id = _org_id
      and user_id = auth.uid()
      and role in ('owner','admin')
  );
$$;

-- profiles : users see/edit only their own profile
create policy "profiles_self_select" on public.profiles
  for select using (id = auth.uid());
create policy "profiles_self_update" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

-- organizations : members can read; admins can update
create policy "orgs_member_select" on public.organizations
  for select using (public.is_member_of(id));
create policy "orgs_admin_update" on public.organizations
  for update using (public.is_admin_of(id));

-- organization_members : users see members of their orgs
create policy "members_select" on public.organization_members
  for select using (public.is_member_of(organization_id));
create policy "members_admin_insert" on public.organization_members
  for insert with check (public.is_admin_of(organization_id));
create policy "members_admin_delete" on public.organization_members
  for delete using (public.is_admin_of(organization_id));

-- sites : member can read/insert/update; admin to delete
create policy "sites_select" on public.sites
  for select using (public.is_member_of(organization_id));
create policy "sites_insert" on public.sites
  for insert with check (public.is_member_of(organization_id));
create policy "sites_update" on public.sites
  for update using (public.is_member_of(organization_id));
create policy "sites_delete" on public.sites
  for delete using (public.is_admin_of(organization_id));

-- scans : member of org
create policy "scans_select" on public.scans
  for select using (public.is_member_of(organization_id));
create policy "scans_insert" on public.scans
  for insert with check (public.is_member_of(organization_id));

-- scan_issues : member of org of related scan
create policy "scan_issues_select" on public.scan_issues
  for select using (
    exists (select 1 from public.scans s where s.id = scan_id and public.is_member_of(s.organization_id))
  );
create policy "scan_issues_update" on public.scan_issues
  for update using (
    exists (select 1 from public.scans s where s.id = scan_id and public.is_member_of(s.organization_id))
  );

-- accessibility_declarations
create policy "decls_select" on public.accessibility_declarations
  for select using (public.is_member_of(organization_id));
create policy "decls_insert" on public.accessibility_declarations
  for insert with check (public.is_member_of(organization_id));

-- subscriptions : read for members, no write from client (handled by webhooks via service_role)
create policy "subs_select" on public.subscriptions
  for select using (public.is_member_of(organization_id));

-- ============================================================
-- TRIGGERS — updated_at
-- ============================================================
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end;
$$;

create trigger profiles_updated before update on public.profiles for each row execute function public.touch_updated_at();
create trigger orgs_updated before update on public.organizations for each row execute function public.touch_updated_at();
create trigger sites_updated before update on public.sites for each row execute function public.touch_updated_at();
create trigger subs_updated before update on public.subscriptions for each row execute function public.touch_updated_at();
