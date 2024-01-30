import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import { encryptEntitySecret } from '../../../../utils/circleCipherEncryption';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  const { walletSetId } = req.body;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const entitySecretCiphertext = encryptEntitySecret();
    const wallet = await axios(
      'https://api.circle.com/v1/w3s/developer/wallets',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        },
        data: {
          idempotencyKey: uuidV4(),
          blockchains: ['MATIC-MUMBAI'],
          count: 2,
          entitySecretCiphertext,
          walletSetId
        }
      }
    ).then((res) => res.data);
    res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
