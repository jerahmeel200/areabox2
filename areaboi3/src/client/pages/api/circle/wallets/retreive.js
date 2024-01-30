import axios from 'axios';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const wallets = await axios(
      `https://api.circle.com/v1/w3s/wallets/${req.query.walletId}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        }
      }
    ).then((response) => response.data);
    res.status(200).json(wallets);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};
