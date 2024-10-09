import React, { useEffect, useState } from 'react';
import { fetchPodcasts } from '../../services/podcastService';
import type { TPodcast } from '../../types';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import PodcastCardSkeleton from '../../components/Skeleton/PodcastCardSkeleton/PodcastCardSkeleton';
import { useTranslation } from 'react-i18next';
import useFetchData from '../../hooks/useFetchData';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('');

  const {
    data: podcasts,
    loading,
    error,
    fetchData: getPodcasts,
  } = useFetchData<TPodcast[]>(fetchPodcasts);

  useEffect(() => {
    getPodcasts();
  }, []);

  const handleRetry = () => {
    getPodcasts();
  };

  const filteredPodcasts = podcasts?.filter(
    (podcast: TPodcast) =>
      podcast.author.toLowerCase().includes(filter.toLowerCase()) ||
      podcast.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 my-4">
      <div className="flex justify-end items-center gap-2">
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full font-semibold text-md">
          {filter ? filteredPodcasts?.length : podcasts?.length || 0}
        </div>
        <input
          type="text"
          placeholder={t('placeholderSearch')}
          className="p-2 border border-gray-300 rounded w-full max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <>
        {error ? (
          <div className="flex justify-center items-center h-full">
            <div
              className="cursor-pointer text-black underline text-2xl font-bold flex items-center gap-1 hover:text-gray-600"
              onClick={handleRetry}
            >
              {t('button.refresh')}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <PodcastCardSkeleton key={index} />
                ))
              : filteredPodcasts?.map((podcast: TPodcast) => (
                  <PodcastCard key={podcast.id} podcast={podcast} />
                ))}
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
