let accessToken = null;
let tokenObtainedTime = null;
const tokenExpiryDuration = 15 * 60 * 1000; // 15 minutes in milliseconds

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.apiUrl;
export async function obtainAccessToken() {
  try {
    const response = await fetch(`${apiUrl}/api/kuda/getToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data) {
      storeAccessToken(data);
    } else {
      console.log('Error obtaining access token');
    }
  } catch (error) {
    console.error('An error occurred while obtaining access token:', error);
  }
}

export function storeAccessToken(token) {
  accessToken = token;
  tokenObtainedTime = Date.now();
  setTimeout(() => {
    accessToken = null;
    tokenObtainedTime = null;
  }, tokenExpiryDuration);
}

export async function getAccessToken() {
  if (isAccessTokenValid()) {
    return accessToken;
  } else {
    await obtainAccessToken();
    return accessToken;
  }
}

export function isAccessTokenValid() {
  return accessToken && Date.now() - tokenObtainedTime < tokenExpiryDuration;
}

export async function ensureAccessToken() {
  if (!isAccessTokenValid()) {
    await obtainAccessToken();
  }
}
