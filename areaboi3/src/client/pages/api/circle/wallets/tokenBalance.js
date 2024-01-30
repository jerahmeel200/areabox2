import axios from 'axios';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  const { id } = req.query;
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const tokenBalance = await axios(
      `https://api.circle.com/v1/w3s/wallets/${id}/balances`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        }
      }
    ).then((res) => res.data);
    res.status(200).json(tokenBalance);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};
