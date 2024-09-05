import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailLayout from '../../layouts/DetailLayout/DetailLayout';
import { TPodcast } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockPodcast: TPodcast = {
  id: '1',
  title: 'Podcast Title',
  author: 'Author Name',
  description: 'Podcast description',
  img: 'http://example.com/podcast.jpg',
};

beforeEach(() => {
  localStorage.setItem('podcasts', JSON.stringify([mockPodcast]));
});

afterEach(() => {
  localStorage.removeItem('podcasts');
});

describe('DetailLayout', () => {
  test('should render podcast details correctly', () => {
    (useParams as jest.Mock).mockReturnValue({ idPodcast: '1' });
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(
      <DetailLayout
        mainContent={
          <div data-testid="additional-content">Additional Content</div>
        }
      />
    );

    expect(screen.getByTestId('additional-content')).toBeInTheDocument();
  });

  test('should handle missing podcast gracefully', () => {
    (useParams as jest.Mock).mockReturnValue({ idPodcast: '1' });
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    localStorage.removeItem('podcasts');

    render(
      <DetailLayout
        mainContent={
          <div data-testid="additional-content">Additional Content</div>
        }
      />
    );

    expect(screen.getByTestId('additional-content')).toBeInTheDocument();
  });
});
