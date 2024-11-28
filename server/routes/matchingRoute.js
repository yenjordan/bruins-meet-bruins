const express = require('express')
const matchController = require('../controllers/matchingControl')

const router = express.Router()

router
    .route('/getMatches')
    .get(matchController.getMatches)

module.exports = router; 