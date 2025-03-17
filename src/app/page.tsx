'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Home() {
  const { user, isLoading } = useUser();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block text-teal-600">NBA Insights</span>
          <span className="block text-gray-600 mt-2">Basketball Analytics Platform</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Get real-time insights into player performance, track statistics, and analyze game data with our comprehensive basketball analytics dashboard.
        </p>
        <div className="mt-8">
          {!isLoading && (
            user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:text-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/api/auth/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:text-lg"
              >
                Get Started
              </Link>
            )
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Player Statistics</h3>
            <p className="text-gray-600">
              Track comprehensive player stats including points, rebounds, assists, and shooting percentages.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Analytics</h3>
            <p className="text-gray-600">
              Visualize player performance with interactive charts and detailed statistical breakdowns.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Insights</h3>
            <p className="text-gray-600">
              Compare player statistics and identify trends with our advanced analytics tools.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to elevate your game?
        </h2>
        <p className="text-gray-600 mb-8">
          Join NBA Player Insights today and unlock the power of basketball analytics.
        </p>
        {!isLoading && !user && (
          <Link
            href="/api/auth/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-teal-100 hover:bg-teal-200 md:text-lg"
          >
            Start Free Trial
          </Link>
        )}
      </div>
    </div>
  );
}
