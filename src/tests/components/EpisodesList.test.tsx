import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import EpisodesList from '../../components/EpisodesList/EpisodesList';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../../utils/functions', () => ({
  formatReleaseDate: jest.fn((date) => `Formatted ${date}`),
  formatTrackTime: jest.fn(
    (time) => `Formatted ${Math.floor(time / 60000)}:${(time % 60000) / 1000}`
  ),
}));

describe('EpisodesList Component', () => {
  const episodes = [
    {
      trackId: 1,
      trackName: 'Episode 1',
      releaseDate: '2024-01-01',
      description: 'description 1',
      trackTimeMillis: 60000,
      episodeUrl: 'http://audio1.mp3',
    },
    {
      trackId: 2,
      trackName: 'Episode 2',
      releaseDate: '2024-01-02',
      description: 'description 2',
      trackTimeMillis: 120000,
      episodeUrl: 'http://audio2.mp3',
    },
  ];

  it('should render the table headers correctly', () => {
    render(
      <MemoryRouter>
        <EpisodesList episodes={episodes} idPodcast="1" />
      </MemoryRouter>
    );

    expect(screen.getByText('episodeTable.title')).toBeInTheDocument();
    expect(screen.getByText('episodeTable.date')).toBeInTheDocument();
    expect(screen.getByText('episodeTable.duration')).toBeInTheDocument();
  });

  it('should render each episode correctly with formatted data', () => {
    render(
      <MemoryRouter>
        <EpisodesList episodes={episodes} idPodcast="1" />
      </MemoryRouter>
    );

    expect(screen.getByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Formatted 2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('Formatted 1:00')).toBeInTheDocument();

    expect(screen.getByText('Episode 2')).toBeInTheDocument();
    expect(screen.getByText('Formatted 2024-01-02')).toBeInTheDocument();
    expect(screen.getByText('Formatted 2:00')).toBeInTheDocument();
  });

  it('should have correct link paths', () => {
    render(
      <MemoryRouter>
        <EpisodesList episodes={episodes} idPodcast="1" />
      </MemoryRouter>
    );

    const episode1Link = screen.getByText('Episode 1').closest('a');
    expect(episode1Link).toHaveAttribute('href', '/podcast/1/episode/1');

    const episode2Link = screen.getByText('Episode 2').closest('a');
    expect(episode2Link).toHaveAttribute('href', '/podcast/1/episode/2');
  });

  it('should apply alternate background colors correctly', () => {
    render(
      <MemoryRouter>
        <EpisodesList episodes={episodes} idPodcast="1" />
      </MemoryRouter>
    );

  
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveClass('bg-gray-100');
    expect(rows[2]).toHaveClass('bg-white');
  });
});
