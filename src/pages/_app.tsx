import '@/src/styles/globals.css';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app'; // Needed for typeScript
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  );
}
