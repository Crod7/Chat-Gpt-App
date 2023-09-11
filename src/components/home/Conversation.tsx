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
  const defaultImage = '/image.png';

  return (
    <div className="flex-col justify-start">
      {/* Use flex-col to stack items vertically */}
      {conversation.map((message: Message, index: number) => (
        <div key={index} className="flex justify-start items-center">
          {/* flex makes img stand next to the message */}
          {message.text.substring(0, 2) === 'us' && user ? (
            <img src={user.picture || defaultImage} alt="User" className="w-12 h-12 rounded-full m-2" />
          ) : null}
          {message.text.substring(0, 2) === 'ai' && user ? (
            <img src={'/assets/aiIcon.png' || defaultImage} alt="User" className="w-12 h-12 rounded-full m-2" />
          ) : null}
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
