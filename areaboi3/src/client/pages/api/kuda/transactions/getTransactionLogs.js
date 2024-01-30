import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import {
  ensureAccessToken,
  getAccessToken
} from '../../../../components/wallet/kuda-auth';
import enableCors from '../../cors';

export default async (req, res) => {
  enableCors(req, res);

  const {
    transactionDate,
    hasTransactionDateRangeFilter,
    startDate,
    endDate,
    pageNumber,
    pageSize
  } = req.body;
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed!');
  }
  const base_url = 'https://kuda-openapi.kuda.com/v2.1';
  await ensureAccessToken();
  try {
    const transactionLogs = await axios(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAccessToken()}`,
        accept: 'application/json'
      },
      data: {
        ServiceType: 'RETRIEVE_TRANSACTION_LOGS',
        RequestRef: uuidV4(),
        Data: {
          requestReference: `areabox-tx-req-${uuidV4()}`,
          responseReference: `areabox-tx-res-${uuidV4()}`,
          transactionDate,
          hasTransactionDateRangeFilter,
          startDate,
          endDate,
          pageSize,
          pageNumber
        }
      }
    });
    res.status(transactionLogs.status).json(transactionLogs.data);
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || 'Internal Server Error';
    res.status(statusCode).json({ error: errorMessage });
  }
};
