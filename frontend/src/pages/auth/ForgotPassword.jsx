import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Mail } from 'lucide-react';
import { authAPI } from '../../services/endpoints';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ForgotPassword = () => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authAPI.forgotPassword(data.email);
      setSent(true);
      addToast('Reset link sent if email exists');
    } catch (error) {
      addToast(getErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <Mail className="mx-auto mb-4 h-12 w-12 text-primary-600" />
        <h2 className="mb-2 text-2xl font-bold">Check your email</h2>
        <p className="mb-6 text-gray-500">If the email exists, a reset link has been sent.</p>
        <Link to="/login" className="btn-primary inline-flex"><ArrowLeft className="h-4 w-4" /> Back to login</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/login" className="mb-6 inline-flex items-center gap-1 text-sm text-primary-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to login
      </Link>
      <h2 className="mb-2 text-2xl font-bold">Forgot password</h2>
      <p className="mb-8 text-gray-500">Enter your email to receive a reset link</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="input-field"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? <LoadingSpinner size="sm" /> : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
