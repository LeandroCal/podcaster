import React, { useEffect, useMemo, useState } from 'react';
import DetailLayout from '../../layouts/DetailLayout/DetailLayout';
import type { TEpisode } from '../../types';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/icons/Back.svg';

const EpisodeDetail: React.FC = () => {
  const { idPodcast, idEpisode } = useParams<{
    idPodcast: string;
    idEpisode: string;
  }>();
  const [episode, setEpisode] = useState<TEpisode | null>(null);

  useEffect(() => {
    const storedEpisodes = localStorage.getItem(`episodes_${idPodcast}`);

    if (storedEpisodes) {
      const episodes: TEpisode[] = JSON.parse(storedEpisodes);
      const selectedEpisode = episodes.find(
        (ep) => ep.trackId === parseInt(idEpisode || '')
      );
      setEpisode(selectedEpisode || null);
    }
  }, [idPodcast, idEpisode]);

  const audioContent = useMemo(() => {
    if (!episode?.episodeUrl) return null;

    return (
      <audio controls className="w-full">
        <source src={episode.episodeUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
  }, [episode?.episodeUrl]);

  const mainContent = (
    <>
      <div className="border border-gray-300 p-4 mb-4">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-bold">{episode?.trackName}</div>
          <div
            dangerouslySetInnerHTML={{ __html: episode?.description || '' }}
          />
          {audioContent}
        </div>
      </div>
      <div className="w-fit">
        <Link
          to={`/podcast/${idPodcast}`}
          className="text-blue-600 underline flex items-center gap-1 hover:text-blue-800"
        >
          <BackIcon />
          Back to episode list
        </Link>
      </div>
    </>
  );

  return <DetailLayout mainContent={mainContent} />;
};

export default EpisodeDetail;
