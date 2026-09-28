import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { departmentAPI, employeeAPI } from '../services/endpoints';
import { useToast } from '../context/ToastContext';
import PermissionGate from '../components/PermissionGate';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getErrorMessage } from '../utils/helpers';
import useDebounce from '../hooks/useDebounce';

const Departments = () => {
  const { addToast } = useToast();
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editing, setEditing] = useState(null);
  const debouncedSearch = useDebounce(search);
  const { register, handleSubmit, reset } = useForm();

  const fetchDepartments = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await departmentAPI.getAll({ page, limit: 10, search: debouncedSearch });
      setDepartments(data.data);
      setMeta(data.meta);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    employeeAPI.getAll({ limit: 100 }).then((r) => setManagers(r.data.data)).catch(() => {});
  }, []);

  useEffect(() => { fetchDepartments(1); }, [debouncedSearch]);

  const openCreate = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (dept) => {
    setEditing(dept);
    reset({ name: dept.name, description: dept.description, managerId: dept.managerId?._id || '' });
    setModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      if (editing) {
        await departmentAPI.update(editing._id, formData);
        addToast('Department updated');
      } else {
        await departmentAPI.create(formData);
        addToast('Department created');
      }
      setModalOpen(false);
      fetchDepartments(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await departmentAPI.delete(deleteId);
      addToast('Department deleted');
      setDeleteId(null);
      fetchDepartments(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Departments</h1>
        <PermissionGate permissions={['manage_departments']}>
          <button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add Department</button>
        </PermissionGate>
      </div>

      <div className="card space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search departments..." />
        {loading ? <LoadingSpinner className="py-12" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left">Name</th>
                  <th className="pb-3 text-left">Description</th>
                  <th className="pb-3 text-left">Manager</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept._id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 font-medium">{dept.name}</td>
                    <td className="py-3">{dept.description || '-'}</td>
                    <td className="py-3">{dept.managerId ? `${dept.managerId.firstName} ${dept.managerId.lastName}` : '-'}</td>
                    <td className="py-3 text-right">
                      <PermissionGate permissions={['manage_departments']}>
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(dept)} className="rounded p-1 hover:bg-gray-100"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => setDeleteId(dept._id)} className="rounded p-1 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </PermissionGate>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={fetchDepartments} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Department' : 'Add Department'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium">Name</label><input {...register('name', { required: true })} className="input-field" /></div>
          <div><label className="mb-1 block text-sm font-medium">Description</label><textarea {...register('description')} className="input-field" rows={3} /></div>
          <div><label className="mb-1 block text-sm font-medium">Manager</label>
            <select {...register('managerId')} className="input-field"><option value="">Select manager</option>
              {managers.map((m) => <option key={m._id} value={m._id}>{m.firstName} {m.lastName}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Department" message="Cannot delete if employees are assigned. Continue?" confirmText="Delete" danger />
    </div>
  );
};

export default Departments;
