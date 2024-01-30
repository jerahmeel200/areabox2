import {
  ensureAccessToken,
  getAccessToken
} from '../components/wallet/kuda-auth';

export const createAccount = async (
  email,
  phoneNumber,
  firstName,
  lastName
) => {
  try {
    const response = await fetch('api/kuda/accounts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAccessToken()}`
      },
      body: JSON.stringify({
        email,
        phoneNumber,
        lastName,
        firstName
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating account', error);
  }
};

export const accountDetails = async (track) => {
  await ensureAccessToken();
  try {
    const response = await fetch(
      `api/kuda/accounts/retrieve?trackingReference=${track}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`
        }
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving account details:', error);
    throw error;
  }
};

export const accountBalance = async (track) => {
  await ensureAccessToken();
  try {
    const response = await fetch(
      `api/kuda/accounts/balance?trackingReference=${track}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`
        }
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving account balance:', error);
    throw error;
  }
};

export const getBankList = async () => {
  await ensureAccessToken();
  try {
    const response = await fetch('api/kuda/transactions/getBankList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAccessToken()}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving bank list', error);
    throw error;
  }
};

export const transactionRecipient = async (
  track,
  beneficiaryAccountNumber,
  beneficiaryBankCode,
  isRequestFromVirtualAccount
) => {
  await ensureAccessToken();
  try {
    const response = await fetch(
      `api/kuda/transactions/confirmTransferRecipient?senderTrackingReference=${track}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`
        },
        body: JSON.stringify({
          beneficiaryAccountNumber,
          beneficiaryBankCode,
          isRequestFromVirtualAccount
        })
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error confirming transactionrecipient', error);
    throw error;
  }
};

export const sendKudaFromMain = async (
  track,
  clientAccountNumber,
  beneficiarybankCode,
  beneficiaryAccount,
  beneficiaryName,
  amount,
  narration,
  nameEnquirySessionID,
  senderName,
  clientFeeCharge
) => {
  await ensureAccessToken();
  try {
    const response = await fetch(
      `api/kuda/transactions/kudaAccountFundTransfer?trackingRef=${track}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`
        },
        body: JSON.stringify({
          clientAccountNumber,
          beneficiarybankCode,
          beneficiaryAccount,
          beneficiaryName,
          amount,
          narration,
          nameEnquirySessionID,
          senderName,
          clientFeeCharge
        })
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error confirming transactionrecipient', error);
    throw error;
  }
};

export const sendKuda = async (
  track,
  beneficiaryAccount,
  amount,
  narration,
  beneficiaryBankCode,
  beneficiaryName,
  senderName,
  nameEnquiryId
) => {
  await ensureAccessToken();
  try {
    const response = await fetch(
      `api/kuda/transactions/virtualAccountFundTransfer/trackingRef=${track}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`
        },
        body: JSON.stringify({
          beneficiaryAccount,
          amount,
          narration,
          beneficiaryBankCode,
          beneficiaryName,
          senderName,
          nameEnquiryId
        })
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error processing transaction recipient', error);
    throw error;
  }
};

export const withdrawFromVirtualAccount = async (
  track,
  amount,
  naration,
  clientFeeCharge
) => {
  await ensureAccessToken();

  try {
    const response = await fetch(
      `api/kuda/transactions/withdrawFromVirtualAccount?trackingRef=${track}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAccessToken()}`
        },
        body: JSON.stringify({
          amount,
          naration,
          clientFeeCharge
        })
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error withdrawing funds', error);
    throw error;
  }
};
