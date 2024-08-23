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
    // socket.on('SEND_MSG', async (msg) => {
    //   console.log(msg, 'MSG FROM FRONTEND');
      
    //   // Save the message and get the result including the ID
    //   const isSaved = await saveMsg(msg);
    //   console.log(isSaved, 'Message saved with ID'); // Ensure isSaved contains the ID
  
    //   // Emit the saved message to the appropriate sockets
    //   io.to(msg.receiver.socketId)
    //     .to(msg.sender.socketId)
    //     .emit('RECEIVED_MSG', isSaved); // Send the result to the frontend
    socket.on('SEND_MSG', async (data) => {
          const savedMsg = await saveMsg(data);
          console.log('Emitting RECEIVED_MSG with:', savedMsg.data);
          io.emit('RECEIVED_MSG', savedMsg.data);
        
    });

    socket.on('DELETE_MSG', ({ msg }) => {

    console.log("Deleting message with ID:", msg);
      // Broadcast message deletion to all relevant clients
      io.emit('DELETED_MSG', { msg });  // You might need to target specific rooms or users
    });
    socket.on('disconnect', () => {
      removeUser(socket.id);
      io.emit('USER_ADDED', onlineUsers);
    });
  });
};

module.exports = socketInit;
