import { fetchPodcasts } from '../../services/podcastService';
import type { TPodcast } from '../../types';

jest.mock('../../services/api');

describe('fetchPodcasts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should use cached data if it is not expired', async () => {
    const mockPodcasts: TPodcast[] = [
      {
        id: '1',
        img: 'img1.jpg',
        author: 'Author 1',
        title: 'Podcast 1',
        description: 'Description 1',
      },
      {
        id: '2',
        img: 'img2.jpg',
        author: 'Author 2',
        title: 'Podcast 2',
        description: 'Description 2',
      },
    ];

    localStorage.setItem('podcasts', JSON.stringify(mockPodcasts));
    localStorage.setItem('podcasts_timestamp', (Date.now() - 10000).toString());

    const result = await fetchPodcasts();

    expect(result).toEqual(mockPodcasts);
  });
});
