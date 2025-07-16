import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white px-4 mt-22">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-orange-500">404</h1>
        <p className="text-2xl mt-4 mb-2">Oops! Page Not Found</p>
        <p className="text-gray-400 mb-6">The page you’re looking for doesn’t exist or has been moved.</p>

        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold transition">
          Go Back Home
        </Link>
      </div>

      <img
        src="/images/404.svg"
        alt="Not Found Illustration"
        className="mt-10 max-w-sm w-full"
      />
    </div>
  );
};

export default NotFound;
