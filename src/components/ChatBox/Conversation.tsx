import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface Message {
  text: string;
}

interface ConversationProps {
  conversation: Message[];
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  const { user, error, isLoading } = useUser();

  // Define a default image in case the user has a null image
  const defaultImage = '/assets/default.png';

  // Function to remove 'user: ' or 'ai: ' prefix
  const removePrefix = (text: string) => {
    return text.replace(/^( user| ai):\s+/, ''); // Removes 'user: ' or 'ai: ' followed by spaces
  };

  return (
    <div className="conversation-container">
      {conversation.map((message: Message, index: number) => (
        <div key={index} className="message-container">
          {message.text.substring(1, 3) === 'us' && user ? (
            <img
              src={user.picture || defaultImage}
              alt="User"
              className="message-image"
            />
          ) : null}
          {message.text.substring(1, 3) === 'us' && !user ? (
            <img src={defaultImage} alt="User" className="message-image" />
          ) : null}
          {message.text.substring(1, 3) === 'ai' ? (
            <img
              src={'/assets/aiIcon.png' || defaultImage}
              alt="User"
              className="message-image"
            />
          ) : null}
          {removePrefix(message.text)}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
