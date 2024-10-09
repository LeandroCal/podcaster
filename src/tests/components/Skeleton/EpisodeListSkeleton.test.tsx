import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EpisodeListSkeleton from '../../../components/Skeleton/EpisodeListSkeleton/EpisodeListSkeleton';

describe('EpisodeListSkeleton', () => {
  test('should render skeleton elements', () => {
    render(<EpisodeListSkeleton />);

    expect(screen.getByTestId('episode-list-skeleton')).toBeInTheDocument();

    expect(screen.getByTestId('skeleton-list')).toBeInTheDocument();

    for (let index = 0; index < 5; index++) {
      expect(screen.getByTestId(`skeleton-item-${index}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`skeleton-item-${index}-1`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`skeleton-item-${index}-2`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`skeleton-item-${index}-3`)
      ).toBeInTheDocument();
    }
  });
});
