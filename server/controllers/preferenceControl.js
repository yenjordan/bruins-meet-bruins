const userPreferences = require('../model/preferences')


const getPreferences = async (req, res) => {
    const { userId, ageRange, hobbyPreferences } = req.body;

    if (!userId || !ageRange || !hobbyPreferences) {
        return res.status(400).json({ message: "Please fill out all fields!" });
    }

    const { min: minAge, max: maxAge } = ageRange;

    if (isNaN(minAge) || isNaN(maxAge) || minAge < 0 || maxAge < 0 || minAge > maxAge) {
        return res.status(400).json({ message: "Invalid format for age range" });
    }

    if (!Array.isArray(hobbyPreferences) || !hobbyPreferences.every(hobby => typeof hobby === 'string')) {
        return res.status(400).json({ message: "Invalid format for hobby preferences. Must be an array of strings." });
    }

    try {
        const newPreference = await userPreferences.findOne({ userId: userId }); // Access userId here
        if (!newPreference) {
            return res.status(404).json({ message: "User could not be found" });
        }

        newPreference.ageRange = { min: minAge, max: maxAge };
        newPreference.hobbyPreferences = hobbyPreferences;

        await newPreference.save();
        res.status(201).json({ message: "Preferences recorded without error" });
    } catch (error) {
        console.error("Error handling preferences: ", error);
        res.status(500).json({ message: "Error occurred" });
    }
};


module.exports = { getPreferences }