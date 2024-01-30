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

  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT');
    res.status(405).end('Method not allowed');
    return;
  }
  try {
    const rejected = await stripe.accounts.reject(req.query.id, {
      reason: req.body.reason
    });
    res.status(200).json(rejected);
  } catch (error) {
    res.status(500).json({ error });
  }
};
