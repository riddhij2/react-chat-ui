const pool = require('../util/database');

const saveMessage = async (data) => {
  console.log('Message model:', data.msg);  // Log the message content
 
  const [result] = await pool.execute(
    'INSERT INTO messages (msg, sender_id, sender_name, sender_email, receiver_id, receiver_name, receiver_email) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [data.msg, data.sender.userId, data.sender.name, data.sender.email, data.receiver.userId, data.receiver.name, data.receiver.email]
  );
   // Fetch the ID of the inserted message
   const messageId = result.insertId;

   console.log('Inserted Message:', {
    id: messageId,
    msg: data.msg,
    sender_id: data.sender.userId,
    sender_name: data.sender.name,
    sender_email: data.sender.email,
    receiver_id: data.receiver.userId,
    receiver_name: data.receiver.name,
    receiver_email: data.receiver.email,
    created_at: new Date().toISOString()
  });

   // Return the message data including the ID
   return {
     id: messageId,
     msg: data.msg,
     sender_id: data.sender.userId,
     sender_name: data.sender.name,
     sender_email: data.sender.email,
     receiver_id: data.receiver.userId,
     receiver_name: data.receiver.name,
     receiver_email: data.receiver.email,
     created_at: new Date().toISOString() // Optional: Add creation timestamp
   };
};

const findMessagesByUserId = async (userId) => {
  const [messages] = await pool.execute(
    'SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ?',
    [userId, userId]
  );
  return messages;
};

const deleteMessageById = async (id) => {
  const [result] = await pool.execute('DELETE FROM messages WHERE id = ?', [id]);
  return result;
};

module.exports = {
  saveMessage,
  findMessagesByUserId,
  deleteMessageById,
};
