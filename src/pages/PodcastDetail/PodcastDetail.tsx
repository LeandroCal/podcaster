import React, { useEffect, useState } from 'react';
import DetailLayout from '../../layouts/DetailLayout/DetailLayout';
import { fetchEpisodes } from '../../services/episodeService';
import type { TEpisode } from '../../types';
import { useParams } from 'react-router-dom';
import EpisodeListSkeleton from '../../components/Skeleton/EpisodeListSkeleton/EpisodeListSkeleton';
import EpisodesList from '../../components/EpisodesList/EpisodesList';
import { useAlert } from '../../context/AlertContext';

const PodcastDetail: React.FC = () => {
  const { idPodcast } = useParams<{ idPodcast: string }>();
  const [episodes, setEpisodes] = useState<TEpisode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { openAlert } = useAlert();

  const getEpisodes = async () => {
    setLoading(true);
    try {
      if (idPodcast) {
        const data = await fetchEpisodes(Number(idPodcast));
        if (data) {
          setEpisodes(data);
        } else {
          openAlert('Failed to fetch episodes. Please try again later.');
          setError(true);
        }
      }
    } catch {
      openAlert('Hubo un error al cargar los episodios.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEpisodes();
  }, [idPodcast]);

  const handleRetry = () => {
    getEpisodes();
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
            Refresh
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="border border-gray-300 text-3xl font-bold mb-4 p-4">
            Episodes: {episodes.length}
          </div>
          <div className="border border-gray-300 p-4">
            <EpisodesList episodes={episodes} idPodcast={idPodcast || ''} />
          </div>
        </div>
      )}
    </div>
  );

  return <DetailLayout mainContent={mainContent} />;
};

export default PodcastDetail;
