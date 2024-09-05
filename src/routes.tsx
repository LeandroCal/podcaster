import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import PodcastDetail from './pages/PodcastDetail/PodcastDetail';
import EpisodeDetail from './pages/EpisodeDetail/EpisodeDetail';
import NotFound from './pages/NotFound/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/podcast/:idPodcast" element={<PodcastDetail />} />
      <Route
        path="/podcast/:idPodcast/episode/:idEpisode"
        element={<EpisodeDetail />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
