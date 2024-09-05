import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EpisodeListSkeleton from '../../../components/Skeleton/EpisodeListSkeleton/EpisodeListSkeleton';

describe('EpisodeListSkeleton Component', () => {
  it('should render the skeleton loader with the correct number of elements', () => {
    render(<EpisodeListSkeleton />);

    const headerSkeleton = screen.getByTestId('episode-list-skeleton');
    expect(headerSkeleton).toBeInTheDocument();
    expect(headerSkeleton).toHaveClass('bg-gray-200');
    expect(headerSkeleton).toHaveClass('animate-pulse');
    expect(headerSkeleton).toHaveClass('h-16');
    expect(headerSkeleton).toHaveClass('mb-4');

    const skeletonList = screen.getByTestId('skeleton-list');
    expect(skeletonList).toBeInTheDocument();

    const skeletonRows = screen.getAllByTestId(/^skeleton-item-/);
  

    skeletonRows.forEach((item) => {
      expect(item).toHaveClass('bg-gray-200');
      expect(item).toHaveClass('animate-pulse');
      expect(item).toHaveClass('h-6');
      if (item.getAttribute('data-testid')?.endsWith('-1')) {
        expect(item).toHaveClass('w-2/5');
      } else {
        expect(item).toHaveClass('w-1/5');
      }
    });

    const rowElements = screen.getAllByTestId(/skeleton-item-\d/);
    rowElements.forEach((row) => {
      expect(row).toHaveClass('flex');
      expect(row).toHaveClass('flex-row');
      expect(row).toHaveClass('justify-between');
      expect(row).toHaveClass('items-center');
      expect(row).toHaveClass('border-b');
      expect(row).toHaveClass('py-2');
    });
  });
});
