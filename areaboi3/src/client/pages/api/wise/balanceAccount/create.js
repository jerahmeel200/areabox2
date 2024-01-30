import Axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);
  try {
    const { currency, type, name } = req.body;
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
      return;
    }
    const account = await Axios(
      `https://api.sandbox.transferwise.tech/v4/profiles/${profileId}/balances`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WISE_BEARER}`,
          'Content-Type': 'application/json',
          'X-idempotence-uuid': uuidV4()
        },
        data: {
          currency,
          type,
          name
        }
      }
    ).then((res) => res.data);
    res.status(200).json(account);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
