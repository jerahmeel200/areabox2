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
  const {
    country,
    first_name,
    last_name,
    email,
    phone,
    dob,
    address,
    external_account
  } = req.body;

  if (req.method !== 'POST') {
    res.setHeader(Allow, 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const account = await stripe.accounts.create({
      type: 'custom',
      business_type: 'individual',
      country: country,
      capabilities: {
        transfers: { requested: true }
      },
      tos_acceptance: {
        service_agreement: 'recipient',
        date: Math.floor(Date.now() / 1000),
        ip: req.socket.remoteAddress
      },
      individual: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        dob: {
          day: dob['day'],
          month: dob['month'],
          year: dob['year']
        },
        address: {
          line1: address['line1'],
          line2: address['line2'],
          postal_code: address['postal_code'],
          city: address['city'],
          state: address['state']
        }
      },
      external_account: {
        object: external_account['object'],
        country: external_account['country'],
        currency: external_account['currency'],
        account_number: external_account['account_number'],
        routing_number: external_account['routing_number']
      }
    });
    res.status(200).json(account);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};
