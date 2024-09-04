import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    handleStart();
    const timer = setTimeout(() => {
      handleStop();
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Podcaster
            </Link>
          </div>
          {loading && (
            <div className="flex items-center justify-center h-6 w-6">
              <div className="animate-spin border-t-2 border-blue-500 border-solid rounded-full h-6 w-6"></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
