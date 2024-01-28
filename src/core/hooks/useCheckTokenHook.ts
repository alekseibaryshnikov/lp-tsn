import { useEffect, useState } from 'react';
import httpClient from '@/services/HttpClient';

export const useCheckTokenHook = () => {
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    httpClient.post('', { action: 'getPassList' }).then(response => {
      if (!response.data.error) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    });
  }, []);

  return isValid;
};
