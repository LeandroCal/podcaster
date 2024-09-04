import React from 'react';

const PodcastCardSkeleton: React.FC = () => {
  return (
    <div className="relative mt-24 p-4 border border-gray-300 rounded bg-white shadow-md animate-pulse">
      <div className="absolute -mt-20 w-full flex justify-center">
        <div className="h-32 w-32 bg-gray-300 rounded-full"></div>
      </div>
      <div className="text-center px-4 mt-16 pb-4">
        <div className="h-6 bg-gray-300 rounded mb-1"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default PodcastCardSkeleton;
