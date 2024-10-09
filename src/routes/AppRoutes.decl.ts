import type { TEpisode, TPodcast } from '../types';

export interface AppRoutesProps {
  fetchPodcasts: () => Promise<TPodcast[]>;
  fetchEpisodes: (idPodcast: number) => Promise<TEpisode[]>;
}
