import React from 'react';
import { Link } from 'react-router-dom';
import type { IPodcastCardProps } from '../../types';
import { useTranslation } from 'react-i18next';

const PodcastCard: React.FC<IPodcastCardProps> = ({ podcast }) => {
  const { t } = useTranslation();
  const { id, title, author, img } = podcast;

  return (
    <Link to={`/podcast/${id}`} className="relative mt-24 w-full mx-auto">
      <div className="rounded overflow-hidden shadow-md hover:bg-gray-100 bg-white h-full">
        <div className="absolute -mt-20 w-full flex justify-center">
          <div className="h-32 w-32">
            <img
              src={img}
              alt={title}
              className="rounded-full object-cover h-full w-full border border-gray-200"
            />
          </div>
        </div>
        <div className="text-center px-4 mt-16 pb-4">
          <div className="text-lg font-bold mb-1">{title}</div>
          <div className="text-sm text-gray-500">
            {t('podcastAuthor')}: {author}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard;
