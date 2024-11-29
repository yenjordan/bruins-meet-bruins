const express = require('express')
const prefController = require('../controllers/preferenceControl')

const router = express.Router()

router
    .route('/getPreferences')
    .post(prefController.getPreferences);


module.exports = router; 