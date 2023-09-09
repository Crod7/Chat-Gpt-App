import React from 'react';

interface ConversationProps {
  conversation: string[];
}

const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  return (
    <div className="flex flex-col"> {/* Use flex-col to stack items vertically */}
      {conversation.map((message: string, index: number) => (
        <div key={index} className="flex-shrink-0"> {/* Apply flex-shrink-0 */}
          {message}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
