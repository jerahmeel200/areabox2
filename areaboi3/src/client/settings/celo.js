// "use server";
import { newKitFromWeb3 } from '@celo/contractkit';
import Web3 from 'web3';

const web = new Web3('https://alfajores-forno.celo-testnet.org');
const kit = newKitFromWeb3(web);
export async function celoSetup(key, set) {
  kit.connection?.addAccount(key);
  const myAccount = web.eth.accounts.privateKeyToAccount(key);
  set(myAccount.address);
}

export const getCeloInfo = async (key) => {
  kit.connection.addAccount(key);
  const myAccount = web.eth.accounts.privateKeyToAccount(key);
  //token contract wrapper
  let goldtoken = await kit.contracts.getGoldToken();
  let stabletoken = await kit.contracts.getStableToken();
  //my balances
  let celoBalanceWei = await goldtoken.balanceOf(myAccount.address);
  const celoBalance = celoBalanceWei / 1e18;
  let cUSDBalanceWei = await stabletoken.balanceOf(myAccount.address);
  const cUSDBalance = cUSDBalanceWei / 1e18;
  return [celoBalance, cUSDBalance];
};

export const sendCelo = async (from, to, amnt) => {
  kit.connection.addAccount(from);
  const sending = web.eth.accounts.privateKeyToAccount(from);
  const receiving = web.eth.accounts.privateKeyToAccount(to);
  //contract for cusd
  const cusd = await kit.contracts.getStableToken();
  //transferring
  const transfer = await cusd
    .transfer(receiving.address, amnt)
    .send({ from: sending.address, feeCurrency: cusd.address });

  await transfer.waitReceipt().catch((err) => console.log(err));
};

export default async function getInitialProps() {
  return {
    celoSetup: celoSetup,
    getCeloInfo: getCeloInfo,
    sendCelo: sendCelo
  };
}
