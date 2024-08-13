const { saveMessage, findMessagesByUserId, deleteMessageById } = require('../models/message');

const saveMsg = async (req, res, next) => {
  const data = req.body;

  try {
    const savedMsg = await saveMessage(data);
    res.status(201).json({ message: 'Message saved', data: savedMsg });
  } catch (error) {
    // next(error);
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
    res.json({ msg: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveMsg,
  getMsg,
  delMsg,
};
