import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import { dashboardAPI } from '../services/endpoints';
import StatCard from '../components/ui/StatCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatDateTime } from '../utils/helpers';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartsRes] = await Promise.all([
          dashboardAPI.getStats(),
          dashboardAPI.getCharts(),
        ]);
        setStats(statsRes.data.data);
        setCharts(chartsRes.data.data);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  const deptData = charts?.employeesByDepartment?.map((d) => ({ name: d.name, value: d.count })) || [];
  const roleData = charts?.employeesByRole?.map((d) => ({ name: d.name, value: d.count })) || [];

  return (
    <div className="space-y-6">
      <h1 className="page-title">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Employees" value={stats?.totalEmployees} icon="employees" color="blue" />
        <StatCard title="Active Employees" value={stats?.activeEmployees} icon="active" color="green" />
        <StatCard title="Inactive Employees" value={stats?.inactiveEmployees} icon="inactive" color="red" />
        <StatCard title="Departments" value={stats?.totalDepartments} icon="departments" color="purple" />
        <StatCard title="Roles" value={stats?.totalRoles} icon="roles" color="indigo" />
        <StatCard title="Pending Leave" value={stats?.pendingLeave} icon="pending" color="yellow" />
        <StatCard title="Approved Leave" value={stats?.approvedLeave} icon="approved" color="green" />
        <StatCard title="Rejected Leave" value={stats?.rejectedLeave} icon="rejected" color="red" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="mb-4 font-semibold">Employees by Department</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="mb-4 font-semibold">Employees by Role</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={roleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {roleData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="mb-4 font-semibold">Monthly Leave Requests</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={charts?.monthlyLeave || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="mb-4 font-semibold">Monthly Activity</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={charts?.monthlyActivity || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="mb-4 font-semibold">Recent Activities</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 text-left font-medium">User</th>
                <th className="pb-3 text-left font-medium">Action</th>
                <th className="pb-3 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentActivities?.map((log) => (
                <tr key={log._id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3">{log.userId ? `${log.userId.firstName} ${log.userId.lastName}` : '-'}</td>
                  <td className="py-3">{log.action}</td>
                  <td className="py-3">{formatDateTime(log.createdAt)}</td>
                </tr>
              ))}
              {!stats?.recentActivities?.length && (
                <tr><td colSpan={3} className="py-8 text-center text-gray-500">No recent activities</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
