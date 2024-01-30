import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

const create = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const { payout_details } = req.body;
    const payout = await axios('https://api-sandbox.circle.com/v1/payouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.CIRCLE_API_KEY
      },
      data: {
        source: {
          type: 'wallet',
          id: payout_details.walletId
        },
        destination: { type: 'address_book', id: uuidV4 },
        amount: {
          currency: payout_details.currency,
          amount: payout_details.amount
        },
        toAmount: { currency: payout_details.toCurrency },
        idempotencyKey: uuidV4()
      }
    }).then((res) => res.data);
    res.status(200).json(payout);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export default create;
