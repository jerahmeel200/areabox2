import Axios from 'axios';
import enableCors from '../cors';
export default async (req, res) => {
  enableCors(req, res);

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const supportedCurrencies = await Axios(
      'https://api.sandbox.transferwise.tech/v1/currencies',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.WISE_BEARER}`,
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => res.data);
    res.status(200).json(supportedCurrencies);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
