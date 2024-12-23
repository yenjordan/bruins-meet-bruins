# Bruins Meets Bruins

Bruin Meets Bruins is a client+server web application dedicated specifically towards UCLA students, with the purpose of making it easier for students to find meaningful connections with other Bruins based on shared interests and values. 
Our platform focuses exclusively on the UCLA community to foster a more personalized and relevant experience, helping students connect with people who share their campus life, activities, and goals.

Video demo of our web application: [here](https://www.youtube.com/watch?v=ttj-LaUd6BE)

### Features:

Required functionality:
1. User Authentication: (Log In Page) Each user must create a unique username (ucla.edu email) and password that must be entered in order to enter the site.
2. Upload data from the client to the back-end: (Create Profile Page, Preference Page) Each user must upload information like name, age, and photo to the site which persists in the server's file system.
3. Display dynamic data to the user: (Swipe Page) The swipe page will feature/display profile cards based on compatibility/matches. 
4. Meaningfully search through server-side data: 
(Swipe Page) After setting their specific preferences, the app then does a server side search- 
searching for certain ages (data content) of users in the database that lies within the given range, 
where these users will then be displayed as stated in the point #3. 

Additional Distinct Features:
1.  (Swipe Page) Users may swipe left (dislike) or right (like) on a dynamically displayed user profile card. If the user swipes left, then the profile card will not show up again. Once two users both swipe right on each other, a connection will be formed. 
2.  (Swipe Page) Calculated match percentage displayed on each profile card based on (matched keywords from userbio) / (total # of preferences from preference table), such that the user can quickly decide interest based on physical appearance and compability. 
Additionally, preferences may be changed at any time if the user decides to have a change of interests. Profile card shuffling and reevaluation of match percentage will be done automatically after saving.
3.  (Chat Feature) Chat feature to talk with each other once two users swipe right on each other (forms a connection between two users). Chat logs will be saved even after logging out. 

## Running Bruin Meets Bruin on your local machine
### Setup:

First, clone the repository, and cd into the cloned directory if necessary
(you may need to enter the full file path to cd into it, which can be done by just drag and dropping the directory into the terminal) 

Run the following commands:
```bash
git clone https://github.com/MarcT03/bruins-meet-bruins.git
cd bruins-meet-bruins
```
If you haven't installed Node.js at this point, you can do so [here](https://nodejs.org/en/download/package-manager)
Next, you will need to install the dependencies of both the client and server side. To do so, cd into the client directory first, then run npm install, then cd into the server directory, and run npm install again. To start up/run the program, in the client dir, you want to run 'npm run start', and in the server dir, you want to run 'npm run:start'.

**Note: You will also need to create/add a new directory/folder under 'server' called 'uploads' - this will be your storage/container for holding uploaded profile images.** 

(Alternatively, you can also open two different terminals if you are using a code editor like VSCode, and then have each terminal be designated for the client and server respectively)

(Do note that npm could take some time to start the server, and if it does not automatically open up on your browser, then you can manually enter 'http://localhost:3000/' into your browser)

**Client terminal**
```bash
cd bruins-meet-bruins/client
npm install
npm run start
```
**Server terminal**
```bash
cd bruins-meet-bruins/server
npm install
npm run start:backend
```

If an issue occurs when attempting to run, make sure your package.json contains the scripts dependency, 
```bash
Client package.json:
 "scripts": {
    "start": "react-scripts start",
  ...}
  
Severpackage.json:
  "scripts": {
    "start:backend": "nodemon index.js",
    ...}
```

### Connecting to our database + .env file
Our application utilizes MongoDB Atlas' database, if you do not already have one, you can navigate [here](https://www.mongodb.com/) to create an account

Create a new project and navigate to the 'Clusters' under the 'DATABASE' section- from here, find 'Create a new cluster' (can be named anything), and you would need to choose a new provider, where you can select AWS. Make sure you save/remember your username and password you created for the cluster. Now that we have created a cluster, you can additionally click on
'Browse Collections', then make sure ur on the collections tab, and click on 'Create Database' and name the databases of your cluster whatever you want, and this will be the main container of all our different tables/collections we want to store.
Once we have done that, navigate back to the 'Clusters' tab, then click on 'Connect' -> 'Drivers', then select Node.js and version 6.7 or later.

**Important: Under 'Security', find 'Network Access', and make sure your IP Address is correct as shown. If you want to access the database through various networks, you can add '0.0.0.0/0' as a connection address.**

 
Copy the connection string from your cluster, listed from step 3, and then navigate to the 'server' directory of your cloned repository, and then create a file called '.env' 

In your .env file, you want to copy paste the connection string in the form of: 
```bash
URI = 'mongodb+srv:/<db_username>:<db_password>@cluster1.cdta9.mongodb.net/<database_name>?retryWrites=true&w=majority&appName=Cluster1'
```
Replace <db_username> with your username for the cluster, and <db_password> with the password (these can be found under 'Security' -> 'Database Access') 

You can additionally replace <database_name> with the name of the database you created from earlier(you can find the name of the database you want to use by clicking on 'Browse collections' of your cluster, you can also create one now if you haven't already)

Then, because this program utilizes JWT (JSON Web Token) for user authentication, you will also want to add your JWT_SECRET to the .env file, in the form of:
```bash
JWT_SECRET='<yourkey>'
```
Replace < yourkey > with any string key/password you desire, making sure you keep the quotations (' ') as it is a string type key and this can be pasted under the URI connection string from above

## Technology Stacks Used

This project was bootstrapped with the MERN stack: MongoDB, Express.js, React.js, and Node.js.

We utilized React for our frontend interface, Express for our middleware to create POST and GET routes/requests on a Node.js server, sending requests from our client to server and also server to client

## Creators/Contributors
Larry Lim, GitHub Id: [larryl777](https://github.com/larryl777)

Julia Lou, GitHub Id: [lou-julia](https://github.com/lou-julia)

Marc Anthony Trujillo, GitHub Id: [MarcT03](https://github.com/MarcT03)

Htet Min Khant, GitHub Id: [HtetMinKhant19](https://github.com/HtetMinKhant19)

Jordan Yen, GitHub Id: [yenjordan](https://github.com/yenjordan)





