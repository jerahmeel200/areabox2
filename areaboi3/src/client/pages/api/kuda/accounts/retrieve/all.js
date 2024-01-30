import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import {
  ensureAccessToken,
  getAccessToken
} from '../../../../../components/wallet/kuda-auth';

const create = async (req, res) => {
  const { pageSize, pageNumber } = req.body;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
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
        ServiceType: 'ADMIN_VIRTUAL_ACCOUNTS',
        RequestRef: uuidV4(),
        Data: {
          pageSize,
          pageNumber
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

export default create;

ADMIN_VIRTUAL_ACCOUNTS;
