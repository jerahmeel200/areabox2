import axios from 'axios';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);
  const { name, refId } = req.body;
  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const wallet = await axios(
      `https://api.circle.com/v1/w3s/wallets/${req.query.walletId}`,
      {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        },
        data: {
          name,
          refId
        }
      }
    ).then((response) => response.data);
    res.status(200).json(wallet);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};
