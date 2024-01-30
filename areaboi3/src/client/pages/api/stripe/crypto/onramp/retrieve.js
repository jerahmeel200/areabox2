import Axios from 'axios';
import enableCors from '../../../cors';

export default async (req, res) => {
  let apiKey;

  if (process.env.NODE_ENV === 'production') {
    apiKey = process.env.STRIPE_PK;
  } else {
    apiKey = process.env.STRIPE_SK;
  }
  enableCors(req, res);

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const response = await Axios(
      'https://api.stripe.com/v1/crypto/onramp_sessions',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    ).then((res) => res.data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};
