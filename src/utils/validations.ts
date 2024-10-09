/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IEpisodeResult, TPodcastApiResponse } from '../types';

const isValidPodcast = (podcast: any): podcast is TPodcastApiResponse => {
  return (
    podcast &&
    typeof podcast.id?.attributes?.['im:id'] === 'string' &&
    Array.isArray(podcast['im:image']) &&
    podcast['im:image'][2]?.label &&
    typeof podcast['im:artist']?.label === 'string' &&
    typeof podcast['im:name']?.label === 'string' &&
    typeof podcast.summary?.label === 'string'
  );
};

export const validatePodcastsData = (
  data: any
): data is TPodcastApiResponse => {
  return (
    Array.isArray(data.feed.entry) && data.feed.entry.every(isValidPodcast)
  );
};

const isValidEpisode = (episode: any): episode is IEpisodeResult => {
  return (
    typeof episode.trackId === 'number' &&
    typeof episode.trackName === 'string' &&
    typeof episode.releaseDate === 'string' &&
    (typeof episode.description === 'string' ||
      episode.description === undefined) &&
    (typeof episode.trackTimeMillis === 'number' ||
      episode.trackTimeMillis === undefined) &&
    (typeof episode.episodeUrl === 'string' || episode.episodeUrl === undefined)
  );
};

export const validateEpisodesData = (data: any): data is IEpisodeResult => {
  return Array.isArray(data.results) && data.results.every(isValidEpisode);
};

export const validateInput = (input: string) => {
  const strippedInput = input.replace(/<\/?[^>]+(>|$)/g, '');

  if (strippedInput === '') {
    return '';
  }
  if (!/\S/.test(strippedInput)) {
    return 'filterErrorSpaces';
  }
  if (strippedInput.length > 50) {
    return 'filterErrorLimit';
  }

  return '';
};
