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
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const topup = stripe.topups.create({
      amount: req.body.amount,
      currency: req.body.currency,
      description: rectangle.body.description,
      statement_descriptor: req.body.statement_descriptor
    });
    res.status(200).json(topup);
  } catch (error) {
    res.status(500).json({ error });
  }
};
