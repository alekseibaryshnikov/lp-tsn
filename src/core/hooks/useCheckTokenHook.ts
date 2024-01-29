import { useEffect, useState } from 'react';
import httpClient from '@/services/HttpClient';

export const useCheckTokenHook = () => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    httpClient
      .post('', { action: 'getPassList' })
      .then(response => {
        if (!response.data.error) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isValid, isLoading };
};
