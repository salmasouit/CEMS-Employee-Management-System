import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { employeeAPI, departmentAPI, roleAPI } from '../services/endpoints';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import PermissionGate from '../components/PermissionGate';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { buildFormData, formatDate, getErrorMessage } from '../utils/helpers';
import { getImageUrl } from '../services/api';
import useDebounce from '../hooks/useDebounce';

const Employees = () => {
  const { addToast } = useToast();
  const { hasPermission } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: '', department: '', role: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [file, setFile] = useState(null);
  const debouncedSearch = useDebounce(search);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchEmployees = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await employeeAPI.getAll({
        page, limit: 10, search: debouncedSearch,
        status: filters.status, department: filters.department, role: filters.role,
      });
      setEmployees(data.data);
      setMeta(data.meta);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    departmentAPI.getAllList().then((r) => setDepartments(r.data.data)).catch(() => {});
    roleAPI.getAllList().then((r) => setRoles(r.data.data)).catch(() => {});
  }, []);

  useEffect(() => { fetchEmployees(1); }, [debouncedSearch, filters]);

  const openCreate = () => {
    setEditing(null);
    setFile(null);
    reset({ status: 'Active', gender: 'Male' });
    setModalOpen(true);
  };

  const openEdit = (emp) => {
    setEditing(emp);
    setFile(null);
    reset({
      ...emp,
      departmentId: emp.departmentId?._id || emp.departmentId || '',
      roleId: emp.roleId?._id || emp.roleId || '',
      birthDate: emp.birthDate ? emp.birthDate.split('T')[0] : '',
      hireDate: emp.hireDate ? emp.hireDate.split('T')[0] : '',
    });
    setModalOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      const payload = buildFormData(formData, 'profilePicture', file);
      if (editing) {
        await employeeAPI.update(editing._id, payload);
        addToast('Employee updated');
      } else {
        await employeeAPI.create(payload);
        addToast('Employee created');
      }
      setModalOpen(false);
      fetchEmployees(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await employeeAPI.delete(deleteId);
      addToast('Employee deleted');
      setDeleteId(null);
      fetchEmployees(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="page-title">Employees</h1>
        <PermissionGate permissions={['manage_employees']}>
          <button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add Employee</button>
        </PermissionGate>
      </div>

      <div className="card space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Search employees..." />
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="input-field">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })} className="input-field">
            <option value="">All Departments</option>
            {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
          <select value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })} className="input-field">
            <option value="">All Roles</option>
            {roles.map((r) => <option key={r._id} value={r._id}>{r.name}</option>)}
          </select>
        </div>

        {loading ? <LoadingSpinner className="py-12" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left">Employee</th>
                  <th className="pb-3 text-left">Email</th>
                  <th className="pb-3 text-left">Department</th>
                  <th className="pb-3 text-left">Role</th>
                  <th className="pb-3 text-left">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        {getImageUrl(emp.profilePicture) ? (
                          <img src={getImageUrl(emp.profilePicture)} alt="" className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-medium text-primary-700">
                            {emp.firstName[0]}{emp.lastName[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{emp.firstName} {emp.lastName}</p>
                          <p className="text-xs text-gray-500">{emp.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">{emp.email}</td>
                    <td className="py-3">{emp.departmentId?.name || '-'}</td>
                    <td className="py-3">{emp.roleId?.name || '-'}</td>
                    <td className="py-3"><StatusBadge status={emp.status} /></td>
                    <td className="py-3 text-right">
                      {hasPermission('manage_employees') && (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(emp)} className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => setDeleteId(emp._id)} className="rounded p-1 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={fetchEmployees} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Employee' : 'Add Employee'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div><label className="mb-1 block text-sm font-medium">First Name</label><input {...register('firstName', { required: true })} className="input-field" /></div>
          <div><label className="mb-1 block text-sm font-medium">Last Name</label><input {...register('lastName', { required: true })} className="input-field" /></div>
          <div><label className="mb-1 block text-sm font-medium">Email</label><input type="email" {...register('email', { required: true })} className="input-field" /></div>
          <div><label className="mb-1 block text-sm font-medium">Phone</label><input {...register('phone')} className="input-field" /></div>
          {!editing && <div><label className="mb-1 block text-sm font-medium">Password</label><input type="password" {...register('password', { required: !editing })} className="input-field" /></div>}
          <div><label className="mb-1 block text-sm font-medium">Gender</label>
            <select {...register('gender')} className="input-field"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>
          </div>
          <div><label className="mb-1 block text-sm font-medium">Birth Date</label><input type="date" {...register('birthDate')} className="input-field" /></div>
          <div><label className="mb-1 block text-sm font-medium">Position</label><input {...register('position')} className="input-field" /></div>
          <div><label className="mb-1 block text-sm font-medium">Hire Date</label><input type="date" {...register('hireDate')} className="input-field" /></div>
          <div><label className="mb-1 block text-sm font-medium">Department</label>
            <select {...register('departmentId')} className="input-field"><option value="">Select</option>{departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}</select>
          </div>
          <div><label className="mb-1 block text-sm font-medium">Role</label>
            <select {...register('roleId', { required: true })} className="input-field"><option value="">Select</option>{roles.map((r) => <option key={r._id} value={r._id}>{r.name}</option>)}</select>
          </div>
          <div><label className="mb-1 block text-sm font-medium">Status</label>
            <select {...register('status')} className="input-field"><option value="Active">Active</option><option value="Inactive">Inactive</option></select>
          </div>
          <div className="md:col-span-2"><label className="mb-1 block text-sm font-medium">Address</label><input {...register('address')} className="input-field" /></div>
          <div className="md:col-span-2"><label className="mb-1 block text-sm font-medium">Profile Picture</label><input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="input-field" /></div>
          <div className="flex justify-end gap-3 md:col-span-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary"><UserPlus className="h-4 w-4" /> {editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Employee" message="Are you sure you want to delete this employee?" confirmText="Delete" danger />
    </div>
  );
};

export default Employees;
