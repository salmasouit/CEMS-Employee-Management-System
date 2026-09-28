import { Download, FileText, Table } from 'lucide-react';
import { downloadReport } from '../services/api';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../utils/helpers';

const reportTypes = [
  { id: 'employees', name: 'Employees Report', description: 'Export all employee records' },
  { id: 'departments', name: 'Departments Report', description: 'Export department list with managers' },
  { id: 'leave-requests', name: 'Leave Requests Report', description: 'Export all leave request records' },
  { id: 'activity-logs', name: 'Activity Logs Report', description: 'Export system activity logs' },
];

const formats = [
  { id: 'csv', label: 'CSV', icon: Table },
  { id: 'xlsx', label: 'Excel', icon: FileText },
  { id: 'pdf', label: 'PDF', icon: Download },
];

const Reports = () => {
  const { addToast } = useToast();

  const handleExport = async (type, format) => {
    try {
      await downloadReport(type, format);
      addToast(`${type} report exported as ${format.toUpperCase()}`);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="page-title">Reports</h1>
      <p className="text-gray-500">Export data in PDF, Excel, or CSV format</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {reportTypes.map((report) => (
          <div key={report.id} className="card">
            <h3 className="mb-1 font-semibold">{report.name}</h3>
            <p className="mb-4 text-sm text-gray-500">{report.description}</p>
            <div className="flex flex-wrap gap-2">
              {formats.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleExport(report.id, id)}
                  className="btn-secondary !py-1.5"
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
