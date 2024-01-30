import Axios from 'axios';
import enableCors from '../../cors';
export default async (req, res) => {
  enableCors(req, res);
  const {
    sourceCurrency,
    targetCurrency,
    sourceAmount,
    targetAmount,
    payOut,
    preferredPayIn,
    targetAccount
  } = req.body;
  const { profileId } = req.query;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const profile = await Axios(
      `https://api.sandbox.transferwise.tech/v3/profiles/${profileId}/quotes`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WISE_BEARER}`,
          'Content-Type': 'application/json'
        },
        data: {
          sourceCurrency,
          targetCurrency,
          sourceAmount,
          targetAmount,
          payOut,
          preferredPayIn,
          targetAccount,
          paymentMetadata: {
            transferNature: 'MOVING_MONEY_BETWEEN_OWN_ACCOUNTS'
          }
        }
      }
    ).then((res) => res.data);
    res.status(200).json(profile);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
