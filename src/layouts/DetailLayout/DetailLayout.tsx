import React, { useEffect, useState } from 'react';
import type { IDetailLayoutProps, TPodcast } from '../../types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DetailLayout: React.FC<IDetailLayoutProps> = ({ mainContent }) => {
  const { t } = useTranslation();
  const { idPodcast } = useParams<{ idPodcast: string }>();
  const [podcast, setPodcast] = useState<TPodcast | null>(null);

  useEffect(() => {
    const storedPodcasts = localStorage.getItem('podcasts');
    if (storedPodcasts) {
      const podcasts: TPodcast[] = JSON.parse(storedPodcasts);
      const selectedPodcast = podcasts.find((p) => p.id === idPodcast);
      if (selectedPodcast) {
        setPodcast(selectedPodcast);
      } else {
        console.error('Podcast not found');
      }
    } else {
      console.error('No podcasts found in localStorage');
    }
  }, [idPodcast]);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 my-4">
      <div className="w-full md:w-3/12 lg:w-4/12 p-4 border border-gray-300 h-fit">
        <div className="flex flex-col md:flex-col sm:flex-row gap-4 md:gap-2">
          <img
            src={podcast?.img}
            alt={`${podcast?.title} cover`}
            className="w-full mb-4"
          />
          <div className="flex flex-col">
            <div className="text-2xl font-bold md:border-t md:border-gray-200 md:pt-2">
              {podcast?.title}
            </div>
            <div className="text-lg italic mb-3 border-b border-gray-200 md:pb-2">
              {t('byAuthor')} {podcast?.author}
            </div>
            <div>{podcast?.description}</div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-9/12 lg:w-8/12">{mainContent}</div>
    </div>
  );
};

export default DetailLayout;
