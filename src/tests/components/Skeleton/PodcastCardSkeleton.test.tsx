import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PodcastCardSkeleton from '../../../components/Skeleton/PodcastCardSkeleton/PodcastCardSkeleton';

describe('PodcastCardSkeleton Component', () => {
  it('should render the podcast card skeleton with the correct elements and styles', () => {
    render(<PodcastCardSkeleton />);

    const container = screen.getByTestId('podcast-card-skeleton');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('relative');
    expect(container).toHaveClass('mt-24');
    expect(container).toHaveClass('p-4');
    expect(container).toHaveClass('border');
    expect(container).toHaveClass('border-gray-300');
    expect(container).toHaveClass('rounded');
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('shadow-md');
    expect(container).toHaveClass('animate-pulse');

    const imagePlaceholder = screen.getByTestId('image-placeholder-circle');
    expect(imagePlaceholder).toBeInTheDocument();
    expect(imagePlaceholder).toHaveClass('h-32');
    expect(imagePlaceholder).toHaveClass('w-32');
    expect(imagePlaceholder).toHaveClass('bg-gray-300');
    expect(imagePlaceholder).toHaveClass('rounded-full');

    const textContainer = screen.getByTestId('text-container');
    expect(textContainer).toBeInTheDocument();

    const titleSkeleton = screen.getByTestId('title-skeleton');
    expect(titleSkeleton).toBeInTheDocument();
    expect(titleSkeleton).toHaveClass('h-6');
    expect(titleSkeleton).toHaveClass('bg-gray-300');
    expect(titleSkeleton).toHaveClass('rounded');
    expect(titleSkeleton).toHaveClass('mb-1');

    const subtitleSkeleton = screen.getByTestId('subtitle-skeleton');
    expect(subtitleSkeleton).toBeInTheDocument();
    expect(subtitleSkeleton).toHaveClass('h-4');
    expect(subtitleSkeleton).toHaveClass('bg-gray-300');
    expect(subtitleSkeleton).toHaveClass('rounded');
  });
});
