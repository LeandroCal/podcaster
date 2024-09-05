import React from 'react';

const EpisodeListSkeleton: React.FC = () => {
  return (
    <>
      <div
        className="bg-gray-200 animate-pulse h-16 mb-4"
        data-testid="episode-list-skeleton"
      ></div>
      <div className="flex flex-col space-y-4" data-testid="skeleton-list">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center border-b py-2"
            data-testid={`skeleton-item-${index}`}
          >
            <div
              className="w-2/5 h-6 bg-gray-200 animate-pulse"
              data-testid={`skeleton-item-${index}-1`}
            ></div>
            <div
              className="w-1/5 h-6 bg-gray-200 animate-pulse"
              data-testid={`skeleton-item-${index}-2`}
            ></div>
            <div
              className="w-1/5 h-6 bg-gray-200 animate-pulse"
              data-testid={`skeleton-item-${index}-3`}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EpisodeListSkeleton;
