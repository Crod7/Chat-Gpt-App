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

  return (
    <div className="conversation-container">
      {conversation.map((message: Message, index: number) => (
        <div key={index} className="message-container">
          {message.text.substring(0, 2) === 'us' && user ? (
            <img
              src={user.picture || defaultImage}
              alt="User"
              className="message-image"
            />
          ) : null}
          {message.text.substring(0, 2) === 'us' && !user ? (
            <img
              src={defaultImage}
              alt="User"
              className="message-image"
           />
          ) : null}
          {message.text.substring(0, 2) === 'ai' ? (
            <img
              src={'/assets/aiIcon.png' || defaultImage}
              alt="User"
              className="message-image"
            />
          ) : null}
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
