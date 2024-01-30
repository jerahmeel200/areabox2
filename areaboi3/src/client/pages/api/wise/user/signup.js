import Axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import enableCors from '../../cors';

export default async (req, res) => {
  const { email } = req.body;
  enableCors(req, res);
  try {
    const user = await Axios(
      'https://api.sandbox.transferwise.tech/v1/user/signup/registration_code',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WISE_BEARER}`,
          'Content-Type': 'application/json'
        },
        data: {
          email,
          registrationCode: `areabox-${uuidV4()}`
        }
      }
    ).then((res) => res.data);
    res.status(200).json(user);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json(errorMessage);
  }
};
