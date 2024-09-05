import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PodcastCard from '../../components/PodcastCard/PodcastCard';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('PodcastCard Component', () => {
  const mockPodcast = {
    id: '1',
    title: 'Test Podcast',
    author: 'Test Author',
    img: 'https://via.placeholder.com/150',
    description: 'Description',
  };

  it('should render the podcast card with the correct elements and styles', () => {
    render(
      <MemoryRouter>
        <PodcastCard podcast={mockPodcast} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', { name: /test podcast/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/podcast/1');

    const imgElement = screen.getByAltText('Test Podcast');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150'
    );

    const titleElement = screen.getByText('Test Podcast');
    expect(titleElement).toBeInTheDocument();

    const authorElement = screen.getByText('podcastAuthor: Test Author');
    expect(authorElement).toBeInTheDocument();

    const containerElement = screen.getByRole('link', {
      name: /test podcast/i,
    });
    expect(containerElement).toHaveClass('relative');
    expect(containerElement).toHaveClass('mt-24');
    expect(containerElement).toHaveClass('w-full');
    expect(containerElement).toHaveClass('mx-auto');
  });
});
