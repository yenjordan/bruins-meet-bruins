const PORT = 8000   //place holder port

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MongoClient } = require("mongodb");
require('dotenv').config();

const authRoute = require('./routes/authRoute')
const matchingRoute = require('./routes/matchingRoute')
const swipeRoute = require('./routes/swipeRoute')
const prefRoute = require('./routes/preferenceRoute')
const connectionRoute = require('./routes/connectionRoute')
const messageRoute = require('./routes/messageRoute');
const uploadRoute = require('./routes/uploadRoutes')
//temp uri link, will convert to hidden with env later
const uri = process.env.URI
 
//middleware
const app = express()
app.use(cors())
app.use(express.json())
app.use('/profile', authRoute);

app.use('/', authRoute)
app.use('/matching', matchingRoute)
app.use('/swipe', swipeRoute)
app.use('/preferences', prefRoute);
app.use('/connections', connectionRoute)
app.use('/messages', messageRoute)
app.use('/uploads', express.static('uploads'));
app.use(uploadRoute);

//connect to mongoDB collection
const connectToDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB.");
    } catch (err) {
      console.error(err);
      process.exit(1); 
    }
  };
  connectToDB();    //conect to databse

//callback function syntax, client sending requests to server,
//for example, user fills in login information, this needs to be sent to backend server to authenticate
app.get("/", (req, res) => {
    res.json('Hello APP!')
})


//get every user information
app.get("/users", async (req, res) => {
    const client = new MongoClient(uri) //pass through our database so we can connect to it

    try{
        await client.connect() //connect to client
        const database = client.db('data-app') //name of our database on mongo
        const user = database.collection('users')   //collection called user in our database

        const totalusers = await user.find().toArray()
        res.json(totalusers);
    }finally{
        await client.close()
    }
})

app.listen(PORT, () => console.log('Server is running on: ' + PORT))