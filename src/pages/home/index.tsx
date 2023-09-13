import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import HomeContainer from '@/src/containers/Home';

export default function Home() {
  return (
    <div>
      <HomeContainer />
    </div>
  );
}
