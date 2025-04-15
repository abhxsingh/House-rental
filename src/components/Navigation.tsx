import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">House Rentals</h1>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={logout}
              className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}