import React, { useState } from 'react';
import axios from 'axios';
import data from '../../lib/testEvent';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

interface TimeseriesData {
  [timestamp: string]: {
    totalOpens: number;
    time: string;
  };
}
interface MetricsData {
  countryCount: any;
  deviceCount: any;
  timeseries: TimeseriesData;
}

export default function LoginPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    // User is already authenticated, redirect them to the home page or dashboard
    return (
      <div>
        <p>Welcome, {user.name}!</p>
        <Link href="/dashboard">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Please log in to continue.</p>
      <Link href="/api/auth/login">Log in with Auth0</Link>
    </div>
  );
}
