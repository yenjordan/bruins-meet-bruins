const express = require('express')
const swipeController = require('../controllers/swipeControl')

const router = express.Router()

router
    .route('/getSwipes')
    .post(swipeController.getSwipes)

module.exports = router; 