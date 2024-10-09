import type { TEpisode } from '../../types';

export interface PodcastDetailProps {
  fetchEpisodes: (idPodcast: number) => Promise<TEpisode[]>;
}
