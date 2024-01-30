const Web3 = require('web3');
const contractKit = require('@celo/contractkit');

const getAccount = async () => {
  const web3 = new Web3(
    'https://celo-alfajores--rpc.datahub.figment.io/apikey/bc9c0941b604da618fb337595e9640ca/'
  );
  const client = contractKit.newKitFromWeb3(web3);

  let account = web3.eth.accounts.create();
  console.log('address :', account.address);
  console.log('private key:', account.privateKey);
};
getAccount();
