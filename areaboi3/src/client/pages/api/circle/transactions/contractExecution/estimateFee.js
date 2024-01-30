import axios from 'axios';
import enableCors from '../../../cors';

export default async (req, res) => {
  enableCors(req, res);

  const { contractAddress } = req.body;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const transfer = await axios(
      'https://api.circle.com/v1/w3s/transactions/contractExecution/estimateFee',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.CIRCLE_API_KEY_TEST
        },
        data: {
          abiFunctionSignature: 'burn(uint256)',
          abiParameters: [],
          contractAddress
        }
      }
    ).then((res) => res.data);
    res.status(200).json(transfer);
  } catch (error) {
    console.error({ error });
    res.status(500).json({ error: 'Something went wrong' });
  }
};
