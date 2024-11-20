import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import MessageInput from './Input';
import './Message.css';

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState(0);
  const [messagesByUser, setMessagesByUser] = useState({});

  const addMessage = (text, isUserMessage, userId) => {
    setMessagesByUser((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), { text, isUserMessage }],
    }));
  };

  const Sidebar = ({ selectedUser, setSelectedUser }) => {
    return (
      <div className="userlist">
        {Array.from({ length: 30 }).map((_, index) => {
          const isSelected = selectedUser === index;
          return (
            <div
              key={index}
              className={isSelected ? 'selectedUser' : 'user'}
              onClick={() => setSelectedUser(index)}
            >
              User {index + 1}
            </div>
          );
        })}
      </div>
    );
  };

  const ContentArea = ({ messagesByUser, selectedUser, addMessage }) => {
    const messages = messagesByUser[selectedUser] || [];

    return (
      <div className="contentArea">
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
      </div>
    );
  };

  return (
    <div className="container">
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <ContentArea
        messagesByUser={messagesByUser}
        selectedUser={selectedUser}
        addMessage={addMessage}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ChatApp />);
