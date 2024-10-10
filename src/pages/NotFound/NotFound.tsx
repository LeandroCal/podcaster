import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="not-found-code text-4xl font-bold">{t('notFoundCode')}</h1>
      <p className="not-found-text text-xl mt-4">{t('notFoundText')}</p>
    </div>
  );
};

export default NotFound;
