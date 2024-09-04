import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PodcastDetail from './pages/PodcastDetail/PodcastDetail';
import EpisodeDetail from './pages/EpisodeDetail/EpisodeDetail';
import NotFound from './pages/NotFound/NotFound';
import MainLayout from './layouts/MainLayout/MainLayout';
import './styles/global.css';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:idPodcast" element={<PodcastDetail />} />
          <Route
            path="/podcast/:idPodcast/episode/:idEpisode"
            element={<EpisodeDetail />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
