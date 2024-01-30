import Axios from 'axios';

export default async (req, res) => {
  const { source_amount } = req.query;
  let apiKey;

  if (process.env.NODE_ENV === 'production') {
    apiKey = process.env.STRIPE_PK;
  } else {
    apiKey = process.env.STRIPE_SK;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    console.log(req.query);
    const response = await Axios(
      'https://api.stripe.com/v1/crypto/onramp_quotes',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        params: {
          source_amount,
          destination_currencies: ['usdc'],
          destination_networks: ['polygon']
        }
      }
    ).then((res) => res.data);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
};
