const Profile = require('../model/profile')
const Preferences= require('../model/preferences')

//remove suffixes from end of word: ex "swimming" matches with "swim"
function stemmer(word){
    word = word.toLowerCase()

    const suffix = ["ing", "ed", "es", "s", "ly", "ment", "ful", "ness", "en", "ize", "er", "ify", "ate"]

    for(let endingLetters of suffix){
        if(word.endsWith(endingLetters)){
            word = word.slice(0, -endingLetters.length)
            break
        }
    }
    return word 
}

 //split sentences into individual words
function processTexts(text){   
    if(!text){
        return []
    }
    const cleanedText = text.replace(/[.,!?;:()"]/g, '').toLowerCase(); //use regex filter to remove punctuation when parsing
    const splitword = cleanedText.split(/\s+/)  //after removing puncation, split a text into invidiual words
    
    return splitword.map(stemmer)
}

//assoicate matches based off user's preferences
const getMatches = async (req, res) => {
    const { userId } = req.query;

    try {
        const userPreferences = await Preferences.findOne({ userId });  //find preferences for this user
        if (!userPreferences) {
            return res.status(404).json({ message: 'Could not find preferences for this user' });
        }

        //get data from preference collection of the current user
        const { ageRange, hobbyPreferences } = userPreferences;   

        if (!ageRange || !hobbyPreferences || hobbyPreferences.length == 0) {
            return res.status(400).json({ message: 'Age range is missing in user preferences' });
        }

        const { min: minAge, max: maxAge } = ageRange;

        if(isNaN(minAge) || isNaN(maxAge)){
            return res.status(400).json({ message: 'Invalid format for Age' })
        }

        //query profiles, filter users according to age
        const filterMatches = await Profile.find({
            userID: { $ne: userId }, // exclude the current user
            age: {$gte: minAge, $lte: maxAge} //greater than or equal to min , less than or equal to max
        });
        // console.log(filterMatches)
        // console.log(userId)
        // console.log("Query userId:", userId, "Type:", typeof userId);

        if (filterMatches.length == 0) {
            return res.status(404).json({ message: 'No matching profiles found' });
        }
        // process hobbies and calculate match percentages
        //utilize set for faster traversal and storage of the stemmed words
        
        //parse our array of strings and join it as 'one string' then process each word
        const processPreferences = new Set(processTexts(hobbyPreferences.join(' ')))

        const sortMatches = filterMatches.map((profile) => {
            const keyWords = processTexts(profile.bio); //split user bio into words
            const stemmedWords = new Set(keyWords)  //store each parsed word in our bio into a set
            
            //find and associate matching words from bio with the preferences,comparing the elements of two sets
            // store that length as a number
            const matchedkeyWords = [...processPreferences].filter(pref => stemmedWords.has(pref)).length

            //calculate match percentage with user
            const matchPercentage = Math.round((matchedkeyWords / hobbyPreferences.length) * 100);
            return { ...profile._doc, matchPercentage }; //associate match percentage to the user so we can display it
        });

        // sort our container by match percentage in descending order (highest percentage first, lowest last)
        sortMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

        res.status(200).json(sortMatches);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Error occurred while fetching profiles' });
    }
};


module.exports = { getMatches }