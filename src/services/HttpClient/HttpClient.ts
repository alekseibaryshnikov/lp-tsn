import axios from 'axios';

const baseUrl = 'https://lp-tsn.ru/scripts/api.php';

const httpClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
