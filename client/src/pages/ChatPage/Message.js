import React, { useState, useEffect } from 'react';
import MessageInput from './Input';
import './Message.css';
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'


export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState(0);
  const [messagesByUser, setMessagesByUser] = useState({});
  const [connections, setConnections] = useState([]) //list/array of connected users
  const [cookies] = useCookies(['UserId'])  //grab current userId from cookies
  const userId = cookies.UserId 
  const navigate = useNavigate()

  const handleSwipe = () => {
    navigate('/SwipePage')
}
  //fetch our connections of the current users
    useEffect(() => {
      const fetchConnections = async () =>{
        try{
          const response = await axios.get('http://localhost:8000/connections/getConnections', {
            params: { userId }
          })
          setConnections(response.data)
          console.log('Found connections!')
        }catch(error){
          console.error('Error getting connections: ', error)
        }
      }
      fetchConnections()
    }, [userId])
  
    const fetchMessages = async (userId) => {
      try {
          const response = await axios.get('http://localhost:8000/messages/getMessages', {
              params: { userId1: cookies.UserId, userId2: userId },
          });
  
          const messages = response.data.map((message) => ({
              ...message,
              isUserMessage: message.senderId === cookies.UserId, // determine if the current user sent the message
          }));
  
          setMessagesByUser((prev) => ({
              ...prev,
              [userId]: messages,
          }));
      } catch (error) {
          console.error("Error fetching messages:", error);
      }
  };
  
    
    // update the sidebar to fetch messages when a user is selected
    const Sidebar = ({ connections, selectedUser, setSelectedUser }) => {
        const handleUserClick = (userId) => {
            setSelectedUser(userId);
            fetchMessages(userId); // fetch messages for the selected user
        };
    
        return (
            <div className="userlist">
                {connections.map((connection) => {
                    const isSelected = selectedUser === connection.userID;
                    return (
                        <div
                            key={connection.userID}
                            className={isSelected ? 'selectedUser' : 'user'}
                            onClick={() => handleUserClick(connection.userID)}
                        >
                            {`${connection.firstName} ${connection.lastName}` || 'Unnamed User'}
                        </div>
                    );
                })}
            </div>
        );
    };
    
    // add messages to the database and update state
    const addMessage = async (text, _, userId) => {
      if (!text.trim()) {
          console.error("Cannot send an empty message.");
          return;
      }
  
      try {
          // save the message to the database
          const response = await axios.post('http://localhost:8000/messages/saveMessage', {
              senderId: cookies.UserId,
              receiverId: userId,
              content: text,
          });
  
          const newMessage = {
              content: text,
              senderId: cookies.UserId,
              receiverId: userId,
              isUserMessage: true,
              timestamp: new Date(),
          };
  
          setMessagesByUser((prev) => ({
              ...prev,
              [userId]: [...(prev[userId] || []), newMessage],
          }));
      } catch (error) {
          console.error("Error saving message:", error);
      }
  };

    const ContentArea = ({ connections, messagesByUser, selectedUser, addMessage }) => {
      const messages = messagesByUser[selectedUser] || [];
  
      return (
        <div className="contentArea">
          <div className="chatHeader">
            <h2>{connections.find((conn) => conn.userID === selectedUser)?.firstName || 'Chat'}</h2>
            <button onClick={handleSwipe} className="swipe-button">
              Back to Swipe Page
            </button>
          </div>
          <div className="messageList">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.isUserMessage ? 'userMessage' : 'botMessage'}`}>
                {message.content || 'No content available'}
              </div>
            ))}
          </div>
          <div className="footer">
            <MessageInput addMessage={(text, isUserMessage) => addMessage(text, isUserMessage, selectedUser)} />
          </div>
        </div>
      );
    };
  

  return (
    <div className="container">
      <Sidebar
      /* pass in connections to retrieve user info */
        connections={connections} 
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser} 
      />
      <ContentArea
      /* pass in connections to retrieve user info */
        connections={connections} 
        messagesByUser={messagesByUser}
        selectedUser={selectedUser} 
        addMessage={addMessage}
      />
    </div>
  );
}


