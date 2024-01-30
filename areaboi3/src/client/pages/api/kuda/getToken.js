import axios from 'axios';
import enableCors from '../cors';

export default async (req, res) => {
  enableCors(req, res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const response = await axios(
      'https://kuda-openapi.kuda.com/v2.1/Account/GetToken',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: 'orphee.122@gmail.com',
          apiKey: 'nfosRA8HLmywDhMcW0tN'
        }
      }
    ).then((res) => res.data);
    res.status(200).json(response);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
