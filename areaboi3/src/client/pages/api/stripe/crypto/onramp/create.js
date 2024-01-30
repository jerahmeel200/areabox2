import Stripe from 'stripe';
import enableCors from '../../../cors';

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

const OnrampSessionResource = Stripe.StripeResource.extend({
  create: Stripe.StripeResource.method({
    method: 'POST',
    path: 'crypto/onramp_sessions'
  })
});

export default async (req, res) => {
  enableCors(req, res);

  const { transaction_details } = req.body;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  try {
    const onrampSession = new OnrampSessionResource(stripe).create({
      wallet_addresses: transaction_details['wallet_addresses'],
      lock_wallet_address: transaction_details['lock_wallet_address'],
      source_currency: transaction_details['source_currency'],
      source_amount: transaction_details['source_amount'],
      destination_network: transaction_details['destination_network'],
      destination_currency: transaction_details['destination_currency'],
      destination_currencies: transaction_details['destination_currencies'],
      destination_networks: transaction_details['destination_networks'],
      customer_information: {
        first_name: transaction_details['customer_information']['first_name'],
        last_name: transaction_details['customer_information']['last_name'],
        email: transaction_details['customer_information']['email'],
        dob: {
          day: transaction_details['customer_information']['dob']['day'],
          month: transaction_details['customer_information']['dob']['month'],
          year: transaction_details['customer_information']['dob']['year']
        },
        address: {
          country:
            transaction_details['customer_information']['address']['country'],
          line1:
            transaction_details['customer_information']['address']['line1'],
          line2:
            transaction_details['customer_information']['address']['line2'],
          postal_code:
            transaction_details['customer_information']['address'][
              'postal_code'
            ],
          city: transaction_details['customer_information']['address']['city'],
          state: transaction_details['customer_information']['address']['state']
        }
      },
      customer_ip_address: req.socket.remoteAddress
    });
    res.status(200).json(onrampSession);
  } catch (error) {
    res.status(500).json({ error });
  }
};
