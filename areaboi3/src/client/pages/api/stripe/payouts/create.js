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

  try {
    const transfer = stripe.payouts.create({
      amount: req.body.amount,
      currency: req.body.currency,
      destination: req.body.destination
    });
    res.status(200).json(transfer);
  } catch (error) {
    res.status(500).json({ error });
  }
};
