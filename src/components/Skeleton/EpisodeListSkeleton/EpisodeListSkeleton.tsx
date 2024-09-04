import React from 'react';

const EpisodeListSkeleton: React.FC = () => {
  return (
    <>
      <div className="bg-gray-200 animate-pulse h-16 mb-4"></div>
      <div className="flex flex-col space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center border-b py-2"
          >
            <div className="w-2/5 h-6 bg-gray-200 animate-pulse"></div>
            <div className="w-1/5 h-6 bg-gray-200 animate-pulse"></div>
            <div className="w-1/5 h-6 bg-gray-200 animate-pulse"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EpisodeListSkeleton;
