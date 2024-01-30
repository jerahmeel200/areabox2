import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import {
  ensureAccessToken,
  getAccessToken
} from '../../../../../components/wallet/kuda-auth';

const account = async (req, res) => {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT');
    res.status(405).end('Method Not Allowed!');
    return;
  }
  const base_url = 'https://kuda-openapi.kuda.com/v2.1';
  await ensureAccessToken();
  try {
    const account = await axios(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAccessToken()}`,
        accept: 'application/json'
      },
      data: {
        ServiceType: 'ADMIN_UPDATE_VIRTUAL_ACCOUNT',
        RequestRef: uuidV4(),
        Data: {
          email: req.body.email,
          trackingReference: `areabox-${uuidV4()}`
        }
      }
    });

    res.status(account.status).json(account.data);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json({ error: errorMessage });
  }
};

export default account;
