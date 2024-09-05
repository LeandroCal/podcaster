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
      await apiRequest('/some-url');
    } catch (error) {
      expect(error).toEqual(new Error('Error message'));
    }
  });
});
