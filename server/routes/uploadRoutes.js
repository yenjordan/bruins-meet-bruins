const express = require('express');
const upload = require('../controllers/uploadController');

const router = express.Router();
router.post('/upload', upload.single('image'), (req, res) => {
    if(!req.file){
        return res.status(400).json({message: 'No file uploaded.'});
    }

    const filePath = `/uploads/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${filePath}`;
    res.status(201).json({imageurl: fullUrl });
});
module.exports = router;