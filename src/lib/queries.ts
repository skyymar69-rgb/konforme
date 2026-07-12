import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ID, Permission, Query, Role, type Models } from 'appwrite'
import {
  account,
  DB_ID,
  functions,
  SCAN_FUNCTION_ID,
  TABLES,
  tables,
  teams,
} from '@/lib/appwrite'
import type {
  Declaration,
  Membership,
  Scan,
  ScanIssue,
  Site,
} from '@/lib/database.types'

/* ------------------------------------------------------------------ */
/* Mapping rows Appwrite → types du domaine                            */
/* ------------------------------------------------------------------ */

type Row = Models.DefaultRow

function rowToSite(r: Row): Site {
  return {
    id: r.$id,
    organization_id: r.team_id as string,
    name: r.name as string,
    url: r.url as string,
    description: (r.description as string | null) ?? null,
    monitoring_enabled: (r.monitoring_enabled as boolean) ?? false,
    monitoring_frequency: (r.monitoring_frequency as Site['monitoring_frequency']) ?? 'weekly',
    last_scan_at: (r.last_scan_at as string | null) ?? null,
    last_score: (r.last_score as number | null) ?? null,
    created_at: r.$createdAt,
  }
}

function rowToScan(r: Row): Scan {
  return {
    id: r.$id,
    site_id: r.site_id as string,
    organization_id: r.team_id as string,
    status: r.status as Scan['status'],
    trigger: (r.trigger as Scan['trigger']) ?? 'manual',
    started_at: (r.started_at as string | null) ?? null,
    finished_at: (r.finished_at as string | null) ?? null,
    duration_ms: (r.duration_ms as number | null) ?? null,
    pages_count: (r.pages_count as number) ?? 0,
    issues_count: (r.issues_count as number) ?? 0,
    score: (r.score as number | null) ?? null,
    rgaa_score: (r.rgaa_score as number | null) ?? null,
    wcag_score: (r.wcag_score as number | null) ?? null,
    error: (r.error as string | null) ?? null,
    created_at: r.$createdAt,
    sites: { name: (r.site_name as string) ?? '—', url: (r.site_url as string) ?? '' },
  }
}

function rowToIssue(r: Row): ScanIssue {
  return {
    id: r.$id,
    scan_id: r.scan_id as string,
    rule_id: r.rule_id as string,
    severity: r.severity as ScanIssue['severity'],
    category: (r.category as string | null) ?? null,
    title: r.title as string,
    description: (r.description as string | null) ?? null,
    page_url: (r.page_url as string | null) ?? null,
    selector: (r.selector as string | null) ?? null,
    html_snippet: (r.html_snippet as string | null) ?? null,
    suggested_fix: (r.suggested_fix as string | null) ?? null,
    status: (r.status as ScanIssue['status']) ?? 'open',
    created_at: r.$createdAt,
  }
}

function rowToDeclaration(r: Row): Declaration {
  return {
    id: r.$id,
    site_id: r.site_id as string,
    organization_id: r.team_id as string,
    conformity_level: r.conformity_level as Declaration['conformity_level'],
    conformity_rate: (r.conformity_rate as number | null) ?? null,
    reference_standard: (r.reference_standard as string) ?? 'RGAA-4.1',
    audit_method: (r.audit_method as string) ?? 'auto',
    contact_email: (r.contact_email as string | null) ?? null,
    published_at: (r.published_at as string) ?? r.$createdAt,
    created_at: r.$createdAt,
    sites: { name: (r.site_name as string) ?? '—', url: (r.site_url as string) ?? '' },
  }
}

function teamPermissions(teamId: string): string[] {
  return [
    Permission.read(Role.team(teamId)),
    Permission.update(Role.team(teamId)),
    Permission.delete(Role.team(teamId)),
  ]
}

/* ------------------------------------------------------------------ */
/* Organisation courante = première team Appwrite de l'utilisateur     */
/* (créée automatiquement au premier passage)                          */
/* ------------------------------------------------------------------ */

