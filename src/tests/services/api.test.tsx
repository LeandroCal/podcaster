import { apiRequest } from '../../services/api';

describe('apiRequest', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle fetch errors correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('Error message'),
      })
    ) as jest.Mock;

    try {
      await apiRequest('/us/rss/toppodcasts/limit=100/genre=1310/json');
    } catch (error) {
      expect(error).toEqual(new Error('Error message'));
    }
  });
});
