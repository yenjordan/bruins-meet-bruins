const express = require('express')
const { signup, login } = require('../controllers/authControll')
const Profile = require('../model/profile')
const authenticate = require('../middleware/auth')

const route = express.Router()
route.post('/signup', signup)
route.post('/login', login)

route.post('/createProfile', authenticate, async(req, res) => {
    const{firstName, lastName, age, bio} = req.body;

    if(!firstName || !lastName || !age || !bio){
        return res.status(400).json({message: "Please fill out all fields!"});
    }
    try{
        const newProfile = new Profile({
            firstName,
            lastName,
            age,
            bio,
            userID: req.userID
        });

        await newProfile.save();
        res.status(201).json(newProfile);
    } catch(err){
        console.error(err);
        res.status(500).json({message:"Error creating profile."});
    }


});
module.exports = route; 