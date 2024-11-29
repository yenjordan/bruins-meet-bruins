const mongoose = require("mongoose")
//model for connection, two users swipe right on each other
const MyConnections = new mongoose.Schema({
    userId1: {
        type: String,
        default: " ",
        required: true
        
    },
    userId2:{
        type: String,
        default: " ",
        required: true
    },
    }, { collection: 'connections' });

module.exports = mongoose.model("connections", MyConnections)