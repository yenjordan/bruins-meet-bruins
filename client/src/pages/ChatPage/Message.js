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
  
    const addMessage = async (text, isUserMessage, userId) => {
      try {
          await axios.post('http://localhost:8000/messages/saveMessage', {
              senderId: cookies.UserId,
              receiverId: userId,
              content: text,
          });
          setMessagesByUser((prev) => ({
              ...prev,
              [userId]: [...(prev[userId] || []), { text, isUserMessage }],
          }));
      } catch (error) {
          console.error("Error saving message:", error);
      }
  };
  
//pass through our connections that we fetched so we can display on the sidebar
  const Sidebar = ({ connections, selectedUser, setSelectedUser }) => {
    return (
      <div className="userlist">
        {/* map our connection and current user */}
        {connections.map((connection) => {
          const isSelected = selectedUser === connection.userID; 
          return (
            /* populate sidebar with connected user info */
            <div
              key={connection.userID}  
              className={isSelected ? 'selectedUser' : 'user'}
              onClick={() => setSelectedUser(connection.userID)} 
            >
              {`${connection.firstName} ${connection.lastName}` || 'Unnamed User'} 
            </div>
          );
        })}
      </div>
    );
  };

  const ContentArea = ({ connections, messagesByUser, selectedUser, addMessage }) => {
    const messages = messagesByUser[selectedUser] || [];

    //adding header when clicking on users on sidebar
    const selecteduserInfo = connections.find(connection => connection.userID === selectedUser)
    const selecteduserName = selecteduserInfo ? `${selecteduserInfo.firstName} ${selecteduserInfo.lastName}` : ' '

    return (
      <div className="contentArea">
        {/* added class header that can be styled */}
        <div className = "chatHeader">
          <h2>
            {selecteduserName}
          </h2>
        </div>
        <div className="messageList">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUserMessage ? 'userMessage' : 'botMessage'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="footer">
          <MessageInput addMessage={(text, isUserMessage) => addMessage(text, isUserMessage, selectedUser)} />
        </div>
        <button onClick={handleSwipe} className="swipe-button">Back to Swipe Page</button>
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


