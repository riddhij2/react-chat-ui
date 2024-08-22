const { saveMessage, findMessagesByUserId, deleteMessageById } = require('../models/message');

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

const delMsg = async (req, res, next) => {
  const id = req.params.id;
  
  try {
    if (!id) {
      return res.status(400).json({ msg: 'Message ID required.' });
    }
    await deleteMessageById(id);
    res.json({ data: { id }, msg: 'Message deleted' });  // Return the ID of the deleted message
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveMsg,
  getMsg,
  delMsg,
};
