import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PodcastDetail from '../../pages/PodcastDetail/PodcastDetail';
import { fetchEpisodes } from '../../services/episodeService';
import { useAlert } from '../../context/AlertContext';

// Mock de la función fetchEpisodes
jest.mock('../../services/episodeService', () => ({
  fetchEpisodes: jest.fn(),
}));

// Mock del contexto AlertContext
jest.mock('../../context/AlertContext', () => ({
  useAlert: jest.fn().mockReturnValue({
    isAlertOpen: false,
    alertMessage: '',
    openAlert: jest.fn(),
  }),
}));

// Mock de react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock de react-router-dom
jest.mock('react-router-dom', () => ({
  useParams: () => ({
    idPodcast: '1',
  }),
}));

describe('PodcastDetail', () => {
  const mockFetchEpisodes = fetchEpisodes as jest.MockedFunction<
    typeof fetchEpisodes
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render loading skeleton initially', () => {
    mockFetchEpisodes.mockResolvedValueOnce([]);
    render(<PodcastDetail fetchEpisodes={fetchEpisodes} />); // Pasar fetchEpisodes como prop
    expect(screen.getByTestId('episode-list-skeleton')).toBeInTheDocument();
  });

  test('should render episodes list correctly on successful fetch', async () => {
    const mockEpisodes = [
      {
        trackId: 1,
        trackName: 'Episode 1',
        description: 'Description 1',
        episodeUrl: 'http://example.com/1.mp3',
      },
      {
        trackId: 2,
        trackName: 'Episode 2',
        description: 'Description 2',
        episodeUrl: 'http://example.com/2.mp3',
      },
    ];

    mockFetchEpisodes.mockResolvedValueOnce(mockEpisodes);
    render(<PodcastDetail fetchEpisodes={fetchEpisodes} />); // Pasar fetchEpisodes como prop

    await waitFor(() => {
      expect(screen.getByText('episodesTitle: 2')).toBeInTheDocument();
      expect(screen.getByText('Episode 1')).toBeInTheDocument();
      expect(screen.getByText('Episode 2')).toBeInTheDocument();
    });
  });

  test('should handle fetch error and allow retry', async () => {
    mockFetchEpisodes.mockRejectedValueOnce(new Error('Fetch error'));
    const mockOpenAlert = jest.fn();
    (useAlert as jest.Mock).mockReturnValue({
      isAlertOpen: false,
      alertMessage: '',
      openAlert: mockOpenAlert,
    });

    render(<PodcastDetail fetchEpisodes={fetchEpisodes} />); // Pasar fetchEpisodes como prop

    await waitFor(() => {
      expect(screen.getByText('button.refresh')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('button.refresh'));

    await waitFor(() => {
      expect(mockFetchEpisodes).toHaveBeenCalledTimes(2);
    });
  });
});
