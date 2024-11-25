const mongoose = require("mongoose")
//model for preferences: age range, hobbies
const MyPreferences = new mongoose.Schema({
    ageRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
    },
    hobbyPreferences: {
        type: [String],
        required: true,
    }

}, { collection: 'preferences' });

module.exports = mongoose.model("preferences", MyPreferences)