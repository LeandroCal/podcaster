import { fetchEpisodes } from '../../services/episodeService';

jest.mock('../../services/api', () => ({
  apiRequest: jest.fn(),
}));

describe('fetchEpisodes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should use cached data if it is not expired', async () => {
    const mockEpisodes = [
      {
        trackId: '1',
        trackName: 'Episode 1',
        releaseDate: '2024-01-01',
        description: 'Description 1',
        trackTimeMillis: 60000,
        episodeUrl: 'http://audio1.mp3',
      },
    ];

    localStorage.setItem('episodes_123', JSON.stringify(mockEpisodes));
    localStorage.setItem('episodes_123_timestamp', Date.now().toString());

    const result = await fetchEpisodes(123);

    expect(result).toEqual(expect.arrayContaining(mockEpisodes));
  });
});
