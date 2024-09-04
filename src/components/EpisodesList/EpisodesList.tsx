import React from 'react';
import { Link } from 'react-router-dom';
import type { TEpisode } from '../../types';
import { formatReleaseDate, formatTrackTime } from '../../utils/functions';
import { useTranslation } from 'react-i18next';

const EpisodesList: React.FC<{ episodes: TEpisode[]; idPodcast: string }> = ({
  episodes,
  idPodcast,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center border-b-2 py-4 font-bold">
        <div className="w-[70%]">{t('episodeTable.title')}</div>
        <div className="w-[15%] text-center">{t('episodeTable.date')}</div>
        <div className="w-[15%] text-end">{t('episodeTable.duration')}</div>
      </div>

      {episodes.map((episode, index) => (
        <div
          key={episode.trackId}
          className={`flex flex-row justify-between items-center border-b p-4 gap-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
        >
          <div className="w-[70%]">
            <Link
              to={`/podcast/${idPodcast}/episode/${episode.trackId}`}
              className="text-blue-500 hover:underline"
            >
              {episode.trackName}
            </Link>
          </div>
          <div className="w-[15%] text-end">
            {formatReleaseDate(episode.releaseDate)}
          </div>
          <div className="w-[15%] text-end">
            {formatTrackTime(episode.trackTimeMillis)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodesList;
