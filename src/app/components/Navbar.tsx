"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold text-teal-600">FastBreak</span>
              <span className="text-gray-600">Insights</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/dashboard"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        pathname === '/dashboard'
                          ? 'bg-teal-100 text-teal-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Dashboard
                    </Link>
                    <div className="flex items-center space-x-4 border-l pl-4">
                      <span className="text-sm text-gray-500">{user.email}</span>
                      <a
                        href="/api/auth/logout"
                        className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                ) : (
                  <a
                    href="/api/auth/login"
                    className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
                  >
                    Login
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
