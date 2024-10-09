import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import PodcastDetail from '../pages/PodcastDetail/PodcastDetail';
import EpisodeDetail from '../pages/EpisodeDetail/EpisodeDetail';
import NotFound from '../pages/NotFound/NotFound';
import type { AppRoutesProps } from './AppRoutes.decl';
import { fetchPodcasts } from '../services/podcastService';
import { fetchEpisodes } from '../services/episodeService';

const AppRoutes: React.FC<AppRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/" element={<Home fetchPodcasts={fetchPodcasts} />} />
      <Route
        path="/podcast/:idPodcast"
        element={<PodcastDetail fetchEpisodes={fetchEpisodes} />}
      />
      <Route
        path="/podcast/:idPodcast/episode/:idEpisode"
        element={<EpisodeDetail />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
