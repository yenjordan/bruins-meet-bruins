const mongoose = require("mongoose")
//model for preferences: age range, hobbies
const MyPreferences = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    ageRange: {
        min: { type: Number, required: true, default: 0},
        max: { type: Number, required: true, default: -1},
    },
    hobbyPreferences: {
        type: [String],
        required: true,
        default: []
    }

}, { collection: 'preferences' });

module.exports = mongoose.model("preferences", MyPreferences)