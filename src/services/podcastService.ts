import type { TPodcast } from '../types';
import { isDataExpired, mapPodcastData } from '../utils/functions';
import { validatePodcastsData } from '../utils/validations';
import { apiRequest } from './api';

export const fetchPodcasts = async () => {
  try {
    const storedData = localStorage.getItem('podcasts');
    const storedTimestamp = localStorage.getItem('podcasts_timestamp');

    if (
      storedData &&
      storedTimestamp &&
      !isDataExpired(Number(storedTimestamp))
    ) {
      return JSON.parse(storedData);
    }

    const response = await apiRequest(
      '/us/rss/toppodcasts/limit=100/genre=1310/json'
    );

    if (response.status.http_code !== 200) {
      const errorMessage = `Error ${response.status.http_code}: ${response.contents}`;
      throw new Error(errorMessage);
    }

    const data = await JSON.parse(response.contents);

    if (!validatePodcastsData(data)) {
      throw new Error('Invalid podcast data format received from the server');
    }

    const podcasts: TPodcast[] = data.feed.entry.map(mapPodcastData);

    localStorage.setItem('podcasts', JSON.stringify(podcasts));
    localStorage.setItem('podcasts_timestamp', Date.now().toString());

    return podcasts;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.warn('Fetch aborted by user');
    } else if (error instanceof TypeError) {
      throw new Error('Network error. Please check your connection.');
    } else if (error instanceof Error) {
      throw new Error(error.message || 'An unknown error occurred.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};
