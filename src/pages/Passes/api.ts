import httpClient from '@/services/HttpClient';
import { Pass } from '@/pages/Passes/types';
import { sortByDate } from '@/core/date.utils';
import toasts from '@/store/Toasts';
import { Dispatch, SetStateAction } from 'react';

export const fetchAndSetPasses = (
  setPasses: Dispatch<SetStateAction<Pass[]>>,
) =>
  httpClient
    .post('', {
      action: 'getPassList',
    })
    .then(response => {
      const passList = response.data.data as Pass[];

      const expired = sortByDate(
        passList.filter(
          pass => pass.date_end && new Date(pass.date_end) < new Date(),
        ),
        'date_end',
        true,
      );

      const active = passList.filter(
        pass => !expired.some(item => item.id === pass.id),
      );

      const temporary = sortByDate(
        active.filter(pass => pass.date_end),
        'date_end',
        true,
      );

      const permanent = sortByDate(
        active.filter(pass => !pass.date_end),
        'date_start',
        true,
      );

      setPasses([...temporary, ...permanent, ...expired]);
    })
    .catch(error => {
      console.log(error);

      toasts.addToast({
        message: error.message,
        intent: 'danger',
      });
    });
