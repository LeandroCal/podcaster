import React, { useEffect, useState } from 'react';
import { fetchPodcasts } from '../../services/podcastService';
import type { TPodcast } from '../../types';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import PodcastCardSkeleton from '../../components/Skeleton/PodcastCardSkeleton/PodcastCardSkeleton';
import { useAlert } from '../../context/AlertContext';

const Home: React.FC = () => {
  const [podcasts, setPodcasts] = useState<TPodcast[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { openAlert } = useAlert();

  const getPodcasts = async () => {
    setLoading(true);
    try {
      const data = await fetchPodcasts();
      if (data) {
        setPodcasts(data);
      } else {
        openAlert('Failed to fetch podcasts. Please try again later.');
        setError(true);
      }
    } catch {
      openAlert('Failed to fetch podcasts. Please try again later.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPodcasts();
  }, []);

  const handleRetry = () => {
    getPodcasts();
  };

  const filteredPodcasts = podcasts.filter(
    (podcast: TPodcast) =>
      podcast.author.toLowerCase().includes(filter.toLowerCase()) ||
      podcast.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 my-4">
      <div className="flex justify-end items-center gap-2">
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full font-semibold text-md">
          {filter ? filteredPodcasts.length : podcasts.length}
        </div>
        <input
          type="text"
          placeholder="Filter podcasts..."
          className="p-2 border border-gray-300 rounded w-full max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <PodcastCardSkeleton key={index} />
          ))
        ) : error ? (
          <div className="flex justify-center">
            <div
              className="cursor-pointer text-black underline text-2xl font-bold flex items-center gap-1 hover:text-gray-600"
              onClick={handleRetry}
            >
              Refresh
            </div>
          </div>
        ) : (
          filteredPodcasts.map((podcast: TPodcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
