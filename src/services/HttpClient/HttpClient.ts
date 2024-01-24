import axios from 'axios';

const baseUrl = 'https://lp-tsn.ru/scripts/api.php';

const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addCredentials = (request: Record<string, string>) => {
  const token = window.localStorage.getItem('token');
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
