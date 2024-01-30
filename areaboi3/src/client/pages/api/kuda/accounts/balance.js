import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import {
  ensureAccessToken,
  getAccessToken
} from '../../../../components/wallet/kuda-auth';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  const { trackingReference } = req.query;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed!');
    return;
  }
  await ensureAccessToken();
  try {
    const balance = await axios('https://kuda-openapi.kuda.com/v2.1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAccessToken()}`,
        accept: 'application/json'
      },
      data: {
        ServiceType: 'RETRIEVE_VIRTUAL_ACCOUNT_BALANCE',
        RequestRef: uuidV4(),
        Data: {
          trackingReference
        }
      }
    });

    res.status(balance.status).json(balance.data);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json({ error: errorMessage });
  }
};
