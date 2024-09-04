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
    const data: IEpisodeApiResponse = await JSON.parse(response.contents);
    const episodes: TEpisode[] = data.results.map(mapEpisodeData);

    localStorage.setItem(`episodes_${podcastId}`, JSON.stringify(episodes));
    localStorage.setItem(
      `episodes_${podcastId}_timestamp`,
      Date.now().toString()
    );

    return episodes;
  } catch (error) {
    console.error('Error fetching episodes:', error);
  }
};
