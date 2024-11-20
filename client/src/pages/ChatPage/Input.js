import React, { useState } from 'react';

const MessageInput = ({ addMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputText.trim() !== '') {
      addMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your message"
        style={typeBoxStyle}
      />
    </div>
  );
};

const typeBoxStyle = {
  width: '90%',
  padding: '5px 10px',
  border: '1px solid #ccc',
  borderRadius: '100px',
  fontSize: '16px',
};

export default MessageInput;
