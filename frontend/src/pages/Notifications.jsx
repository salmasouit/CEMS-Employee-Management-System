import { useEffect, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { notificationAPI } from '../services/endpoints';
import { useToast } from '../context/ToastContext';
import Pagination from '../components/ui/Pagination';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatDateTime, getErrorMessage } from '../utils/helpers';

const Notifications = () => {
  const { addToast } = useToast();
  const [data, setData] = useState({ notifications: [], unreadCount: 0 });
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const { data: res } = await notificationAPI.getAll({ page, limit: 15 });
      setData(res.data);
      setMeta(res.meta);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(1); }, []);

  const markAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      fetchNotifications(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      addToast('All notifications marked as read');
      fetchNotifications(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Notifications</h1>
          {data.unreadCount > 0 && (
            <p className="text-sm text-gray-500">{data.unreadCount} unread</p>
          )}
        </div>
        {data.unreadCount > 0 && (
          <button onClick={markAllAsRead} className="btn-secondary">
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </button>
        )}
      </div>

      <div className="card">
        {loading ? <LoadingSpinner className="py-12" /> : (
          <div className="space-y-3">
            {data.notifications.map((notif) => (
              <div
                key={notif._id}
                onClick={() => !notif.isRead && markAsRead(notif._id)}
                className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition ${
                  notif.isRead
                    ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                    : 'border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20'
                }`}
              >
                <Bell className={`mt-0.5 h-5 w-5 ${notif.isRead ? 'text-gray-400' : 'text-primary-600'}`} />
                <div className="flex-1">
                  <p className="font-medium">{notif.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{notif.message}</p>
                  <p className="mt-1 text-xs text-gray-400">{formatDateTime(notif.createdAt)}</p>
                </div>
                {!notif.isRead && <span className="h-2 w-2 rounded-full bg-primary-600" />}
              </div>
            ))}
            {!data.notifications.length && (
              <p className="py-12 text-center text-gray-500">No notifications yet</p>
            )}
          </div>
        )}
        <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={fetchNotifications} />
      </div>
    </div>
  );
};

export default Notifications;
