import { useEffect, useState } from 'react';

import { accountBalance } from '../settings/kuda';
import { getTokenBalance } from '../settings/circle';
import { getCeloInfo } from '../settings/celo';

import { phoneCodes as pc } from '../utils';
import { format } from '../settings/services';

export default function Balances({ user, wallet }) {
  const [cashBalance, setCashBalance] = useState('0.00');
  const [USDCBalance, setUSDCBalance] = useState('0.00');
  const [USDTBalance, setUSDTBalance] = useState('0.00');
  const [cUSDBalance, setcUSDBalance] = useState('0.00');
  const [USDCTokenName, setUSDCTokenName] = useState('');

  const [currencyCode, setCurrencyCode] = useState('');
  const [currencyName, setCurrencyName] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('');

  useEffect(() => {
    if (wallet) {
      // kuda balance
      if (wallet?.kuda) {
        accountBalance(wallet?.kuda?.trackingReference)
          .then((res) => {
            setCashBalance(res?.data?.availableBalance);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // USDC balance
      if (wallet?.circle?.wallets) {
        getTokenBalance(wallet?.circle?.wallets[0]?.id)
          .then((res) => {
            setUSDCBalance(
              res?.data?.tokenBalances.length
                ? Number(res?.data?.tokenBalances[0]?.amount).toFixed(2)
                : '0.00'
            );
            setUSDCTokenName(res?.data?.tokenBalances[0]?.token?.name);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      // cUSD balance
      if (wallet?.celo) {
        getCeloInfo(wallet?.celo?.celoKey)
          .then((res) => {
            setcUSDBalance(Number(format(res[0])).toFixed(2));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    pc.filter((p) => {
      if (p.countryCode === user?.phoneNo?.countryCode) {
        setCurrencyCode(p.currencyCode);
        setCurrencySymbol(p.currencySymbol);
        setCurrencyName(p.currencyName);
      }
    });
  }, [wallet]);

  return (
    <>
      <p className="balance" title={`${currencyName}`}>
        {currencyCode}: {`${currencySymbol} ${cashBalance}`}
      </p>
      <p className="balance" title={`${USDCTokenName}`}>
        USDC: {`$ ${USDCBalance}`}
      </p>
      <p className="balance" title={`${cUSDBalance}`}>
        cUSD: {`$ ${cUSDBalance}`}
      </p>
      <p className="balance" title={`${USDTBalance}`}>
        USDT: {`$ ${USDTBalance}`}
      </p>
      <style jsx>
        {`
          .balance {
            width: 90px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 8px;
            font-weight: 700;
            margin-left: 1rem;
          }
        `}
      </style>
    </>
  );
}
