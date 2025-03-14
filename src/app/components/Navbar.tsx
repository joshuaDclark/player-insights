"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from 'next/link';

export default function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              FastBreak Insights
            </Link>
          </div>
          
          <div className="flex items-center">
            {isLoading ? (
              <div>Loading...</div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                  Dashboard
                </Link>
                <a
                  href="/api/auth/logout"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Logout
                </a>
                <span className="text-gray-700">{user.email}</span>
              </div>
            ) : (
              <a
                href="/api/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
