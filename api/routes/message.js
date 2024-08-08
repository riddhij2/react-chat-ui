const express = require('express');
const messageController = require('../controllers/message');

const router = express.Router();

router.post('/saveMessages', messageController.saveMsg);
router.get('/:id', messageController.getMsg);
router.delete('/:id', messageController.delMsg);

module.exports = router;
