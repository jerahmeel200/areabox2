import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.apiUrl;

export const getTokenBalance = async (walletId) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/circle/wallets/tokenBalance?id=${walletId}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        }
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('circle error', { error });
  }
};

export const transferToken = async (
  destinationAddress,
  tokenId,
  walletId,
  amounts
) => {
  try {
    const response = await fetch(`${apiUrl}/api/circle/transactions/transfer`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
      },
      body: JSON.stringify({
        destinationAddress,
        tokenId,
        walletId,
        amounts
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("couldn't transfer token", error);
  }
};

export const checkTransferStatus = async (transactionId) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/circle/transactions/retreive?transactionId=${transactionId}`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        }
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('circle error', { error });
  }
};
