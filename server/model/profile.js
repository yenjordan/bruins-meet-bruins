const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
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
    },
    userID: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;