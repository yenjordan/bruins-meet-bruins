const mongoose = require("mongoose")
//model for connection, two user swipe right on each other
const MySwipes = new mongoose.Schema({
    swiperId: {
        type: String,
        required: true
    },
    swipedId:{
        type: String,
        required: true
    },
    direction: { 
        type: String, 
        enum: ['right', 'left'], 
        required: true },
    time:{
        type: Date,
        default: Date.now
    }

}, { collection: 'swipes' });

module.exports = mongoose.model("swipes", MySwipes)