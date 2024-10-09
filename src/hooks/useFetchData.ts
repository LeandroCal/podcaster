import { useState } from 'react';
import { useAlert } from '../context/AlertContext';

const useFetchData = <T>(fetchFunction: () => Promise<T>) => {
  const { openAlert } = useAlert();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred';
      openAlert(errorMessage);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetchData;
