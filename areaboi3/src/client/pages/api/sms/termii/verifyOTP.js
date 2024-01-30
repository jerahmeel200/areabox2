import Axios from 'axios';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  const { pin, pin_id } = req.body;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const tokenRespsonse = await Axios(
      'https://api.ng.termii.com/api/sms/otp/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          api_key: `${process.env.TERMII_API_KEY}`,
          pin,
          pin_id
        }
      }
    ).then((res) => res.data);
    res.status(200).json(tokenRespsonse);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
