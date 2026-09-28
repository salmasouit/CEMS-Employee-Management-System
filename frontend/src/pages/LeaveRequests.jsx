import { useEffect, useState } from 'react';
import { Plus, Check, X, Ban } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { leaveAPI } from '../services/endpoints';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import PermissionGate from '../components/PermissionGate';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { buildFormData, formatDate, getErrorMessage } from '../utils/helpers';

const LEAVE_TYPES = ['Annual Leave', 'Sick Leave', 'Emergency Leave', 'Maternity Leave', 'Unpaid Leave'];

const LeaveRequests = () => {
  const { addToast } = useToast();
  const { user, hasPermission, hasAnyPermission } = useAuth();
  const [requests, setRequests] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [reviewModal, setReviewModal] = useState(null);
  const [file, setFile] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { register: regReview, handleSubmit: submitReview, reset: resetReview } = useForm();

  const fetchRequests = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await leaveAPI.getAll({ page, limit: 10, status: statusFilter });
      setRequests(data.data);
      setMeta(data.meta);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(1); }, [statusFilter]);

  const onSubmit = async (formData) => {
    try {
      const payload = buildFormData(formData, 'attachment', file);
      await leaveAPI.create(payload);
      addToast('Leave request submitted');
      setModalOpen(false);
      reset();
      setFile(null);
      fetchRequests(1);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  const handleApprove = async (formData) => {
    try {
      await leaveAPI.approve(reviewModal._id, formData.comment || '');
      addToast('Leave request approved');
      setReviewModal(null);
      resetReview();
      fetchRequests(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  const handleReject = async (formData) => {
    try {
      await leaveAPI.reject(reviewModal._id, formData.comment || '');
      addToast('Leave request rejected');
      setReviewModal(null);
      resetReview();
      fetchRequests(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  const handleCancel = async (id) => {
    try {
      await leaveAPI.cancel(id);
      addToast('Leave request cancelled');
      fetchRequests(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  const canReview = hasAnyPermission('approve_leave', 'reject_leave');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="page-title">Leave Requests</h1>
        <PermissionGate permissions={['submit_leave']}>
          <button onClick={() => { reset(); setModalOpen(true); }} className="btn-primary">
            <Plus className="h-4 w-4" /> New Request
          </button>
        </PermissionGate>
      </div>

      <div className="card space-y-4">
        <div className="flex gap-4">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field max-w-xs">
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? <LoadingSpinner className="py-12" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left">Employee</th>
                  <th className="pb-3 text-left">Type</th>
                  <th className="pb-3 text-left">Dates</th>
                  <th className="pb-3 text-left">Days</th>
                  <th className="pb-3 text-left">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3">{req.employeeId ? `${req.employeeId.firstName} ${req.employeeId.lastName}` : '-'}</td>
                    <td className="py-3">{req.leaveType}</td>
                    <td className="py-3">{formatDate(req.startDate)} - {formatDate(req.endDate)}</td>
                    <td className="py-3">{req.totalDays}</td>
                    <td className="py-3"><StatusBadge status={req.status} /></td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {req.status === 'Pending' && canReview && (
                          <button onClick={() => setReviewModal(req)} className="rounded p-1 text-green-600 hover:bg-green-50" title="Review">
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        {req.status === 'Pending' && req.employeeId?._id === user?._id && (
                          <button onClick={() => handleCancel(req._id)} className="rounded p-1 text-red-600 hover:bg-red-50" title="Cancel">
                            <Ban className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={fetchRequests} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="New Leave Request">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium">Leave Type</label>
            <select {...register('leaveType', { required: true })} className="input-field">
              {LEAVE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="mb-1 block text-sm font-medium">Start Date</label><input type="date" {...register('startDate', { required: true })} className="input-field" /></div>
            <div><label className="mb-1 block text-sm font-medium">End Date</label><input type="date" {...register('endDate', { required: true })} className="input-field" /></div>
          </div>
          <div><label className="mb-1 block text-sm font-medium">Reason</label><textarea {...register('reason', { required: true })} className="input-field" rows={3} /></div>
          <div><label className="mb-1 block text-sm font-medium">Attachment (optional)</label><input type="file" onChange={(e) => setFile(e.target.files[0])} className="input-field" /></div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Submit</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!reviewModal} onClose={() => setReviewModal(null)} title="Review Leave Request">
        {reviewModal && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">{reviewModal.employeeId?.firstName} {reviewModal.employeeId?.lastName} — {reviewModal.leaveType}</p>
            <p className="text-sm">{formatDate(reviewModal.startDate)} to {formatDate(reviewModal.endDate)} ({reviewModal.totalDays} days)</p>
            <p className="text-sm"><strong>Reason:</strong> {reviewModal.reason}</p>
            <div><label className="mb-1 block text-sm font-medium">Comment</label><textarea {...regReview('comment')} className="input-field" rows={2} /></div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setReviewModal(null)} className="btn-secondary">Cancel</button>
              <button type="button" onClick={submitReview(handleReject)} className="btn-danger"><X className="h-4 w-4" /> Reject</button>
              <button type="button" onClick={submitReview(handleApprove)} className="btn-primary"><Check className="h-4 w-4" /> Approve</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LeaveRequests;
