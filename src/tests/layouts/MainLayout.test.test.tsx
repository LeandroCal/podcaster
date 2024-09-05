import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';

describe('MainLayout', () => {
  test('should render children correctly', () => {
    render(
      <MainLayout>
        <div data-testid="child-content">Test Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId('main-layout-content')).toContainElement(
      screen.getByTestId('child-content')
    );

    expect(screen.getByTestId('child-content')).toHaveTextContent(
      'Test Content'
    );
  });
});
