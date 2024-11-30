const userConnections = require('../model/connections')
const userProfile = require('../model/profile')


const getConnections = async (req, res) => {
    const { userId } = req.query //grab userId of current user

    try{
        const connections = await userConnections.find({    //search through connection collection
            $or: [{ userId1: userId}, { userId2: userId }]  //determine if the current user is user1 or user2
        })
        if(!connections || connections.length === 0){
            return res.status(400).json({message: 'Could not find any connections'})
        }
        // console.log(connections)
        //map to the current user's id or connected user's id based off our pulled data
        const mapconnectedId = connections.map((con) => 
            con.userId1 === userId ? con.userId2 : con.userId1
        )
        //at this point all what we are doing is determining which userID is the one currently logged in


        //once we determine which user is logged in, find the other the profiles of users we connected iwth
        const connectedProfile = await userProfile.find(
            { userID: { $in: mapconnectedId } },
            { firstName: 1, lastName: 1, userID: 1 } 
        );
        res.status(200).json(connectedProfile)
        // console.log(connectedProfile)
    }catch(error){
        console.error('Error fetching connections: ', error)
        res.status(500).json({ message: 'Error occurred while fetching connections' });
    }
};

module.exports = { getConnections }