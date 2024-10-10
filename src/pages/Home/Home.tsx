import React, { useState } from 'react';
import type { TPodcast } from '../../types';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import PodcastCardSkeleton from '../../components/Skeleton/PodcastCardSkeleton/PodcastCardSkeleton';
import { useTranslation } from 'react-i18next';
import useFetchData from '../../hooks/useFetchData';
import { validateInput } from '../../utils/validations';
import type { HomeProps } from './Home.decl';

const Home: React.FC<HomeProps> = ({ fetchPodcasts }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('');
  const [filterError, setFilterError] = useState<string>('');

  const {
    data: podcasts,
    loading,
    error,
  } = useFetchData<TPodcast[]>(fetchPodcasts, []);

  const handleRetry = () => {
    fetchPodcasts();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const errorMessage = validateInput(input);
    setFilter(input);
    setFilterError(errorMessage);
  };

  const filteredPodcasts = podcasts?.filter(
    (podcast: TPodcast) =>
      podcast.author.toLowerCase().includes(filter.toLowerCase()) ||
      podcast.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 my-4">
      <div className="flex justify-end items-start gap-2 w-full">
        <div className="podcast-count bg-blue-500 text-white mt-1 px-3 py-1 rounded-full font-semibold text-md flex-shrink-0">
          {filter ? filteredPodcasts?.length : podcasts?.length || 0}
        </div>
        <div className="flex flex-col w-full lg:w-[330px]">
          <input
            type="text"
            placeholder={t('placeholderSearch')}
            className={`p-2 border ${filterError ? 'border-rose-500' : 'border-gray-300'} rounded w-full outline-none`}
            value={filter}
            onChange={handleChange}
          />
          {filterError && (
            <div className="text-red-500 text-sm mt-1">{t(filterError)}</div>
          )}
        </div>
      </div>

      <>
        {error ? (
          <div className="flex justify-center items-center h-full">
            <div
              className="refresh-button cursor-pointer text-black underline text-2xl font-bold flex items-center gap-1 hover:text-gray-600"
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
