import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header/Header';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => key,
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('Header', () => {
  test('should render app title correctly on home page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('appTitle')).toBeInTheDocument();
  });

  test('should render app title as a link on non-home pages', () => {
    render(
      <MemoryRouter initialEntries={['/other']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('appTitle')).toHaveAttribute('href', '/');
  });

  test('should not change language when current language is selected', () => {
    const { i18n } = useTranslation();
    i18n.language = 'es';

    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const spanishFlag = screen.getByAltText('flag.spain');
    fireEvent.click(spanishFlag);

    expect(i18n.changeLanguage).not.toHaveBeenCalled();
  });
});
