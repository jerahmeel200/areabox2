import Axios from 'axios';
import enableCors from '../../cors';
export default async (req, res) => {
  enableCors(req, res);
  const { profileId, balanceId } = req.query;

  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    res.status(405).end('Method Not Allowed');
    return;
  }
  try {
    const profile = await Axios(
      `https://api.sandbox.transferwise.tech/v4/profiles/${profileId}/balances/${balanceId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.WISE_BEARER}`,
          'Content-Type': 'application/json'
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
