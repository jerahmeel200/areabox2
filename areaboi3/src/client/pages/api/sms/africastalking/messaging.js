import Axios from 'axios';
import enableCors from '../../cors';
import { getAccessToken } from '../../../../components/wallet/kuda-auth';

export default async (req, res) => {
  enableCors(req, res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  const { phoneNo, otp } = req.body;

  const data = {
    username: 'areaboxer',
    to: phoneNo,
    message: `Your AreaBox verification code is: ${otp}. Don't share this code with anyone; our employees will never ask for the code.`,
    from: 'AREABOX'
  };

  const formData = Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(key[data]))
    .join('&');

  try {
    let baseUrl;

    if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://api.africastalking.com';
    } else {
      baseUrl = 'https://api.sandbox.africastalking.com';
    }

    const message = await Axios(`${baseUrl}/version1/messaging`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        authToken: `${await getAccessToken()}`
      },
      formData
    }).then((res) => res.data);
    res.status(200).json(message);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
