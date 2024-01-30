const forge = require('node-forge');

const encryptEntitySecret = () => {
  const publicKeyString =
    '-----BEGIN RSA PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAtA8KAd6x277ai13reDdA\nUMS2t1kdlPWIlGToid3ZRxIPRc+lFyf8oE7jztQmY3cwJ433bqADyVj0EQBfj4Co\n9eWYILNBqFQrfHh2aa996hFZuNBxM/bBu97HAwNosR3yfJsorGhp0D/mnGzVqF85\nGioO5+SG1aNHSqBDBtEQgGLCuSwksoFM4AgTx/LUMiQ9zI5ghBvQgRfKCBF9R3HO\n/Jj1rW01rYQetEHvctL8E27QAFK/3c0Njc+oTkkIb/XB8+R/Kf0NC1l8Rn9cFb+H\nguOptvURLuKtmm97BXgmzektf2u6xxfIfq0NfYCcgGxbnR53LCKzmhkD/xVUtCBn\nYXGQxcbzM63hgAQPfgIvB8M6cOxEnvm/UBh4y+fKfdoOLElO9we1nS32Jao6NHi8\n+LMSO23kiOk2emXXybwZvc3nqB6QrG93oKR5acwMT6czvk4+qW4pFZIxU4eb847h\nuiPchrmuYfQvgBeRb57jq2ZNC1N6LgABPMnKyLbkFupmqyaLNGdPum8rI1Xadz1g\n1vHLSTmBIiM7UCFiDMT3CxinzMzbHvts6pPnjxbFAirWyRRNRbTz7/EZP4fpyF4Z\nRs2CGwV5llT5bB6YrlYAD5bSGFPSr/irdxzl+dxi7mPVanlOgHy9B1gY6d3AL1mv\nUkSMT/6Ss3QBTriuO8O+ET8CAwEAAQ==\n-----END RSA PUBLIC KEY-----\n';

  const hexEncodedEntitySecret =
    '974ffeff4095718c80bab5c2245748456169693153df8ba4642dd48d349162f7';

  const entitySecret = forge.util.hexToBytes(hexEncodedEntitySecret);
  if (entitySecret.length !== 32) {
    throw new Error('Invalid entity secret');
  }

  const publicKey = forge.pki.publicKeyFromPem(publicKeyString);
  const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create()
    }
  });

  const base64EncryptedData = forge.util.encode64(encryptedData);
  return base64EncryptedData;
};

module.exports = {
  encryptEntitySecret
};
