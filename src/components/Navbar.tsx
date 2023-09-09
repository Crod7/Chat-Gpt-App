import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

function Navbar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div></div>;
  }

  return (
    <nav className="bg-gradient-to-b from-blue-500 to-blue-900 text-white p-4 
    py-3 px-6 flex justify-between items-center">
      <ul className="flex items-center space-x-6 text-white ml-auto mr-10">
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </>
        ) : (
          <div className="flex items-center">
            <li>
              <Link
                href="/api/auth/login"
                className="text-white border border-white border-opacity-40 hover:border-opacity-100 rounded px-3 py-1 font-bold"
              >
                Login
              </Link>
            </li>
          </div>
        )}
      </ul>
      {user && (
        <div className="flex items-center">
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name || 'User'}
              className="w-8 h-8 rounded-full mr-3"
            />
          )}
          <Link
            href="/api/auth/logout"
            className="text-white border border-white border-opacity-40 hover:border-opacity-100 rounded px-3 py-1 font-bold"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
