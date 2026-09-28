import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authAPI } from '../../services/endpoints';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const token = params.get('token');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authAPI.resetPassword({ token, password: data.password, confirmPassword: data.confirmPassword });
      addToast('Password reset successful!');
      navigate('/login');
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <p className="mb-4 text-red-500">Invalid reset link</p>
        <Link to="/forgot-password" className="btn-primary">Request new link</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Reset password</h2>
      <p className="mb-8 text-gray-500">Enter your new password</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium">New Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Min 8 characters' },
            })}
            className="input-field"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm password',
              validate: (val) => val === watch('password') || 'Passwords do not match',
            })}
            className="input-field"
          />
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
