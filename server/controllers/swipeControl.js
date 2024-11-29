const userSwipes = require('../model/swipeRight')
const userConnections = require('../model/connections')

const getSwipes = async (req, res) => {
    const { swiperId, swipedId, direction } = req.body;
    try{
        await userSwipes.create({ 
            swiperId,
            swipedId,
            direction
        })
        if(direction === 'right'){
            const mutualSwipe = await userSwipes.findOne({
                swiperId: swipedId,
                swipedId: swiperId,
                direction: 'right'
            })
            if(mutualSwipe){
                await userConnections.create({ 
                    userId1: swiperId,
                    userId2: swipedId,
                })
            console.log(`Match between ${swiperId} and ${swipedId}`)
         }
    }
        res.status(201).json({message: 'Swipe recorded without error'})
    } catch(error){
        console.error('Error handling swipes: ', error)
        res.status(500).json({message: 'Error occured'})
    }
 
};

module.exports = { getSwipes }