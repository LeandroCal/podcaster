import { fetchEpisodes } from '../../services/episodeService';
import { apiRequest } from '../../services/api';

jest.mock('../../services/api', () => ({
  apiRequest: jest.fn(),
}));

describe('fetchEpisodes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should fetch new data and update cache if data is expired', async () => {
    const mockEpisodes = [
      {
        trackId: '1',
        trackName: 'Episode 1',
        releaseDate: '2024-01-01',
        description: 'Description 1',
        trackTimeMillis: 60000,
        episodeUrl: 'http://audio1.mp3',
      },
      {
        trackId: '2',
        trackName: 'Episode 2',
        releaseDate: '2024-01-02',
        description: 'Description 2',
        trackTimeMillis: 120000,
        episodeUrl: 'http://audio2.mp3',
      },
    ];

    const apiResponse = {
      contents: JSON.stringify({
        results: mockEpisodes,
      }),
    };

    (apiRequest as jest.Mock).mockResolvedValue(apiResponse);

    const result = await fetchEpisodes(123);

    expect(result).toEqual(expect.arrayContaining(mockEpisodes));
    expect(localStorage.getItem('episodes_123')).toEqual(
      JSON.stringify(mockEpisodes)
    );
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
