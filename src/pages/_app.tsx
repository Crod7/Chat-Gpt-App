import '@/src/styles/globals.css'
// pages/_app.js
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app'; // Needed for typeScript

export default function App({ Component, pageProps }:AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}