import React, { useEffect, useState } from 'react';
import DetailLayout from '../../layouts/DetailLayout/DetailLayout';
import { fetchEpisodes } from '../../services/episodeService';
import type { TEpisode } from '../../types';
import { useParams } from 'react-router-dom';
import EpisodeListSkeleton from '../../components/Skeleton/EpisodeListSkeleton/EpisodeListSkeleton';
import EpisodesList from '../../components/EpisodesList/EpisodesList';

const PodcastDetail: React.FC = () => {
  const { idPodcast } = useParams<{ idPodcast: string }>();
  const [episodes, setEpisodes] = useState<TEpisode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEpisodes = async () => {
      setLoading(true);
      try {
        if (idPodcast) {
          const data = await fetchEpisodes(Number(idPodcast));
          setEpisodes(data);
        }
      } finally {
        setLoading(false);
      }
    };
    getEpisodes();
  }, [idPodcast]);

  const mainContent = (
    <div>
      {loading ? (
        <EpisodeListSkeleton />
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