export function useMembership() {
  return useQuery({
    queryKey: ['membership'],
    queryFn: async (): Promise<Membership | null> => {
      const me = await account.get()
      let list = await teams.list()
      if (list.teams.length === 0) {
        // Première connexion : on crée l'espace personnel (le créateur est owner)
        await teams.create({
          teamId: ID.unique(),
          name: `${me.name || me.email.split('@')[0]} — Espace personnel`,
        })
        list = await teams.list()
      }
      const team = list.teams[0]
      let role: Membership['role'] = 'member'
      try {
        const memberships = await teams.listMemberships({
          teamId: team.$id,
          queries: [Query.equal('userId', me.$id)],
        })
        const roles = memberships.memberships[0]?.roles ?? []
        role = roles.includes('owner') ? 'owner' : roles.includes('admin') ? 'admin' : 'member'
      } catch {
        /* listMemberships peut être restreint : on reste 'member' */
      }
      return {
        organization_id: team.$id,
        user_id: me.$id,
        role,
        organizations: { id: team.$id, name: team.name, plan: 'free' },
      }
    },
    staleTime: 5 * 60_000,
  })
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const me = await account.get()
      return { id: me.$id, email: me.email, full_name: me.name }
    },
  })
}

export function useUpdateProfile() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (patch: { full_name?: string }) => {
      if (patch.full_name !== undefined) {
        await account.updateName({ name: patch.full_name })
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}

export function useUpdateOrganization(orgId: string | undefined) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (patch: { name: string }) => {
      if (!orgId) throw new Error('Organisation introuvable')
      await teams.updateName({ teamId: orgId, name: patch.name })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['membership'] }),
  })
}

/* ------------------------------------------------------------------ */
/* Sites                                                               */
/* ------------------------------------------------------------------ */

export function useSites(orgId: string | undefined) {
  return useQuery({
    queryKey: ['sites', orgId],
    enabled: !!orgId,
    queryFn: async (): Promise<Site[]> => {
      const res = await tables.listRows({
        databaseId: DB_ID,
        tableId: TABLES.sites,
        queries: [Query.equal('team_id', orgId!), Query.orderDesc('$createdAt'), Query.limit(100)],
      })
      return res.rows.map(rowToSite)
    },
  })
}

export function useAddSite(orgId: string | undefined) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { name: string; url: string; description?: string }) => {
      if (!orgId) throw new Error('Organisation introuvable')
      const row = await tables.createRow({
        databaseId: DB_ID,
        tableId: TABLES.sites,
        rowId: ID.unique(),
        data: {
          team_id: orgId,
          name: input.name,
          url: input.url,
          description: input.description || null,
        },
        permissions: teamPermissions(orgId),
      })
      return rowToSite(row)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sites'] }),
  })
}

export function useDeleteSite() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (siteId: string) => {
      await tables.deleteRow({ databaseId: DB_ID, tableId: TABLES.sites, rowId: siteId })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sites'] })
      qc.invalidateQueries({ queryKey: ['scans'] })
    },
  })
}

/* ------------------------------------------------------------------ */
/* Scans                                                               */
/* ------------------------------------------------------------------ */

export function useScans(orgId: string | undefined, siteId?: string) {
  return useQuery({
    queryKey: ['scans', orgId, siteId ?? 'all'],
    enabled: !!orgId,
    queryFn: async (): Promise<Scan[]> => {
      const queries = [
        Query.equal('team_id', orgId!),
        Query.orderDesc('$createdAt'),
        Query.limit(100),
      ]
      if (siteId) queries.push(Query.equal('site_id', siteId))
      const res = await tables.listRows({
        databaseId: DB_ID,
        tableId: TABLES.scans,
        queries,
      })
      return res.rows.map(rowToScan)
    },
    // Rafraîchit tant qu'un scan tourne
    refetchInterval: (query) =>
      query.state.data?.some((s) => s.status === 'pending' || s.status === 'running')
        ? 2500
        : false,
  })
}

export function useScan(scanId: string | undefined) {
  return useQuery({
    queryKey: ['scan', scanId],
    enabled: !!scanId,
    queryFn: async (): Promise<Scan | null> => {
      try {
        const row = await tables.getRow({
          databaseId: DB_ID,
          tableId: TABLES.scans,
          rowId: scanId!,
        })
        return rowToScan(row)
      } catch {
        return null
      }
    },
    refetchInterval: (query) => {
      const s = query.state.data?.status
      return s === 'pending' || s === 'running' ? 2000 : false
    },
  })
}

