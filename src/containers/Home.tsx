import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import ChatBox from '../components/home/ChatBox';

function HomeContainer() {
  const { user, error } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

  return (
    <div className="Home-Container">
      <ChatBox />
    </div>
  );
}

export default HomeContainer;
