import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import {
  ensureAccessToken,
  getAccessToken
} from '../../../../components/wallet/kuda-auth';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  const { email, phoneNumber, lastName, firstName } = req.body;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  const trackingReference = `areabox-${uuidV4()}`;
  await ensureAccessToken();
  try {
    await axios('https://kuda-openapi.kuda.com/v2.1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAccessToken()}`,
        accept: 'application/json'
      },
      data: {
        ServiceType: 'ADMIN_CREATE_VIRTUAL_ACCOUNT',
        RequestRef: uuidV4(),
        Data: {
          email,
          phoneNumber,
          lastName,
          firstName,
          trackingReference
        }
      }
    }).then((res) => res.data);
    const responseData = {
      trackingReference
    };
    res.status(201).json(responseData);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
