// routes/messageRoute.js
const express = require('express');
const { saveMessage, getMessages } = require('../controllers/messageControl');

const router = express.Router();

router.post('/saveMessage', saveMessage);
router.get('/getMessages', getMessages);

module.exports = router;
