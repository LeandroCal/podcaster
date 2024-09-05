import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../components/Header/Header';
import { MemoryRouter } from 'react-router-dom';
import spainFlag from '../../assets/images/spain_flag.png';
import ukFlag from '../../assets/images/uk_flag.png';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('Header Component', () => {
  it('should render the header with app title and flags', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('appTitle')).toBeInTheDocument();

    const englishFlag = screen.getByAltText('flag.uk');
    const spanishFlag = screen.getByAltText('flag.spain');

    expect(englishFlag).toHaveAttribute('src', ukFlag);
    expect(spanishFlag).toHaveAttribute('src', spainFlag);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should show the loading spinner when loading state is true', () => {
    const { rerender } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    rerender(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
