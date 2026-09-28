import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Building2, Shield, CalendarDays, Bell, FileText,
  Activity, User, LogOut, Menu, X, Moon, Sun, ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getImageUrl } from '../services/api';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', permissions: ['view_dashboard'] },
  { to: '/employees', icon: Users, label: 'Employees', permissions: ['manage_employees', 'view_employees'] },
  { to: '/departments', icon: Building2, label: 'Departments', permissions: ['manage_departments', 'view_departments'] },
  { to: '/roles', icon: Shield, label: 'Roles', permissions: ['manage_roles', 'view_roles'] },
  { to: '/leave-requests', icon: CalendarDays, label: 'Leave Requests', permissions: ['submit_leave', 'manage_leave_requests', 'approve_leave'] },
  { to: '/notifications', icon: Bell, label: 'Notifications', permissions: [] },
  { to: '/activity-logs', icon: Activity, label: 'Activity Logs', permissions: ['view_logs'] },
  { to: '/reports', icon: FileText, label: 'Reports', permissions: ['export_reports'] },
  { to: '/profile', icon: User, label: 'Profile', permissions: [] },
];

const DashboardLayout = () => {
  const { user, logout, hasAnyPermission } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const filteredNav = navItems.filter(
    (item) => item.permissions.length === 0 || hasAnyPermission(...item.permissions)
  );

  const avatarUrl = getImageUrl(user?.profilePicture);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-dynamic">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/20 bg-white/70 shadow-glass backdrop-blur-xl transition-transform duration-300 dark:border-slate-700/50 dark:bg-surface-dark/70 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/20 px-6 dark:border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-neon">
              <span className="text-xl font-bold text-white font-display">C</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 dark:text-white font-display tracking-wide">CEMS</h1>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Canal Informatique</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4 scrollbar-thin">
          {filteredNav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100/50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white'
                }`
              }
            >
              <Icon className={`h-5 w-5 ${window.location.pathname.startsWith(to) ? 'text-primary-500' : 'opacity-70'}`} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        <header className="relative z-50 flex h-20 items-center justify-between border-b border-white/20 bg-white/40 px-4 shadow-sm backdrop-blur-md dark:border-slate-700/50 dark:bg-surface-dark/40 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="rounded-xl p-2 text-slate-600 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-slate-800/50 lg:hidden transition-colors">
            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-auto flex items-center gap-4">
            <button onClick={toggleTheme} className="rounded-xl p-2.5 text-slate-600 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-slate-800/60 transition-all hover:scale-105 active:scale-95">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover shadow-sm ring-2 ring-white dark:ring-slate-700" />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-sm font-bold text-primary-700 shadow-sm ring-2 ring-white dark:from-primary-900 dark:to-primary-800 dark:text-primary-300 dark:ring-slate-700">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                )}
                <div className="hidden text-left sm:block">
                  <span className="block text-sm font-semibold text-slate-700 dark:text-white leading-tight">{user?.firstName} {user?.lastName}</span>
                  <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">{user?.roleId?.name}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 z-20 mt-3 w-56 animate-slide-up rounded-2xl border border-white/40 bg-white/80 p-2 shadow-glass backdrop-blur-xl dark:border-slate-700/50 dark:bg-surface-dark/90">
                    <div className="mb-2 border-b border-slate-100 px-3 pb-3 pt-2 dark:border-slate-700/50">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => { navigate('/profile'); setProfileOpen(false); }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
                    >
                      <User className="h-4 w-4" /> My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
