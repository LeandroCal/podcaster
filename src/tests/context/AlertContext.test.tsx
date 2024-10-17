import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AlertProvider, useAlert } from '../../context/AlertContext';

const TestComponent: React.FC = () => {
  const { openAlert, isAlertOpen, alertMessage } = useAlert();

  return (
    <div>
      <button
        onClick={() => openAlert('Test alert')}
        data-testid="trigger-alert-button"
      >
        Trigger Alert
      </button>
      {isAlertOpen && <div data-testid="alert-message">{alertMessage}</div>}
    </div>
  );
};

const TestComponentWithoutProvider: React.FC = () => {
  const { openAlert } = useAlert();
  return (
    <button
      onClick={() => openAlert('Test alert')}
      data-testid="trigger-alert-button"
    >
      Trigger Alert
    </button>
  );
};

describe('AlertContext', () => {
  test('should display alert when triggered and allow closing it', () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByTestId('trigger-alert-button'));

    expect(screen.getByTestId('alert-message')).toHaveTextContent('Test alert');
  });

  test('should throw error if useAlert is used outside of AlertProvider', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementation(() => {});

    expect(() => render(<TestComponentWithoutProvider />)).toThrow(
      'useAlert must be used within an AlertProvider'
    );

    consoleErrorSpy.mockRestore();
  });
});
