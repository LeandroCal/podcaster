import {
  validatePodcastsData,
  validateEpisodesData,
  validateInput,
} from '../../utils/validations';

describe('Validation Functions', () => {
  describe('validatePodcastsData', () => {
    it('should return true for valid podcast data', () => {
      const validData: any = {
        feed: {
          entry: [
            {
              id: { attributes: { 'im:id': '12345' } },
              'im:image': [
                { label: 'image1' },
                { label: 'image2' },
                { label: 'image3' },
              ],
              'im:artist': { label: 'Artist Name' },
              'im:name': { label: 'Podcast Name' },
              summary: { label: 'Podcast Summary' },
            },
          ],
        },
      };

      expect(validatePodcastsData(validData)).toBe(true);
    });

    it('should return false for invalid podcast data', () => {
      const invalidData: any = {
        feed: {
          entry: [
            {
              id: { attributes: {} },
              'im:image': [{ label: 'image1' }],
              'im:artist': { label: 'Artist Name' },
              'im:name': { label: 'Podcast Name' },
              summary: { label: 'Podcast Summary' },
            },
          ],
        },
      };

      expect(validatePodcastsData(invalidData)).toBe(false);
    });

    it('should return false for non-array input', () => {
      const invalidData: any = {
        feed: {
          entry: {},
        },
      };

      expect(validatePodcastsData(invalidData)).toBe(false);
    });
  });

  describe('validateEpisodesData', () => {
    it('should return true for valid episode data', () => {
      const validData: any = {
        results: [
          {
            trackId: 1,
            trackName: 'Episode Name',
            releaseDate: '2024-10-09',
            description: 'Episode Description',
            trackTimeMillis: 123456,
            episodeUrl: 'http://example.com/episode.mp3',
          },
        ],
      };

      expect(validateEpisodesData(validData)).toBe(true);
    });

    it('should return false for invalid episode data', () => {
      const invalidData: any = {
        results: [
          {
            trackId: 'invalid',
            trackName: 'Episode Name',
            releaseDate: '2024-10-09',
          },
        ],
      };

      expect(validateEpisodesData(invalidData)).toBe(false);
    });

    it('should return false for non-array input', () => {
      const invalidData: any = {
        results: {},
      };

      expect(validateEpisodesData(invalidData)).toBe(false);
    });
  });

  describe('validateInput', () => {
    it('should return empty string for valid input', () => {
      expect(validateInput('Valid Input')).toBe('');
    });

    it('should return filterErrorSpaces for input with only spaces', () => {
      expect(validateInput('     ')).toBe('filterErrorSpaces');
    });

    it('should return filterErrorLimit for input exceeding 50 characters', () => {
      const longInput = 'a'.repeat(51);
      expect(validateInput(longInput)).toBe('filterErrorLimit');
    });

    it('should return empty string for input with HTML tags', () => {
      expect(validateInput('<p>Valid Input</p>')).toBe('');
    });
  });
});
