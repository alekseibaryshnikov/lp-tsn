import axios from 'axios';

const baseUrl = 'https://lp-tsn.ru/scripts/api.php';

const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('token');
    const apiKey = import.meta.env.VITE_API_KEY;

    config.transformRequest = [
      (data) => {
        const transformedData = {...data}

        if (token) {
          transformedData.token = token;
        }

        if (apiKey) {
          transformedData.api_token = apiKey;
        }

        return JSON.stringify(transformedData);
      },
    ];

    return config;
  },
  (error) => Promise.reject(error),
);

export default httpClient;
