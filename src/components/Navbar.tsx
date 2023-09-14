
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

function Navbar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div></div>;
  }

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li className="nav-item">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link href="/profile">Profile</Link>
            </li>
          </>
        ) : (
          <div className="login-wrapper">
            <li className="nav-item">
              <Link
                href="/api/auth/login"
                className="login-link"
              >
                Login
              </Link>
            </li>
          </div>
        )}
      </ul>
      {user && (
        <div className="user-wrapper">
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name || 'User'}
              className="user-avatar"
            />
          )}
          <Link
            href="/api/auth/logout"
            className="logout-link"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
