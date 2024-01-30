import axios from 'axios';

const list = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const payout = await axios(
      `https://api-sandbox.circle.com/v1/payouts/${req.query.payoutId}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.CIRCLE_API_KEY}`
        }
      }
    ).then((res) => res.data);
    res.status(200).json(payout);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export default list;