export function useScanIssues(scanId: string | undefined) {
  return useQuery({
    queryKey: ['scan-issues', scanId],
    enabled: !!scanId,
    queryFn: async (): Promise<ScanIssue[]> => {
      const out: ScanIssue[] = []
      let cursor: string | undefined
      // Pagination : un scan peut dépasser 100 issues
      for (;;) {
        const queries = [Query.equal('scan_id', scanId!), Query.limit(100)]
        if (cursor) queries.push(Query.cursorAfter(cursor))
        const res = await tables.listRows({
          databaseId: DB_ID,
          tableId: TABLES.scan_issues,
          queries,
        })
        out.push(...res.rows.map(rowToIssue))
        if (res.rows.length < 100) break
        cursor = res.rows[res.rows.length - 1].$id
      }
      return out
    },
  })
}

export function useUpdateIssueStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: { id: string; status: ScanIssue['status'] }) => {
      await tables.updateRow({
        databaseId: DB_ID,
        tableId: TABLES.scan_issues,
        rowId: input.id,
        data: {
          status: input.status,
          fixed_at: input.status === 'fixed' ? new Date().toISOString() : null,
        },
      })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['scan-issues'] }),
  })
}

/** Nombre d'issues critiques ouvertes sur un ensemble de scans. */
export async function countCriticalIssues(scanIds: string[]): Promise<number> {
  if (scanIds.length === 0) return 0
  const res = await tables.listRows({
    databaseId: DB_ID,
    tableId: TABLES.scan_issues,
    queries: [
      Query.equal('scan_id', scanIds),
      Query.equal('severity', 'critical'),
      Query.equal('status', ['open', 'in_progress']),
      Query.limit(1),
    ],
    total: true,
  })
  return res.total ?? 0
}

/**
 * Lance un audit : crée le scan côté client (statut pending) puis déclenche
 * la fonction serverless `scan-site` qui l'exécute et le complète.
 */
export function useLaunchScan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (site: Site): Promise<{ scan_id: string }> => {
      const scanRow = await tables.createRow({
        databaseId: DB_ID,
        tableId: TABLES.scans,
        rowId: ID.unique(),
        data: {
          site_id: site.id,
          team_id: site.organization_id,
          status: 'pending',
          trigger: 'manual',
          site_name: site.name,
          site_url: site.url,
          started_at: new Date().toISOString(),
        },
        permissions: teamPermissions(site.organization_id),
      })
      try {
        await functions.createExecution({
          functionId: SCAN_FUNCTION_ID,
          body: JSON.stringify({ scan_id: scanRow.$id }),
          async: true,
        })
      } catch (e) {
        await tables.updateRow({
          databaseId: DB_ID,
          tableId: TABLES.scans,
          rowId: scanRow.$id,
          data: { status: 'failed', error: "Le moteur d'analyse est injoignable." },
        })
        const msg =
          e instanceof Error && /not found|404/i.test(e.message)
            ? "Le moteur d'analyse n'est pas encore déployé (fonction scan-site absente)."
            : "Le moteur d'analyse est injoignable. Réessayez dans quelques instants."
        throw new Error(msg, { cause: e })
      }
      return { scan_id: scanRow.$id }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['scans'] })
      qc.invalidateQueries({ queryKey: ['sites'] })
    },
  })
}

/* ------------------------------------------------------------------ */
/* Déclarations                                                        */
/* ------------------------------------------------------------------ */

export function useDeclarations(orgId: string | undefined) {
  return useQuery({
    queryKey: ['declarations', orgId],
    enabled: !!orgId,
    queryFn: async (): Promise<Declaration[]> => {
      const res = await tables.listRows({
        databaseId: DB_ID,
        tableId: TABLES.declarations,
        queries: [Query.equal('team_id', orgId!), Query.orderDesc('$createdAt'), Query.limit(100)],
      })
      return res.rows.map(rowToDeclaration)
    },
  })
}

export function useCreateDeclaration(orgId: string | undefined) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (input: {
      site: Site
      conformity_level: Declaration['conformity_level']
      conformity_rate: number | null
      contact_email: string
    }) => {
      if (!orgId) throw new Error('Organisation introuvable')
      const row = await tables.createRow({
        databaseId: DB_ID,
        tableId: TABLES.declarations,
        rowId: ID.unique(),
        data: {
          team_id: orgId,
          site_id: input.site.id,
          site_name: input.site.name,
          site_url: input.site.url,
          conformity_level: input.conformity_level,
          conformity_rate: input.conformity_rate,
          contact_email: input.contact_email,
          reference_standard: 'RGAA-4.1',
          audit_method: 'auto',
          published_at: new Date().toISOString(),
        },
        permissions: teamPermissions(orgId),
      })
      return rowToDeclaration(row)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['declarations'] }),
  })
}
