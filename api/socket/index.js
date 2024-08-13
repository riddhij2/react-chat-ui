const socket = require('socket.io');
const { saveMsg } = require('../controllers/message');

const onlineUsers = [];

const addUser = (user, socketId) => {
  console.log(user)
  const isExist = onlineUsers.findIndex((item) => item.userId === user.userId);
  if (isExist !== -1) {
    onlineUsers.splice(isExist, 1);
  }
  user.socketId = socketId;
  onlineUsers.push(user);
};

const removeUser = (socketId) => {
  const isExist = onlineUsers.findIndex((item) => item.socketId === socketId);
  if (isExist !== -1) {
    onlineUsers.splice(isExist, 1);
  }
};

const socketInit = (server) => {
  const io = socket(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('ADD_USER', (user) => {
      addUser(user, socket.id);
      io.emit('USER_ADDED', onlineUsers);
    });
    socket.on('SEND_MSG', async (msg) => {
      console.log(msg, 'MSG FROM FRONTEND');
      const isSaved = await saveMsg(msg);
      io.to(msg.receiver.socketId)
        .to(msg.sender.socketId)
        .emit('RECEIVED_MSG', msg);//change msg into isSaved afterwards
    });

    socket.on('DELETE_MSG', (msg) => {
      socket.to(msg.receiver.socketId).emit('DELETED_MSG', msg);
    });
    socket.on('disconnect', () => {
      removeUser(socket.id);
      io.emit('USER_ADDED', onlineUsers);
    });
  });
};

module.exports = socketInit;
