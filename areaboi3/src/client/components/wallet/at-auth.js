import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.apiUrl;

let accessToken = null;
let tokenObtainedTime = null;
let tokenExpiryDuration = null;

export const obtainAccessToken = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/africastalking/getToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data) {
      storeAccessToken(data.token);
      tokenExpiryDuration = data.lifetimeInSeconds;
    } else {
      console.error('error obtaining access token');
    }
  } catch (error) {
    console.error('An error occurred while obtaining access token:', error);
  }
};

export const storeAccessToken = (token) => {
  accessToken = token;
  tokenObtainedTime = Date.now();
  setTimeout(() => {
    accessToken = null;
    tokenObtainedTime = null;
  }, tokenExpiryDuration);
};

export const getAccessToken = async () => {
  if (isAccessTokenValid()) {
    return accessToken;
  } else {
    await obtainAccessToken();
    return accessToken;
  }
};

export const isAccessTokenValid = () => {
  return accessToken && Date.now() - tokenObtainedTime < tokenExpiryDuration;
};

export const ensureAccessToken = async () => {
  if (!isAccessTokenValid()) {
    await obtainAccessToken();
  }
};
