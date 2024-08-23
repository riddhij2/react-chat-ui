const { saveMessage, findMessagesByUserId, deleteMessageById, findMessageById } = require('../models/message');

const saveMsg = async (data) => {
  console.log('Data to be saved:', data);  // Log the message data
 
  
  try {
    const savedMsg = await saveMessage(data);
    return { success: true, data: savedMsg };
  } catch (error) {
    console.error('Error saving message:', error);
    return { success: false, error };
  }
};

const getMsg = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(400).json({ msg: 'User ID required.' });
    }
    const allMsg = await findMessagesByUserId(id);
    res.json({ data: allMsg, msg: 'Messages fetched' });
  } catch (error) {
    next(error);
  }
};

// Fetch the message by ID before deleting it
const delMsg = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    if (!id) {
      return res.status(400).json({ msg: 'Message ID required.' });
    }

    // Find the message to be deleted
    const message = await findMessageById(id);

    if (!message) {
      return res.status(404).json({ msg: 'Message not found.' });
    }

    // Delete the message
    await deleteMessageById(id);

    // Respond with the deleted message content
    res.json({ data: { id, msg: message.msg }, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveMsg,
  getMsg,
  delMsg,
};
