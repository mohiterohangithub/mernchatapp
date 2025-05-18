const onlineUsers = new Map();

const addUserToOnline = (userId, socketId) => {
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, socketId);
  }
};

const removeUserToOnline = (socketId) => {
  for (const [userId, id] of onlineUsers.entries()) {
    if (id === socketId) {
      onlineUsers.delete(userId);
      break;
    }
  }
};

module.exports = { addUserToOnline, removeUserToOnline, onlineUsers };
