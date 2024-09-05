import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from '../components/Alert/Alert';

afterEach(cleanup);

describe('Alert Component', () => {
  it('should display the message passed as a prop', () => {
    render(<Alert message="This is an alert message" />);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'This is an alert message'
    );
  });

  it('should disappear after the specified duration', () => {
    jest.useFakeTimers();
    render(<Alert message="This will disappear" duration={1000} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it('should use the correct class based on the type prop', () => {
    const { rerender } = render(
      <Alert message="Success message" type="success" />
    );
    expect(screen.getByRole('alert')).toHaveClass(
      'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800'
    );

    rerender(<Alert message="Error message" type="error" />);
    expect(screen.getByRole('alert')).toHaveClass(
      'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800'
    );

    rerender(<Alert message="Warning message" type="warning" />);
    expect(screen.getByRole('alert')).toHaveClass(
      'text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800'
    );

    rerender(<Alert message="Info message" type="info" />);
    expect(screen.getByRole('alert')).toHaveClass(
      'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800'
    );
  });
});
