import {
  isDataExpired,
  formatReleaseDate,
  formatTrackTime,
  mapPodcastData,
  mapEpisodeData,
} from '../../utils/functions';
import type {
  IEpisodeResult,
  TPodcast,
  TEpisode,
  TPodcastApiResponse,
} from '../../types';

describe('Utility Functions', () => {
  describe('isDataExpired', () => {
    it('should return true if the timestamp is older than one day', () => {
      const oldTimestamp = Date.now() - 2 * 24 * 60 * 60 * 1000;
      expect(isDataExpired(oldTimestamp)).toBe(true);
    });

    it('should return false if the timestamp is within one day', () => {
      const recentTimestamp = Date.now() - 23 * 60 * 60 * 1000;
      expect(isDataExpired(recentTimestamp)).toBe(false);
    });
  });

  describe('formatReleaseDate', () => {
    it('should format the date string into a local date string', () => {
      const dateString = '2024-09-05T12:00:00Z';
      expect(formatReleaseDate(dateString)).toBe(
        new Date(dateString).toLocaleDateString()
      );
    });
  });

  describe('formatTrackTime', () => {
    it('should format track time correctly for less than an hour', () => {
      const trackTimeMillis = 123456;
      expect(formatTrackTime(trackTimeMillis)).toBe('2:03');
    });

    it('should format track time correctly for more than an hour', () => {
      const trackTimeMillis = 3661000;
      expect(formatTrackTime(trackTimeMillis)).toBe('1:01:01');
    });
  });

  describe('mapPodcastData', () => {
    it('should map podcast API response to podcast object', () => {
      const entry: TPodcastApiResponse['feed']['entry'][0] = {
        id: { attributes: { 'im:id': '1' } },
        'im:image': [
          { label: '' },
          { label: '' },
          { label: 'https://via.placeholder.com/150' },
        ],
        'im:artist': { label: 'Test Author' },
        'im:name': { label: 'Test Podcast' },
        summary: { label: 'Test Description' },
      };
      const expectedPodcast: TPodcast = {
        id: '1',
        img: 'https://via.placeholder.com/150',
        author: 'Test Author',
        title: 'Test Podcast',
        description: 'Test Description',
      };
      expect(mapPodcastData(entry)).toEqual(expectedPodcast);
    });
  });

  describe('mapEpisodeData', () => {
    it('should map episode result to episode object', () => {
      const episode: IEpisodeResult = {
        trackId: 1,
        trackName: 'Test Episode',
        releaseDate: '2024-09-05T12:00:00Z',
        description: 'Test Description',
        trackTimeMillis: 123456,
        episodeUrl: 'https://example.com/episode',
      };
      const expectedEpisode: TEpisode = {
        trackId: 1,
        trackName: 'Test Episode',
        releaseDate: '2024-09-05T12:00:00Z',
        description: 'Test Description',
        trackTimeMillis: 123456,
        episodeUrl: 'https://example.com/episode',
      };
      expect(mapEpisodeData(episode)).toEqual(expectedEpisode);
    });
  });
});
