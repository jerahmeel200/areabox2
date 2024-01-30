import axios from 'axios';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  const { name } = req.body;
  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const walletSet = await axios(
      `https://api.circle.com/v1/w3s/developer/walletSets/${req.query.walletSetId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        },
        data: {
          name
        }
      }
    ).then((res) => res.data);
    res.status(200).json(walletSet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
