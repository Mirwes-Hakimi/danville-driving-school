import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppDataProvider } from './context/AppDataContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import StudentDashboard from './portals/StudentDashboard'
import AdminDashboard from './portals/AdminDashboard'

function ProtectedRoute({ children, role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
  return children
}

function AppShell() {
  const { user } = useAuth()
  // Don't show shared Navbar/Footer on dashboard routes
  const isDashboard = user && (window.location.pathname.startsWith('/student') || window.location.pathname.startsWith('/admin'))

  return (
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />
          <Landing />
          <Footer />
        </>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/student" element={
        <ProtectedRoute role="student">
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppDataProvider>
          <AppShell />
        </AppDataProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
