import { useEffect, useState } from 'react';
import { activityLogAPI } from '../services/endpoints';
import { useToast } from '../context/ToastContext';
import Pagination from '../components/ui/Pagination';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatDateTime, getErrorMessage } from '../utils/helpers';

const ActivityLogs = () => {
  const { addToast } = useToast();
  const [logs, setLogs] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');

  const fetchLogs = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await activityLogAPI.getAll({ page, limit: 15, action: actionFilter });
      setLogs(data.data);
      setMeta(data.meta);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(1); }, [actionFilter]);

  return (
    <div className="space-y-6">
      <h1 className="page-title">Activity Logs</h1>

      <div className="card space-y-4">
        <input
          type="text"
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          placeholder="Filter by action..."
          className="input-field max-w-xs"
        />

        {loading ? <LoadingSpinner className="py-12" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left">User</th>
                  <th className="pb-3 text-left">Action</th>
                  <th className="pb-3 text-left">Browser</th>
                  <th className="pb-3 text-left">IP Address</th>
                  <th className="pb-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3">{log.userId ? `${log.userId.firstName} ${log.userId.lastName}` : '-'}</td>
                    <td className="py-3"><span className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-700">{log.action}</span></td>
                    <td className="py-3 max-w-xs truncate text-xs text-gray-500">{log.browser}</td>
                    <td className="py-3">{log.ipAddress}</td>
                    <td className="py-3">{formatDateTime(log.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={fetchLogs} />
      </div>
    </div>
  );
};

export default ActivityLogs;
