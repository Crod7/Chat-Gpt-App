import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import ChatBox from '@/src/components/home/ChatBox';

export default function Home() {
  return (
    <div>
      <ChatBox />
    </div>
  );
}
