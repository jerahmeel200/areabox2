import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import {
  ensureAccessToken,
  getAccessToken
} from '../../../../components/wallet/kuda-auth';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);
  const { trackingReference } = res.query;

  const { amount, narration, clientFeeCharge } = req.body;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed!');
    return;
  }
  const base_url = 'https://kuda-openapi.kuda.com/v2.1';
  await ensureAccessToken();
  try {
    const transfer = await axios(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAccessToken()}`,
        accept: 'application/json'
      },
      data: {
        ServiceType: 'WITHDRAW_VIRTUAL_ACCOUNT',
        RequestRef: uuidV4(),
        Data: {
          trackingReference,
          amount,
          narration,
          clientFeeCharge
        }
      }
    });
    res.status(transfer.status).json(transfer.data);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json({ error: errorMessage });
  }
};
