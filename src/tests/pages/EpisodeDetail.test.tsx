import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EpisodeDetail from '../../pages/EpisodeDetail/EpisodeDetail';

jest.mock('../../layouts/DetailLayout/DetailLayout', () => ({
  DetailLayout: ({ mainContent }: { mainContent: React.ReactNode }) => (
    <div data-testid="detail-layout">{mainContent}</div>
  ),
}));

const mockEpisode = {
  trackId: 1,
  trackName: 'Episode 1',
  description: 'This is a description.',
  episodeUrl: 'http://example.com/episode.mp3',
};

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    idPodcast: '1',
    idEpisode: '1',
  }),
}));

describe('EpisodeDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string) => {
        if (key === 'episodes_1') {
          return JSON.stringify([mockEpisode]);
        }
        return null;
      });
  });

  test('should render episode details correctly', async () => {
    render(<EpisodeDetail />);

    await waitFor(() => {
      const mainContent = screen.getByTestId('detail-layout');
      expect(mainContent).toBeInTheDocument();
      expect(screen.getByText('Episode 1')).toBeInTheDocument();
      expect(screen.getByText('This is a description.')).toBeInTheDocument();
      expect(screen.getByRole('audio')).toBeInTheDocument();
    });
  });

  test('should handle missing episode gracefully', async () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string) => {
        if (key === 'episodes_1') {
          return JSON.stringify([]);
        }
        return null;
      });

    render(<EpisodeDetail />);

    await waitFor(() => {
      const mainContent = screen.getByTestId('detail-layout');
      expect(mainContent).toBeInTheDocument();
      expect(screen.queryByText('Episode 1')).not.toBeInTheDocument();
      expect(
        screen.queryByText('This is a description.')
      ).not.toBeInTheDocument();
      expect(screen.queryByRole('audio')).not.toBeInTheDocument();
    });
  });

  test('should render the back link correctly', async () => {
    render(<EpisodeDetail />);

    await waitFor(() => {
      const mainContent = screen.getByTestId('detail-layout');
      expect(mainContent).toBeInTheDocument();
      const backLink = screen.getByText('button.back');
      expect(backLink).toBeInTheDocument();
    });
  });
});
