import React, { useEffect, useState } from 'react';

const Alert: React.FC<{
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  setIsAlertOpen: (value: boolean) => void;
}> = ({ message, type = 'info', duration = 3000, setIsAlertOpen }) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAlertOpen && setIsAlertOpen(false);
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const getAlertClasses = () => {
    switch (type) {
      case 'success':
        return 'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800';
      case 'error':
        return 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800';
      case 'warning':
        return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800';
      case 'info':
        return 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800';
      default:
        return 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800';
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg ${getAlertClasses()}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
