import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Roles from './pages/Roles';
import LeaveRequests from './pages/LeaveRequests';
import Notifications from './pages/Notifications';
import ActivityLogs from './pages/ActivityLogs';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import LoadingSpinner from './components/ui/LoadingSpinner';

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
      </Route>

      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<ProtectedRoute permissions={['view_dashboard']}><Dashboard /></ProtectedRoute>} />
        <Route path="/employees" element={<ProtectedRoute permissions={['manage_employees', 'view_employees']}><Employees /></ProtectedRoute>} />
        <Route path="/departments" element={<ProtectedRoute permissions={['manage_departments', 'view_departments']}><Departments /></ProtectedRoute>} />
        <Route path="/roles" element={<ProtectedRoute permissions={['manage_roles', 'view_roles']}><Roles /></ProtectedRoute>} />
        <Route path="/leave-requests" element={<ProtectedRoute permissions={['submit_leave', 'manage_leave_requests', 'approve_leave']}><LeaveRequests /></ProtectedRoute>} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/activity-logs" element={<ProtectedRoute permissions={['view_logs']}><ActivityLogs /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute permissions={['export_reports']}><Reports /></ProtectedRoute>} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
