const pool = require('../util/database');

const saveMessage = async (data) => {
  const [result] = await pool.execute(
    'INSERT INTO messages (msg, sender_id, sender_name, sender_email, receiver_id, receiver_name, receiver_email) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [data.msg, data.sender.id, data.sender.name, data.sender.email, data.receiver.id, data.receiver.name, data.receiver.email]
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
