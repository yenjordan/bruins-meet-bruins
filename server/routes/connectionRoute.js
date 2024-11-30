const express = require('express')
const connectionController = require('../controllers/connectionControl');
const router = express.Router()

router.route('/getConnections').get(connectionController.getConnections)

module.exports = router; 