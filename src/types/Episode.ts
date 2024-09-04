export interface TEpisode {
  trackId: number;
  trackName: string;
  releaseDate: string;
  description: string;
  trackTimeMillis: number;
  episodeUrl: string;
}

export interface IEpisodeApiResponse {
  resultCount: number;
  results: IEpisodeResult[];
}

export interface IEpisodeResult {
  trackId: number;
  trackName: string;
  releaseDate: string;
  description: string;
  trackTimeMillis: number;
  episodeUrl: string;
}
