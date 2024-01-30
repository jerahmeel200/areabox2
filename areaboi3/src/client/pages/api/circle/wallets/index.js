import axios from 'axios';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }
  const options = {
    method: 'GET',
    url: 'https://api.circle.com/v1/w3s/wallets?pageSize=1',
    headers: {
      accept: 'application/json',
      authorization:
        'Bearer TEST_API_KEY:773a376964aecff7761f1a46c3fa4696:1c5411589da4d660101289903b11b9a8'
    }
  };
  try {
    const wallets = axios.request(options).then((response) => {
      console.log(response.data);
    });
    res.status(200).json(wallets);
  } catch (error) {
    console.error(error);
  }
};
