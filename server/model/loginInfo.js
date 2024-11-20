const mongoose = require("mongoose")

const UserLogin = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    hashedPass:{
        type:String,
        required: true
    }

}, { collection: 'users' });

module.exports = mongoose.model("users", UserLogin)