import type { IEpisodeApiResponse, TEpisode } from '../types';
import { isDataExpired, mapEpisodeData } from '../utils/functions';
import { apiRequest } from './api';

export const fetchEpisodes = async (podcastId: number) => {
  try {
    const storedData = localStorage.getItem(`episodes_${podcastId}`);
    const storedTimestamp = localStorage.getItem(
      `episodes_${podcastId}_timestamp`
    );

    if (
      storedData &&
      storedTimestamp &&
      !isDataExpired(Number(storedTimestamp))
    ) {
      return JSON.parse(storedData);
    }

    const response = await apiRequest(
      `/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
    );

    if (response.status.http_code !== 200) {
      const errorMessage = `Error ${response.status.http_code}: ${response.contents}`;
      throw new Error(errorMessage);
    }

    const data: IEpisodeApiResponse = await JSON.parse(response.contents);
    const episodes: TEpisode[] = data.results.map(mapEpisodeData);

    localStorage.setItem(`episodes_${podcastId}`, JSON.stringify(episodes));
    localStorage.setItem(
      `episodes_${podcastId}_timestamp`,
      Date.now().toString()
    );

    return episodes;
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
