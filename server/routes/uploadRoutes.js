const express = require('express');
const upload = require('../controllers/uploadController');

const router = express.Router();
router.post('/upload', upload.single('image'), (req, res) => {
    if(!req.file){
        return res.status(400).json({message: 'No file uploaded.'});
    }

    res.status(201).json({imageurl: `/uploads/${req.file.filename}`});
});
module.exports = router;