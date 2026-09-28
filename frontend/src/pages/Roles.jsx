import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { roleAPI } from '../services/endpoints';
import { useToast } from '../context/ToastContext';
import PermissionGate from '../components/PermissionGate';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getErrorMessage } from '../utils/helpers';
import useDebounce from '../hooks/useDebounce';

const Roles = () => {
  const { addToast } = useToast();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [selectedPerms, setSelectedPerms] = useState([]);
  const debouncedSearch = useDebounce(search);
  const { register, handleSubmit, reset } = useForm();

  const fetchRoles = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await roleAPI.getAll({ page, limit: 10, search: debouncedSearch });
      setRoles(data.data);
      setMeta(data.meta);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    roleAPI.getPermissions().then((r) => setPermissions(r.data.data)).catch(() => {});
  }, []);

  useEffect(() => { fetchRoles(1); }, [debouncedSearch]);

  const openCreate = () => {
    setEditing(null);
    setSelectedPerms([]);
    reset({});
    setModalOpen(true);
  };

  const openEdit = (role) => {
    setEditing(role);
    setSelectedPerms(role.permissions?.map((p) => p._id) || []);
    reset({ name: role.name, description: role.description });
    setModalOpen(true);
  };

  const togglePerm = (id) => {
    setSelectedPerms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData, permissions: selectedPerms };
      if (editing) {
        await roleAPI.update(editing._id, payload);
        addToast('Role updated');
      } else {
        await roleAPI.create(payload);
        addToast('Role created');
      }
      setModalOpen(false);
      fetchRoles(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await roleAPI.delete(deleteId);
      addToast('Role deleted');
      setDeleteId(null);
      fetchRoles(meta.page);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Roles & Permissions</h1>
        <PermissionGate permissions={['manage_roles']}>
          <button onClick={openCreate} className="btn-primary"><Plus className="h-4 w-4" /> Add Role</button>
        </PermissionGate>
      </div>

      <div className="card space-y-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search roles..." />
        {loading ? <LoadingSpinner className="py-12" /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left">Role</th>
                  <th className="pb-3 text-left">Description</th>
                  <th className="pb-3 text-left">Permissions</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role._id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 font-medium">{role.name}</td>
                    <td className="py-3">{role.description || '-'}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions?.slice(0, 4).map((p) => (
                          <span key={p._id} className="rounded bg-primary-50 px-2 py-0.5 text-xs text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                            {p.name}
                          </span>
                        ))}
                        {role.permissions?.length > 4 && (
                          <span className="text-xs text-gray-500">+{role.permissions.length - 4} more</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <PermissionGate permissions={['manage_roles']}>
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit(role)} className="rounded p-1 hover:bg-gray-100"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => setDeleteId(role._id)} className="rounded p-1 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </PermissionGate>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={fetchRoles} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Role' : 'Add Role'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium">Name</label><input {...register('name', { required: true })} className="input-field" /></div>
          <div><label className="mb-1 block text-sm font-medium">Description</label><textarea {...register('description')} className="input-field" rows={2} /></div>
          <div>
            <label className="mb-2 block text-sm font-medium">Permissions</label>
            <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-gray-200 p-3 dark:border-gray-600">
              {permissions.map((p) => (
                <label key={p._id} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={selectedPerms.includes(p._id)} onChange={() => togglePerm(p._id)} />
                  {p.name}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Role" message="Cannot delete if assigned to employees." confirmText="Delete" danger />
    </div>
  );
};

export default Roles;
