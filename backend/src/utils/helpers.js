const crypto = require('crypto');

const generateResetToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  return { token, hashed };
};

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const generateEmployeeId = async (User) => {
  const count = await User.countDocuments();
  return `EMP${String(count + 1).padStart(5, '0')}`;
};

const calculateLeaveDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let days = 0;
  const current = new Date(start);
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) days += 1;
    current.setDate(current.getDate() + 1);
  }
  return Math.max(days, 1);
};

module.exports = { generateResetToken, hashToken, generateEmployeeId, calculateLeaveDays };
