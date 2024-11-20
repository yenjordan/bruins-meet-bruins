const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/loginInfo')
require('dotenv').config();


//adapated http response status codes for logging from https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const signup = async (req, res) => {
    const { email, password } = req.body
    const userId = uuidv4()     //generate specific user ID
    const hashedPass = await bcrypt.hash(password, 10) //hash the password for security

    try{
        const userExists = await User.findOne({ email })

        if(userExists){     //if user already created an account
            return res.status(409).send('User with this email already exists! Please login.') //logging errors
        }
        const convertemail = email.toLowerCase()

        //model for Login information that we will send to our database
        const newUser = new User({ userId, email: convertemail, hashedPass })
        await newUser.save()

        const loginToken = jwt.sign(
            { userId, email: convertemail },
            process.env.JWT_SECRET,  
            { expiresIn: '24h' }    
        )
        return res.status(201).json({ loginToken, userId }) //logging info
    }
    catch(err){
        console.log(err)
    }
};

const login = async (req, res) => {
    const { email, password } = req.body

try{
  
    const finduser = await User.findOne({ email })

    if(finduser && (await bcrypt.compare(password, finduser.hashedPass))){  //if we find the email, and the password is correct
        const loginToken = jwt.sign(
            { userId: finduser.userId, email: finduser.email },
            process.env.JWT_SECRET,  
            { expiresIn: '24h' }   
        )
        return res.status(201).json({ loginToken, userId: finduser.userId }) //logging 
    }
    return res.status(400).send("INVALID credentials!") //error logging
    }
    catch(err){
        console.log(err)
    }
}

module.exports = { signup, login }