// controllers/messageControl.js
const Message = require('../model/message');

// Save a message
const saveMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    if (!senderId || !receiverId || !content) {
        console.error("Invalid message data:", req.body); // Log missing data
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newMessage = await Message.create({ senderId, receiverId, content });
        console.log("Message saved:", newMessage); // Log saved message
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ message: "Failed to save message" });
    }
};


// Get messages between two users
const getMessages = async (req, res) => {
    const { userId1, userId2 } = req.query;

    try {
        const messages = await Message.find({
            $or: [
                { senderId: userId1, receiverId: userId2 },
                { senderId: userId2, receiverId: userId1 },
            ],
        }).sort({ timestamp: 1 });

        console.log("Messages fetched from DB:", messages); // Log fetched messages
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Failed to fetch messages" });
    }
};



module.exports = { saveMessage, getMessages };
