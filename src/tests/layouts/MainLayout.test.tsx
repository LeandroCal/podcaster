import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';

describe('MainLayout', () => {
  test('should render Header and main content', () => {
    render(
      <Router>
        <MainLayout>
          <div data-testid="child-content">Test Child Content</div>
        </MainLayout>
      </Router>
    );

    expect(screen.getByTestId('main-content')).toBeInTheDocument();

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toHaveTextContent(
      'Test Child Content'
    );
  });
});
