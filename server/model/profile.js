const mongoose = require('mongoose');

const profile = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    bio: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Profile", profile)