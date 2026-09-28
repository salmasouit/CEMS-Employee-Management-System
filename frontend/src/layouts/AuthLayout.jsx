import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => (
  <div className="flex min-h-screen bg-gradient-dynamic">
    <div className="hidden w-1/2 relative overflow-hidden lg:flex lg:flex-col lg:justify-center lg:px-16 border-r border-white/10">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-br from-primary-800 via-primary-600 to-indigo-900 rounded-full blur-3xl opacity-80 mix-blend-multiply animate-pulse-slow"></div>
      
      <div className="relative z-10 text-white backdrop-blur-sm bg-white/5 p-12 rounded-3xl border border-white/20 shadow-glass">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-neon">
            <span className="text-2xl font-bold text-primary-600 font-display">C</span>
          </div>
          <h1 className="text-5xl font-display font-bold tracking-tight">CEMS</h1>
        </div>
        <p className="mb-4 text-2xl font-medium tracking-wide">Enterprise HR Platform</p>
        <p className="text-primary-100 text-lg leading-relaxed mb-8">
          Manage employees, departments, leave requests, and track activities securely with our scalable and modern ecosystem.
        </p>
        <div className="space-y-4 text-base font-medium text-white/90">
          <div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div> Role-Based Access Control</div>
          <div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div> Leave Management Workflow</div>
          <div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div> Real-time Notifications</div>
          <div className="flex items-center gap-3"><div className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]"></div> Advanced Analytics & Reports</div>
        </div>
      </div>
    </div>
    <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 relative z-10">
      <div className="mx-auto w-full max-w-md animate-fade-in card bg-white/80 dark:bg-surface-dark/90 p-8 shadow-glass backdrop-blur-xl">
        <div className="mb-8 lg:hidden text-center">
          <Link to="/" className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-neon mb-3">
             <span className="text-2xl font-bold text-white font-display">C</span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">CEMS</h1>
        </div>
        <Outlet />
      </div>
    </div>
  </div>
);

export default AuthLayout;
