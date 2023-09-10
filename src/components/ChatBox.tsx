import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Conversation from './Conversation';


// ChatBox found on home page
function ChatBox() {
  const {user, error} = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);


  // Submits user input and gets OpenAI response
  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setConversation(data.result);
      console.log(conversation)
      setUserInput('');
    } catch (error) {
      console.log(error);
    }
  }



  return (
      <div className='
      border: border border-black-500 m-5 rounded-lg p-4 shadow-md p-4 
      background-color: bg-gradient-to-b from-blue-500 to-blue-900 text-white p-4 
      space: flex flex-col bottom-1     
      '>
                

        {/* Holds the messages between user and ai */}
        <div>
          <Conversation conversation={Array.isArray(conversation) ? conversation : [conversation]} />
        </div>


        <form onSubmit={onSubmit} className='w-full'>
          <input
            type="text"
            name="chatbot"
            placeholder="Ask a question"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input 
            type="submit" 
            value="Generate names" 
            className='bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-600 cursor-pointer'
          />
        </form>
      </div>


  );
}

export default ChatBox;
