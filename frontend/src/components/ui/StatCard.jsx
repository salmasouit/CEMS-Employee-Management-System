import { Users, UserCheck, UserX, Building2, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';

const icons = {
  employees: Users,
  active: UserCheck,
  inactive: UserX,
  departments: Building2,
  roles: Shield,
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
};

const colors = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
};

const StatCard = ({ title, value, icon, color = 'blue' }) => {
  const Icon = icons[icon] || Users;
  return (
    <div className="card flex items-center gap-4">
      <div className={`rounded-xl p-3 ${colors[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value ?? 0}</p>
      </div>
    </div>
  );
};

export default StatCard;
