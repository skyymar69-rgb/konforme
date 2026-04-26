import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { AuthCallback } from '@/pages/AuthCallback'
import { DashboardHome } from '@/pages/DashboardHome'
import { DashboardStub } from '@/pages/DashboardStub'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route index element={<Landing />} />
            <Route path="blog" element={<DashboardStub title="Blog" description="Articles d'expertise RGAA, WCAG et EAA." />} />
            <Route path="rgaa" element={<DashboardStub title="Guide RGAA 4.1" description="Les 106 critères du référentiel français expliqués." />} />
            <Route path="a-propos" element={<DashboardStub title="À propos" description="L'équipe et la mission de Konforme." />} />
            <Route path="contact" element={<DashboardStub title="Contact" description="Une question ? On vous répond sous 24 h." />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Dashboard (protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="sites" element={<DashboardStub title="Sites" description="Gérer les sites surveillés." />} />
            <Route path="scans" element={<DashboardStub title="Scans" description="Historique des audits d'accessibilité." />} />
            <Route path="declarations" element={<DashboardStub title="Déclarations" description="Documents légaux RGAA / EAA." />} />
            <Route path="settings" element={<DashboardStub title="Paramètres" description="Compte, organisation, facturation." />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
