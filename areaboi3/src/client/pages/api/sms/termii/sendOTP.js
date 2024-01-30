import Axios from 'axios';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  const { phoneNo, phoneCode } = req.body;

  const from = phoneCode === '+254' ? 'secureOTP' : 'AreaBox';
  try {
    const token = await Axios('https://api.ng.termii.com/api/sms/otp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      data: {
        api_key: `${process.env.TERMII_API_KEY}`,
        message_type: 'NUMERIC',
        to: phoneNo,
        from,
        channel: 'generic',
        pin_attempts: 10,
        pin_time_to_live: 10,
        pin_length: 5,
        pin_placeholder: '< 1234 >',
        message_text: `Your AreaBox verification code is: < 1234 >. Don't share this code with anyone; our employees will never ask for the code.`,
        pin_type: 'NUMERIC'
      }
    }).then((res) => res.data);
    res.status(200).json(token);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
