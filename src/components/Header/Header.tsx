import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import spainFlag from '../../assets/images/spain_flag.png';
import ukFlag from '../../assets/images/uk_flag.png';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    handleStart();
    const timer = setTimeout(() => {
      handleStop();
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            {isHomePage ? (
              <div className="text-black">{t('appTitle')}</div>
            ) : (
              <Link to="/" className="text-blue-500 hover:text-blue-700">
                {t('appTitle')}
              </Link>
            )}
          </div>
          <div className="flex flex-row gap-4">
            {loading && (
              <div className="flex items-center justify-center h-6 w-6">
                <div className="animate-spin border-t-2 border-blue-500 border-solid rounded-full h-6 w-6"></div>
              </div>
            )}
            <div
              className={`cursor-pointer ${currentLanguage === 'en' ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() =>
                currentLanguage !== 'en' && handleChangeLanguage('en')
              }
            >
              <img className="h-6" src={spainFlag} alt={t('flag.spain')} />
            </div>
            <div
              className={`cursor-pointer ${currentLanguage === 'es' ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() =>
                currentLanguage !== 'es' && handleChangeLanguage('es')
              }
            >
              <img className="h-6" src={ukFlag} alt={t('flag.uk')} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
