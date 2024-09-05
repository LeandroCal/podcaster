import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import AppRoutes from '../routes';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<Router>{ui}</Router>);
};

describe('AppRoutes Component', () => {
  test('renders Home page on "/" route', () => {
    renderWithRouter(<AppRoutes />);
    expect(screen.getByText(/Home Page Content/i)).toBeInTheDocument();
  });

  test('renders PodcastDetail page on "/podcast/:idPodcast" route', () => {
    window.history.pushState({}, 'Podcast Detail', '/podcast/1');
    renderWithRouter(<AppRoutes />);
    expect(
      screen.getByText(/Podcast Detail Page Content/i)
    ).toBeInTheDocument();
  });

  test('renders EpisodeDetail page on "/podcast/:idPodcast/episode/:idEpisode" route', () => {
    window.history.pushState({}, 'Episode Detail', '/podcast/1/episode/1');
    renderWithRouter(<AppRoutes />);
    expect(
      screen.getByText(/Episode Detail Page Content/i)
    ).toBeInTheDocument();
  });

  test('renders NotFound page on unknown routes', () => {
    window.history.pushState({}, 'Not Found', '/unknown-route');
    renderWithRouter(<AppRoutes />);
    expect(screen.getByText(/notFoundCode/i)).toBeInTheDocument();
    expect(screen.getByText(/notFoundText/i)).toBeInTheDocument();
  });
});
