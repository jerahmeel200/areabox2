import axios from 'axios';

const list = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const payouts = await axios('https://api-sandbox.circle.com/v1/payouts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        authorization: `Bearer ${process.env.CIRCLE_API_KEY}`
      }
    }).then((res) => res.data);
    res.status(200).json(payouts);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export default list;
