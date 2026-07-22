import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Landing } from '@/pages/Landing'

// Code-splitting par route : seul l'accueil est chargé immédiatement.
const DashboardLayout = lazy(() =>
  import('@/components/layout/DashboardLayout').then((m) => ({ default: m.DashboardLayout })),
)
const Login = lazy(() => import('@/pages/Login').then((m) => ({ default: m.Login })))
const AuthCallback = lazy(() => import('@/pages/AuthCallback').then((m) => ({ default: m.AuthCallback })))
const DashboardHome = lazy(() => import('@/pages/DashboardHome').then((m) => ({ default: m.DashboardHome })))
const Sites = lazy(() => import('@/pages/dashboard/Sites').then((m) => ({ default: m.Sites })))
const Scans = lazy(() => import('@/pages/dashboard/Scans').then((m) => ({ default: m.Scans })))
const ScanDetail = lazy(() => import('@/pages/dashboard/ScanDetail').then((m) => ({ default: m.ScanDetail })))
const Declarations = lazy(() => import('@/pages/dashboard/Declarations').then((m) => ({ default: m.Declarations })))
const Settings = lazy(() => import('@/pages/dashboard/Settings').then((m) => ({ default: m.Settings })))
const Blog = lazy(() => import('@/pages/Blog').then((m) => ({ default: m.Blog })))
const BlogPost = lazy(() => import('@/pages/BlogPost').then((m) => ({ default: m.BlogPost })))
const Rgaa = lazy(() => import('@/pages/Rgaa').then((m) => ({ default: m.Rgaa })))
const Pricing = lazy(() => import('@/pages/Pricing').then((m) => ({ default: m.Pricing })))
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })))
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })))
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })))
const Accessibilite = lazy(() => import('@/pages/Accessibilite').then((m) => ({ default: m.Accessibilite })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

function PageLoader() {
  return (
    <div className="min-h-[50vh] grid place-items-center" role="status">
      <div className="size-10 rounded-full border-4 border-border border-t-primary-2 animate-spin" aria-hidden="true" />
      <span className="sr-only">Chargement…</span>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route index element={<Landing />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="rgaa" element={<Rgaa />} />
              <Route path="tarifs" element={<Pricing />} />
              <Route path="a-propos" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="accessibilite" element={<Accessibilite />} />
              <Route path="legal/:slug" element={<LegalPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Dashboard (protégé) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="sites" element={<Sites />} />
              <Route path="scans" element={<Scans />} />
              <Route path="scans/:scanId" element={<ScanDetail />} />
              <Route path="declarations" element={<Declarations />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
