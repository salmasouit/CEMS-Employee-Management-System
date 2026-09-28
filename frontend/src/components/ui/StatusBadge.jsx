import { getStatusColor } from '../../utils/helpers';

const StatusBadge = ({ status }) => (
  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}>
    {status}
  </span>
);

export default StatusBadge;
