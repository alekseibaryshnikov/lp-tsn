import { http, HttpResponse } from 'msw';
import { ApiResponse } from '@/core/types';
import { Pass } from '@/pages/Passes/types';

const passList = [
  {
    id: 10006,
    date_start: '2023-12-11 00:00:00',
    date_end: '2023-12-11 23:59:59',
    date_arrival: '2023-12-11 23:59:59',
    number_auto: 'C100OP799',
    pass_name: '',
    comment:
      'Лорем ипсум долор сит амет, цонсецтетур адиписцинг елит. Сед до еиусмод темпор инцидидунт ут лаборе ет долоре магна алияуам.',
    comment2: 'Лорем ипсум долор сит амет, цонсецтетур адиписцинг елит.',
  },
  {
    id: 10005,
    date_start: '2023-12-11 00:00:00',
    date_end: '2023-12-11 23:59:59',
    date_arrival: null,
    number_auto: 'c100op799',
    pass_name: '',
    comment: '',
    comment2: '',
  },
  {
    id: 10004,
    date_start: '2023-12-11 00:00:00',
    date_end: '2023-12-11 23:59:59',
    date_arrival: null,
    number_auto: 'c100op799',
    pass_name: '',
    comment: '',
    comment2: '',
  },
  {
    id: 10003,
    date_start: '2023-12-10 00:00:00',
    date_end: '2023-12-10 23:59:59',
    date_arrival: null,
    number_auto: '',
    pass_name: 'Тест',
    comment: '',
    comment2: '',
  },
  {
    id: 9722,
    date_start: '2023-11-22 00:00:00',
    date_end: null,
    date_arrival: null,
    number_auto: null,
    pass_name: 'Барышникова Ольга Сергеевна',
    comment:
      'Лорем ипсум долор сит амет, цонсецтетур адиписцинг елит. Сед до еиусмод темпор инцидидунт ут лаборе ет долоре магна алияуам.',
    comment2: 'Лорем ипсум долор сит амет, цонсецтетур адиписцинг елит.',
  },
  {
    id: 9721,
    date_start: '2023-11-22 00:00:00',
    date_end: null,
    date_arrival: null,
    number_auto: 'С 528 НК 77',
    pass_name: 'Степанова Людмила Николаевна',
    comment: null,
    comment2: null,
  },
  {
    id: 9720,
    date_start: '2023-11-22 00:00:00',
    date_end: null,
    date_arrival: null,
    number_auto: null,
    pass_name: 'Барышникова Светлана Александровна',
    comment: null,
    comment2: null,
  },
  {
    id: 9718,
    date_start: '2023-11-22 00:00:00',
    date_end: null,
    date_arrival: null,
    number_auto: null,
    pass_name: 'Марычев Андрей Вячеславович',
    comment: null,
    comment2: null,
  },
  {
    id: 9717,
    date_start: '2023-11-22 00:00:00',
    date_end: null,
    date_arrival: null,
    number_auto: 'С 528 НК 77',
    pass_name: 'Зудилин Владимир Валентинович',
    comment: null,
    comment2: null,
  },
  {
    id: 9716,
    date_start: '2023-11-22 00:00:00',
    date_end: null,
    date_arrival: null,
    number_auto: null,
    pass_name: 'Барышников Алексей Максимович',
    comment: null,
    comment2: null,
  },
] as Pass[];

export const handlers = [
  http.post('*', async ({ request }) => {
    const requestBody = new URLSearchParams(await request.text());

    if (!requestBody.get('apiKey')) {
      return new HttpResponse(
        JSON.stringify({
          error: 100,
          errorText: 'Ошибка доступа.',
        }),
        {
          status: 200,
        },
      );
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (requestBody.get('action') === 'firstStep-Phone') {
      const response = {
        error: '',
        errorText: '',
        data: '',
        token: '',
        info: '',
      } as unknown as ApiResponse;

      return new HttpResponse(JSON.stringify(response), {
        headers: corsHeaders,
      });
    }

    if (requestBody.get('action') === 'secondStep-Code') {
      const response = {
        error: '',
        errorText: '',
        data: '',
        token: 'token',
        info: '',
      } as unknown as ApiResponse;

      return new HttpResponse(JSON.stringify(response), {
        headers: corsHeaders,
      });
    }

    if (requestBody.get('action') === 'getPassList') {
      if (!requestBody.get('token')) {
        return new HttpResponse(
          JSON.stringify({
            error: 100,
            errorText: 'Ошибка доступа.',
          }),
          {
            status: 200,
          },
        );
      }

      const response = {
        error: '',
        errorText: '',
        data: passList,
        token: '',
        info: '',
      } as unknown as ApiResponse;

      return new HttpResponse(JSON.stringify(response), {
        headers: corsHeaders,
      });
    }

    if (requestBody.get('action') === 'createPass') {
      if (!requestBody.get('token')) {
        return new HttpResponse(
          JSON.stringify({
            error: 100,
            errorText: 'Ошибка доступа.',
          }),
          {
            status: 200,
          },
        );
      }

      const newPass = {
        id: Date.now(),
        date_start: new Date().toISOString(),
        date_end: new Date('2100-12-11 23:59:59').toISOString(),
        date_arrival: null,
        number_auto: requestBody.get('numberAuto') as string,
        pass_name: requestBody.get('fio') as string,
        comment: requestBody.get('addinfo') as string,
        comment2: requestBody.get('addinfo2') as string,
      } as unknown as Pass;

      passList.unshift(newPass);

      const response = {
        error: '',
        errorText: '',
        data: '',
        token: '',
        info: '',
      } as unknown as ApiResponse;

      return new Promise(resolve =>
        setTimeout(() => {
          resolve(
            new HttpResponse(JSON.stringify(response), {
              headers: corsHeaders,
            }),
          );
        }, 5000),
      );
    }

    return new HttpResponse(null, {
      status: 400,
      statusText: 'Bad Request',
      headers: corsHeaders,
    });
  }),
];
