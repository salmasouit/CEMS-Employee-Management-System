import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Camera, Lock } from 'lucide-react';
import { profileAPI, authAPI } from '../services/endpoints';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { buildFormData, getErrorMessage } from '../utils/helpers';
import { getImageUrl } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      gender: user?.gender,
      address: user?.address,
      position: user?.position,
      birthDate: user?.birthDate ? user.birthDate.split('T')[0] : '',
    },
  });
  const { register: regPwd, handleSubmit: submitPwd, watch, reset: resetPwd } = useForm();

  const onUpdateProfile = async (formData) => {
    setLoading(true);
    try {
      const payload = buildFormData(formData, 'profilePicture', file);
      const { data } = await profileAPI.update(payload);
      updateUser(data.data);
      addToast('Profile updated');
      setFile(null);
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  const onChangePassword = async (formData) => {
    setPwdLoading(true);
    try {
      await authAPI.changePassword(formData);
      addToast('Password changed successfully');
      resetPwd();
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setPwdLoading(false);
    }
  };

  const avatarUrl = getImageUrl(user?.profilePicture);

  return (
    <div className="space-y-6">
      <h1 className="page-title">My Profile</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card text-center lg:col-span-1">
          <div className="relative mx-auto mb-4 h-24 w-24">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="h-24 w-24 rounded-full object-cover" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-700">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
            )}
            <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-primary-600 p-1.5 text-white hover:bg-primary-700">
              <Camera className="h-4 w-4" />
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>
          <h2 className="text-xl font-bold">{user?.firstName} {user?.lastName}</h2>
          <p className="text-sm text-gray-500">{user?.roleId?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="mt-2 text-xs text-gray-400">{user?.employeeId}</p>
        </div>

        <div className="card lg:col-span-2">
          <h3 className="mb-4 font-semibold">Personal Information</h3>
          <form onSubmit={handleSubmit(onUpdateProfile)} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div><label className="mb-1 block text-sm font-medium">First Name</label><input {...register('firstName')} className="input-field" /></div>
            <div><label className="mb-1 block text-sm font-medium">Last Name</label><input {...register('lastName')} className="input-field" /></div>
            <div><label className="mb-1 block text-sm font-medium">Phone</label><input {...register('phone')} className="input-field" /></div>
            <div><label className="mb-1 block text-sm font-medium">Gender</label>
              <select {...register('gender')} className="input-field"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>
            </div>
            <div><label className="mb-1 block text-sm font-medium">Birth Date</label><input type="date" {...register('birthDate')} className="input-field" /></div>
            <div><label className="mb-1 block text-sm font-medium">Position</label><input {...register('position')} className="input-field" /></div>
            <div className="md:col-span-2"><label className="mb-1 block text-sm font-medium">Address</label><input {...register('address')} className="input-field" /></div>
            <div className="md:col-span-2">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? <LoadingSpinner size="sm" /> : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card max-w-xl">
        <h3 className="mb-4 flex items-center gap-2 font-semibold"><Lock className="h-5 w-5" /> Change Password</h3>
        <form onSubmit={submitPwd(onChangePassword)} className="space-y-4">
          <div><label className="mb-1 block text-sm font-medium">Current Password</label><input type="password" {...regPwd('currentPassword', { required: true })} className="input-field" /></div>
          <div>
            <label className="mb-1 block text-sm font-medium">New Password</label>
            <input type="password" {...regPwd('password', { required: true, minLength: 8 })} className="input-field" />
            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters, and contain uppercase, lowercase, number, and special character.</p>
          </div>
          <div><label className="mb-1 block text-sm font-medium">Confirm Password</label>
            <input type="password" {...regPwd('confirmPassword', { validate: (v) => v === watch('password') || 'Passwords do not match' })} className="input-field" />
          </div>
          <button type="submit" disabled={pwdLoading} className="btn-primary">
            {pwdLoading ? <LoadingSpinner size="sm" /> : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
