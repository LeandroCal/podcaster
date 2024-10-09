import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { IAlertContextType } from '../types';
import Alert from '../components/Alert/Alert';

const AlertContext = createContext<IAlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const openAlert = (message: string) => {
    setAlertMessage(message);
    setIsAlertOpen(true);
  };

  return (
    <AlertContext.Provider value={{ isAlertOpen, alertMessage, openAlert }}>
      {children}
      {isAlertOpen && (
        <Alert
          message={alertMessage}
          type="error"
          setIsAlertOpen={setIsAlertOpen}
        />
      )}
    </AlertContext.Provider>
  );
};
