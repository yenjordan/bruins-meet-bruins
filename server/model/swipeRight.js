const mongoose = require("mongoose")
//model for connection, two user swipe right on each other
const MySwipes = new mongoose.Schema({
    swiperId: {
        type: String,
        default: " ",
        required: true
    },
    swipedId:{
        type: String,
        default: " ",
        required: true
    },
    direction: { 
        type: String, 
        enum: ['right', 'left'], 
        default: " ",
        required: true },
    time:{
        type: Date,
        default: Date.now
    }

}, { collection: 'swipes' });

module.exports = mongoose.model("swipes", MySwipes)