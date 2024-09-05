import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../../pages/NotFound/NotFound';

type Translations = {
  [key: string]: string;
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Translations = {
        notFoundCode: '404',
        notFoundText: 'Page Not Found',
      };
      return translations[key as keyof Translations] || key;
    },
  }),
}));

describe('NotFound Component', () => {
  it('should render the not found page with correct text', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
