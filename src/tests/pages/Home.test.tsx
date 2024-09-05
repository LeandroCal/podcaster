import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/Home/Home';
import { fetchPodcasts } from '../../services/podcastService';

jest.mock('../../services/podcastService', () => ({
  fetchPodcasts: jest.fn(),
}));

jest.mock('../../components/PodcastCard/PodcastCard', () => () => (
  <div>PodcastCard</div>
));

jest.mock(
  '../../components/Skeleton/PodcastCardSkeleton/PodcastCardSkeleton',
  () => () => <div data-testid="podcast-card-skeleton">PodcastCardSkeleton</div>
);

jest.mock('../../context/AlertContext', () => ({
  useAlert: () => ({
    openAlert: jest.fn(),
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render podcasts when data is loaded', async () => {
    const mockPodcasts = [
      {
        id: '1',
        title: 'Podcast 1',
        author: 'Author 1',
        description: 'Description 1',
        img: 'http://example.com/podcast1.jpg',
      },
      {
        id: '2',
        title: 'Podcast 2',
        author: 'Author 2',
        description: 'Description 2',
        img: 'http://example.com/podcast2.jpg',
      },
    ];

    (fetchPodcasts as jest.Mock).mockResolvedValue(mockPodcasts);

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getAllByText('PodcastCard')).toHaveLength(
        mockPodcasts.length
      );
    });
  });

  test('should show retry button on error and retry fetching podcasts', async () => {
    (fetchPodcasts as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getByText('button.refresh')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('button.refresh'));

    expect(fetchPodcasts).toHaveBeenCalledTimes(2);
  });

  test('should filter podcasts correctly', async () => {
    const mockPodcasts = [
      {
        id: '1',
        title: 'Podcast 1',
        author: 'Author 1',
        description: 'Description 1',
        img: 'http://example.com/podcast1.jpg',
      },
      {
        id: '2',
        title: 'Podcast 2',
        author: 'Author 2',
        description: 'Description 2',
        img: 'http://example.com/podcast2.jpg',
      },
    ];

    (fetchPodcasts as jest.Mock).mockResolvedValue(mockPodcasts);

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getAllByText('PodcastCard')).toHaveLength(
        mockPodcasts.length
      );
    });

    fireEvent.change(screen.getByPlaceholderText('placeholderSearch'), {
      target: { value: 'Podcast 1' },
    });

    expect(screen.getByText('PodcastCard')).toBeInTheDocument();
    expect(screen.queryByText('Podcast 2')).not.toBeInTheDocument();
  });
});
