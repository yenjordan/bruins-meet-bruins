const mongoose = require("mongoose")
//model for user info: ID, email, password
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