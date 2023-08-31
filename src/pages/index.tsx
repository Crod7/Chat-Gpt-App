import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import router from 'next/router';
import LoadingScreen from '../components/LoadingScreen';

export default function BasePage() {
  const { user, error, isLoading } = useUser();

  // If user is already authenticated, redirect to the dashboard or another page
  useEffect(() => {
    if (user) {
      router.push('/apicall');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <LoadingScreen />
    </div>
  );
}
