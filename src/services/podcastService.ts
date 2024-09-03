import { apiRequest } from './api';

export const getPodcasts = async () => {
  try {
    const data = await apiRequest('/us/rss/toppodcasts/limit=100/genre=1310/json');
    return data;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw error;
  }
};