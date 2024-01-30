import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import { encryptEntitySecret } from '../../../../utils/circleCipherEncryption';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const entitySecretCiphertext = encryptEntitySecret();
    const accelerate = await axios(
      `https://api.circle.com/v1/w3s/developer/transactions/${req.query.transactionID}/accelerate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        },
        data: {
          entitySecretCiphertext,
          idempotencyKey: uuidV4()
        }
      }
    ).then((res) => res.data);
    res.status(200).json(accelerate);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};
