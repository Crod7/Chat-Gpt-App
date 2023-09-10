import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface ConversationProps {
  conversation: string[];
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  const { user, error, isLoading } = useUser();


  // Define a default image incase user has null image
  const defaultImage = '/image.png'
  return (
    <div className="flex-col justify-start"> {/* Use flex-col to stack items vertically */}
      {conversation.map((message: string, index: number) => (
        <div key={index} className="flex justify-start items-center"> {/* flex makes img stand next to message*/}

          {message.substring(0,2) === 'us' && user ? (
            <img src={user.picture || defaultImage} alt='User' className='w-8 h-8 rounded-full mr-2' />
          ) : null}


          {message}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
