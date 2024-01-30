import { loadStripeOnramp } from '@stripe/crypto';

import {
  CryptoElements,
  OnrampElement
} from '../components/wallet/StripeCryptoElements';

import { useEffect, useState } from 'react';

let apiKey;

if (process.env.NODE_ENV === 'production') {
  apiKey = `${process.env.STRIPE_PK}`;
} else {
  apiKey = `${process.env.STRIPE_SK}`;
}

export const stripeAccount = async (
  country,
  currency,
  first_name,
  last_name,
  email,
  phone,
  dob,
  address
) => {
  const { line1, line2, city, state, postalCode } = address;
  try {
    const response = await fetch('api/stripe/accounts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        country,
        first_name,
        last_name,
        email,
        phone,
        dob: {
          day: dob.split('-')[2],
          month: dob.split('-')[1],
          year: dob.split('-')[0]
        },
        address: {
          line1,
          line2,
          city,
          state,
          postal_code: postalCode
        },
        external_account: {
          object: 'bank_account',
          country,
          currency,
          // TODO: pass kuda bank account number (must use a test bank account number in test mode)
          account_number: '1111111112',
          // TODO: update routing number (currently using default value as kuda bank doesn't provide a routing number)
          routing_number: 'AAAANGLAXXX'
        }
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('stripe error', { error });
  }
};

export const getCryptoQuotes = async (fiat_amount) => {
  try {
    const quotes = await fetch(
      `api/stripe/crypto/quotes?source_amount=${fiat_amount}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    const data = await quotes.json();
    return data;
  } catch (error) {
    console.log('quotes error', error);
  }
};

export const getFiatQuotes = async (crypto_amount) => {
  try {
    const quotes = await fetch(
      `api/stripe/crypto/quotes/fiat?destination_amount=${crypto_amount}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    const data = await quotes.json();
    return data;
  } catch (error) {
    console.log('quotes error', error);
  }
};

export const getOnrampSessions = async () => {
  try {
    const quotes = await fetch('api/stripe/crypto/onramp/retrieve', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    });
    const data = await quotes.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('quotes error', error);
  }
};

export const createPayout = async (amount, currency, destination) => {
  try {
    const payout = await fetch('api/stripe/payouts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        amount,
        currency,
        destination
      })
    });
    const data = await payout.json();
    return data;
  } catch (error) {
    console.log('payout error', error);
  }
};

export function StripeOnrampElement({ wallet, amount }) {
  const stripeOnrampPromise = loadStripeOnramp(`${process.env.STRIPE_PK}`);
  let [clientSecret, setClientSecret] = useState();
  const {
    circle: {
      wallets: [{ address }]
    },
    stripe: {
      individual: {
        first_name,
        last_name,
        email,
        dob: { day, month, year },
        address: { country, line1, line2, postal_code, city, state }
      }
    }
  } = wallet;
  useEffect(() => {
    fetch('api/stripe/crypto/onramp/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        transaction_details: {
          wallet_addresses: {
            polygon: address
          },
          lock_wallet_address: 'true',
          source_currency: 'usd',
          source_amount: amount,
          destination_network: 'polygon',
          // destination_currency: wallet.circle.wallets[0].blockchain.toLowerCase(),
          destination_currency: 'matic',
          destination_currencies: [
            // wallet.circle.wallets[0].blockchain.toLowerCase(),
            'matic',
            'usdc'
          ],
          destination_networks: ['polygon'],
          customer_information: {
            first_name,
            last_name,
            email,
            dob: {
              day,
              month,
              year
            },
            address: {
              country,
              line1,
              line2,
              postal_code,
              city,
              state
            }
          }
        }
      })
    })
      .then((res) => {
        getOnrampSessions().then((res) => {
          console.log(res);
          setClientSecret(res.data[0].client_secret);
        });
        res.json();
      })
      .catch((error) => {
        console.log('onramp error', error);
      });
  }, [wallet]);
  return (
    <>
      <CryptoElements stripeOnramp={stripeOnrampPromise}>
        {clientSecret && (
          <OnrampElement
            clientSecret={clientSecret}
            appearance={{ theme: 'dark' }}
          />
        )}
      </CryptoElements>
    </>
  );
}
