import { useAuth } from '../context/AuthContext';

const PermissionGate = ({ permissions = [], children, fallback = null }) => {
  const { hasAnyPermission } = useAuth();
  if (permissions.length > 0 && !hasAnyPermission(...permissions)) return fallback;
  return children;
};

export default PermissionGate;
