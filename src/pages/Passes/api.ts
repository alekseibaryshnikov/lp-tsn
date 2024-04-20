import httpClient from '@/services/HttpClient';
import { Pass } from '@/pages/Passes/types';
import { sortByDate } from '@/core/date.utils';
import toasts from '@/store/Toasts';
import { Dispatch, SetStateAction } from 'react';
import { ApiResponse } from '@/core/types';

export const fetchAndSetPasses = (
  setPasses: Dispatch<SetStateAction<Pass[]>>,
) =>
  httpClient
    .post('', {
      action: 'getPassList',
    })
    .then(response => {
      const data = response.data as ApiResponse;

      if (data.error) {
        return data;
      }

      const passList = data.data as Pass[];

      setPasses(sortByDate(passList, 'date_end'));
    })
    .catch(error => {
      console.log(error);

      toasts.addToast({
        message: error.message,
        intent: 'danger',
      });
    });
