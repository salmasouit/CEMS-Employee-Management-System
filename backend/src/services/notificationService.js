const Notification = require('../models/Notification');

const createNotification = async (userId, title, message) => {
  return Notification.create({ userId, title, message });
};

const notifyUsers = async (userIds, title, message) => {
  const notifications = userIds.map((userId) => ({ userId, title, message }));
  if (notifications.length) await Notification.insertMany(notifications);
};

module.exports = { createNotification, notifyUsers };
