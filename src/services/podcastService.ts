import type { TPodcast } from '../types';
import { isDataExpired, mapPodcastData } from '../utils/functions';
import { apiRequest } from './api';

export const fetchPodcasts = async () => {
  try {
    const storedData = localStorage.getItem('podcasts');
    const storedTimestamp = localStorage.getItem('podcasts_timestamp');

    if (storedData && storedTimestamp && !isDataExpired(Number(storedTimestamp))) {
      return JSON.parse(storedData);
    }

    const response = await apiRequest('/us/rss/toppodcasts/limit=100/genre=1310/json');
    const data = await JSON.parse(response.contents);
    const podcasts: TPodcast[] = data.feed.entry.map(mapPodcastData);

    localStorage.setItem('podcasts', JSON.stringify(podcasts));
    localStorage.setItem('podcasts_timestamp', Date.now().toString());

    return podcasts;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
  }
};