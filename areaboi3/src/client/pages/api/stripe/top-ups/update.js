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
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const topup = stripe.topups.update(req.query.id, {
      metadata: { order_id: req.body.order_id }
    });
    res.status(200).json(topup);
  } catch (error) {
    res.status(500).json({ error });
  }
};
