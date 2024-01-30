import Axios from 'axios';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }
  const { phoneNo, otp } = req.body;

  const data = {
    recipients: phoneNo,
    originator: '12072808077',
    body: `Your AreaBox verification code is: ${otp}. Don't share this code with anyone; our employees will never ask for the code.`
  };

  const formData = Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(key[data]))
    .join('&');

  try {
    const message = await Axios('https://rest.messagebird.com/messages', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `AccessKey ${process.env.MESSAGEBIRD_KEY}`
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
