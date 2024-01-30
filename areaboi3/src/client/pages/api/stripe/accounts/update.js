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
    const customer = await stripe.accounts.update(req.query.id, {
      individual: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        dob: {
          day: req.body.dob.day,
          month: req.body.dob.month,
          year: req.body.dob.year
        },
        phone: req.body.phone
      }
    });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error });
  }
};
