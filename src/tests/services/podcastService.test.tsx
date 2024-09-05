import { fetchPodcasts } from '../../services/podcastService';
import { apiRequest } from '../../services/api';
import type { TPodcast } from '../../types';

jest.mock('../../services/api');

describe('fetchPodcasts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should fetch new data and update cache if data is expired', async () => {
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

    const apiResponse = {
      contents: JSON.stringify({
        feed: {
          entry: [
            {
              id: { attributes: { 'im:id': '1' } },
              'im:image': [{}, {}, { label: 'img1.jpg' }],
              'im:artist': { label: 'Author 1' },
              'im:name': { label: 'Podcast 1' },
              summary: { label: 'Description 1' },
            },
            {
              id: { attributes: { 'im:id': '2' } },
              'im:image': [{}, {}, { label: 'img2.jpg' }],
              'im:artist': { label: 'Author 2' },
              'im:name': { label: 'Podcast 2' },
              summary: { label: 'Description 2' },
            },
          ],
        },
      }),
    };

    (apiRequest as jest.Mock).mockResolvedValue(apiResponse);

    localStorage.setItem(
      'podcasts_timestamp',
      (Date.now() - 100000).toString()
    );

    const result = await fetchPodcasts();

    expect(result).toEqual(mockPodcasts);
    expect(localStorage.getItem('podcasts')).toEqual(
      JSON.stringify(mockPodcasts)
    );
    expect(localStorage.getItem('podcasts_timestamp')).not.toBeNull();
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

  it('should handle errors and log them', async () => {
    console.error = jest.fn();

    (apiRequest as jest.Mock).mockRejectedValue(new Error('API Error'));

    await fetchPodcasts();

    expect(console.error).toHaveBeenCalledWith(
      'Error fetching podcasts:',
      new Error('API Error')
    );
  });
});
