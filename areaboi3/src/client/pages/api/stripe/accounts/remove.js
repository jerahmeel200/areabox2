import Stripe from 'stripe';
import enableCors from '../../cors';

let stripe;

if (process.env.NODE_ENV === 'production') {
  stripe = new Stripe(process.env.STRIPE_PK, {
    apiVersion: '2022-11-15'
  });
} else {
  stripe = new Stripe(process.env.STRIPE_SK, {
    apiVersion: '2022-11-15'
  });
}

export default async (req, res) => {
  enableCors(req, res);
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const account = await stripe.accounts.del(req.body.id);
    console.log(account);
    return res.status(200).json(account);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
