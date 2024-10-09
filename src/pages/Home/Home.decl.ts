import type { TPodcast } from '../../types';

export interface HomeProps {
  fetchPodcasts: () => Promise<TPodcast[]>;
}
