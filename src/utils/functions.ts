import type {
  IEpisodeResult,
  TEpisode,
  TPodcast,
  TPodcastApiResponse,
} from '../types';

export const isDataExpired = (timestamp: number) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Date.now() - timestamp > oneDay;
};

export const formatReleaseDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const formatTrackTime = (trackTimeMillis: number): string  => {
  const minutes = Math.floor(trackTimeMillis / 60000);
  const seconds = Math.floor((trackTimeMillis % 60000) / 1000)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const mapPodcastData = (
  entry: TPodcastApiResponse['feed']['entry'][0]
): TPodcast => ({
  id: entry.id.attributes['im:id'],
  img: entry['im:image'][2].label,
  author: entry['im:artist'].label,
  title: entry['im:name'].label,
  description: entry.summary.label,
});

export const mapEpisodeData = (episode: IEpisodeResult): TEpisode => ({
  trackId: episode.trackId,
  trackName: episode.trackName,
  releaseDate: episode.releaseDate,
  description: episode.description || '',
  trackTimeMillis: episode.trackTimeMillis || 0,
  episodeUrl: episode.episodeUrl || '',
});
