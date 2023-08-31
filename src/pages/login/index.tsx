import React, { useEffect, useState } from 'react';
import axios from 'axios';
import data from '../../../lib/testEvent';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import router from 'next/router';
import LoadingScreen from '../../components/LoadingScreen';

export default function LoginPage() {
  const { user, error, isLoading } = useUser();

  // If user is already authenticated, redirect to the dashboard or another page
  useEffect(() => {
    if (user) {
      router.push('/apicall');
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  // Used for user registration if not in database
  const registerUser = async () => {
    try {
      const userData = {
        nickname: user?.nickname,
        family_name: user?.family_name,
        given_name: user?.given_name,
        picture: user?.picture,
      };
      const registerResponse = await axios.post('/api/user/set_user', {
        user: userData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="top-section">
          <h1 className="login-title">Choose a Login Method</h1>
        </div>
        <div className="bottom-section">
          <div className="left">
            <Link className="login-button" href="/api/auth/login">
              AuthO Login
            </Link>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <Link className="login-button" href="/api/auth/login">
              Try w/out Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
