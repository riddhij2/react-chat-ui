const pool = require('../util/database');

const saveMessage = async (data) => {
  console.log('Message model:', data.msg);  // Log the message content
 
  const [result] = await pool.execute(
    'INSERT INTO messages (msg, sender_id, sender_name, sender_email, receiver_id, receiver_name, receiver_email) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [data.msg, data.sender.userId, data.sender.name, data.sender.email, data.receiver.userId, data.receiver.name, data.receiver.email]
  );
  return result;
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
