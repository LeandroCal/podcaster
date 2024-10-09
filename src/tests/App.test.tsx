import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock('../services/podcastService', () => ({
  fetchPodcasts: jest.fn(),
}));

jest.mock('../services/episodeService', () => ({
  fetchEpisodes: jest.fn(),
}));

jest.mock('../layouts/MainLayout/MainLayout', () => {
  return jest.fn(({ children }) => (
    <div data-testid="main-layout">{children}</div>
  ));
});

jest.mock('../routes/AppRoutes', () => {
  return jest.fn(() => <div data-testid="app-routes">App Routes</div>);
});

describe('App', () => {
  test('should render MainLayout, AlertProvider and AppRoutes', () => {
    render(<App />);

    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    expect(screen.getByTestId('app-routes')).toBeInTheDocument();
  });
});
