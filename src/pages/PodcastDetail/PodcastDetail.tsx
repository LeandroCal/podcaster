import React from 'react';
import DetailLayout from '../../layouts/DetailLayout/DetailLayout';
import type { TEpisode } from '../../types';
import { useParams } from 'react-router-dom';
import EpisodeListSkeleton from '../../components/Skeleton/EpisodeListSkeleton/EpisodeListSkeleton';
import EpisodesList from '../../components/EpisodesList/EpisodesList';
import { useTranslation } from 'react-i18next';
import useFetchData from '../../hooks/useFetchData';
import type { PodcastDetailProps } from './PodcastDetail.decl';

const PodcastDetail: React.FC<PodcastDetailProps> = ({ fetchEpisodes }) => {
  const { t } = useTranslation();
  const { idPodcast } = useParams<{ idPodcast: string }>();

  const {
    data: episodes,
    loading,
    error,
  } = useFetchData<TEpisode[]>(
    () => fetchEpisodes(Number(idPodcast)),
    [idPodcast]
  );

  const handleRetry = () => {
    idPodcast && fetchEpisodes(Number(idPodcast));
  };

  const mainContent = (
    <div>
      {loading ? (
        <EpisodeListSkeleton />
      ) : error ? (
        <div className="flex justify-center">
          <div
            className="cursor-pointer text-black underline text-2xl font-bold flex items-center gap-1 hover:text-gray-600"
            onClick={handleRetry}
          >
            {t('button.refresh')}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="episodes-count border border-gray-300 text-3xl font-bold mb-4 p-4">
            {t('episodesTitle')}: {episodes?.length || 0}
          </div>
          <div className="border border-gray-300 p-4">
            <EpisodesList
              episodes={episodes || []}
              idPodcast={idPodcast || ''}
            />
          </div>
        </div>
      )}
    </div>
  );

  return <DetailLayout mainContent={mainContent} />;
};

export default PodcastDetail;
