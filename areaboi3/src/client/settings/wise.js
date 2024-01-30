import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.apiUrl;

export const userAccount = async (email) => {
  try {
    const user = await fetch(`${apiUrl}/api/wise/user/signup`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.WISE_BEARER}`
      },
      body: JSON.stringify({
        email
      })
    });
    const data = await user.json();
    return data;
  } catch (error) {
    console.error("couldn't create user", error);
  }
};

export const wiseProfile = async (
  firstName,
  lastName,
  dateOfBirth,
  phoneNumber
) => {
  try {
    const profile = await fetch(`${apiUrl}/api/wise/profiles/create`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.WISE_BEARER}`
      },
      body: JSON.stringify({
        type: 'personal',
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber
      })
    });
    const data = await profile.json();
    return data;
  } catch (error) {
    console.error("couldn't create profile", error);
  }
};

export const multiCurrencyBalanceAccount = async (currency, type, name) => {
  try {
    const account = await fetch(`${apiUrl}/api/wise/balanceAccount/create`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.WISE_BEARER}`
      },
      body: JSON.stringify({
        currency,
        type,
        name
      })
    });
    const data = await account.json();
    return data;
  } catch (error) {
    console.error("couldn't create account", error);
  }
};

export const supportedCurrencies = async () => {
  try {
    const currenies = await fetch(`${apiUrl}/api/wise/currencies`, {
      headers: {
        Authorization: `Bearer ${process.env.WISE_BEARER}`,
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    });
    const data = await currenies.json();
    return data;
  } catch (error) {
    console.error("couldn't get currencies", error);
  }
};
