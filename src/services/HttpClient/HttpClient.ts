import axios from 'axios';
import LocalStorage from '@/services/LocalStorage';

const baseUrl = 'https://lp-tsn.ru/scripts/api.php';

const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(config => {
  const requestData = config.data as Record<string, string> | FormData;
  const token = LocalStorage.getAuthToken();
  const apiKey = import.meta.env.VITE_API_KEY;

  config.headers.set('Content-Type', 'application/x-www-form-urlencoded');

  if (requestData instanceof FormData) {
    requestData.append('apiKey', apiKey ?? '');
    requestData.append('token', token ?? '');
    const encoded = {} as Record<string, string>;

    requestData.forEach((value, key) => {
      encoded[key] = value as string;
    });

    config.data = new URLSearchParams(encoded).toString();
  } else {
    requestData.apiKey = apiKey ?? '';
    requestData.token = token ?? '';
    config.data = new URLSearchParams(requestData).toString();
  }

  return config;
});

export const addCredentials = (request: Record<string, string>) => {
  const token = LocalStorage.getAuthToken();
  const apiKey = import.meta.env.VITE_API_KEY;

  if (token) {
    request.token = token;
  }

  if (apiKey) {
    request.apiKey = apiKey;
  }

  return request;
};

export default httpClient;
