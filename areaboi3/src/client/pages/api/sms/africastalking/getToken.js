import Axios from 'axios';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const token = await Axios(
      'https://api.africastalking.com/auth-token/generate',
      {
        method: 'POST',
        headers: {
          apiKey: `${process.env.AFRICASTALKING_KEY}`,
          'Content-Type': 'application/json'
        },
        data: {
          username: 'areaboxer'
        }
      }
    ).then((res) => res.data);
    res.status(200).json(token);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
