import { useEffect, useState } from 'react';
import { Top, Mid, Bottom } from './utils';
import {
  AddMoneyKudaBottom,
  CreateBankAccount,
  AddCryptoBottom,
  OnrampUSDC
} from './addMoney';
import {
  SendMoneyKuda,
  SendMoneyCelo,
  SendMoneyCircle,
  SendMoney
} from './sendMoney';
import { getCeloInfo, celoSetup } from '../../settings/celo';
import {
  getTransactionInfo,
  getAristoInfo,
  getKudaInfo,
  format
} from '../../settings/services';
import { getTokenBalance } from '../../settings/circle';
import Balances from '../Balances';
import { CashOutKuda, CashOutUSDC } from './cashout';
import SecondaryFooter from '../SecondaryFooter';

export default function Wallet({
  userMetadata,
  firebase,
  options,
  userWallet,
  resetSend,
  saleInfo
}) {
  const [viewUser, setViewUser] = useState();
  const [wallet, setWallet] = useState();

  const [cusdAddress, setcusdAddress] = useState('');
  const [usdcAddress, setusdcAddress] = useState('');
  const [kudaAccount, setKudaAccount] = useState('');
  const [stripeAccount, setStripeAccount] = useState(false);

  const [cusdBalance, setcusdBalance] = useState('0.00');
  const [kudaBalanceAccount, setKudaAccountBalance] = useState('0.00');
  const [usdcBalance, setusdcBalance] = useState('0.00');

  const [transactions, setTransactions] = useState([]);
  const [aristoInfo, setAristoInfo] = useState({
    aristoMetadata: { image: '#' }
  });

  const [clicked, setClicked] = useState(options?.clicked);
  const [option, setOption] = useState(options?.wallet);

  useEffect(() => {
    setViewUser(userMetadata?.profile);
    setWallet(userWallet);

    if (saleInfo) {
      setClicked('sendMoney');
      setOption({ gen: 'kuda', spec: 'kuda-sendMoney' });
    }
  }, []);

  useEffect(() => {
    if (viewUser) {
      getTransactionInfo(viewUser.userName, setTransactions);
      getAristoInfo(viewUser.userName, setAristoInfo);
    }
    if (wallet) {
      if (wallet?.kuda) {
        getKudaInfo(viewUser.userName, setKudaAccount, setKudaAccountBalance);
      }
      celoSetup(wallet?.celo?.celoKey, setcusdAddress);
      getCeloInfo(wallet?.celo?.celoKey)
        .then((res) => {
          setcusdBalance(Number(format(res[0])).toFixed(2));
        })
        .catch((err) => console.log(err));
    }
    if (wallet?.circle?.wallets) {
      setusdcAddress(wallet.circle.wallets[0].address);
      getTokenBalance(wallet.circle.wallets[0].id).then((res) => {
        if (res?.data?.tokenBalances?.length !== 0) {
          setusdcBalance(
            Number(res?.data?.tokenBalances[0]?.amount).toFixed(2)
          );
        }
      });
    }
    if (wallet?.stripe?.id) {
      setStripeAccount(true);
    }
  }, [viewUser]);

  const reset = () => {
    setClicked('');
    setOption({ gen: '', spec: '' });
    resetSend();
  };
  return (
    <>
      {viewUser && (
        <div
          className="wallet"
          style={{
            fontFamily: "'Roboto Mono'"
          }}>
          <div
            className="black-card"
            style={{
              background: 'black',
              color: 'white',
              width: '100%',
              paddingBottom: '10px'
            }}>
            <Top
              user={viewUser}
              acctNo={kudaAccount[0]?.accountNumber}
              clicked={clicked}
              option={option}
              cusdAddress={cusdAddress}
              usdcAddress={usdcAddress}
              kudaAccount={kudaAccount}
            />
            {!option?.gen && (
              <div
                style={{
                  display: 'flex',
                  border: clicked
                    ? 'none'
                    : 'dotted rgba(256, 256, 256, 0.4) 1px',
                  justifyContent: 'space-between',
                  padding: '5px 1.5rem'
                }}>
                <div
                  className="middle"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '110px',
                    marginTop: '1rem'
                  }}>
                  <Balances user={viewUser} wallet={userWallet} />
                </div>
                {!clicked && (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      {viewUser?.phoneNo?.countryCode === '+234' ? (
                        <img
                          className="platform-img"
                          src="static/img/transaction_icons/kuda-logo.svg"
                          style={{ height: '35px', width: '40px' }}
                          alt="Kuda-logo"
                        />
                      ) : (
                        <img
                          className="platform-img"
                          src="static/img/transaction_icons/Areanna_Sphinx.png"
                          style={{ height: '35px', width: '40px' }}
                          alt="Areabank-logo"
                        />
                      )}
                      <img
                        src="static/img/transaction_icons/USDCoin-ondark1.svg"
                        style={{ height: '35px', width: '40px' }}
                        alt="USDC-logo"
                      />
                      <img
                        src="static/img/transaction_icons/Celo_Wordmark_Yellow4.svg"
                        style={{ height: '35px', width: '40px' }}
                        alt="Celo-logo"
                      />
                      <img
                        src="static/img/transaction_icons/USDTether.svg"
                        style={{ height: '35px', width: '40px' }}
                        alt="USDT-logo"
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}></div>
                  </>
                )}
                <div
                  className="middle"
                  style={{
                    fontSize: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    height: '100px'
                  }}>
                  <span>REP REWARD: 1 AR$T</span>
                  <span>1.00 AR$T = N100</span>
                </div>
              </div>
            )}
            {option?.spec === 'kuda-addMoney' && !kudaAccount && (
              <Mid
                txsymbol={'add-money-icon.svg'}
                msg={'ADD MONEY'}
                type={'kuda'}
                symbol={'kuda-logo.svg'}
              />
            )}
            {option?.spec === 'kuda-addMoney' && kudaAccount && (
              <Mid
                txsymbol={'add-money-icon.svg'}
                msg={'ADD NAIRA'}
                type={'kuda'}
                symbol={'kuda-logo.svg'}
              />
            )}
            {option?.spec === 'cusd-addMoney' && (
              <Mid
                txsymbol={'add-money-icon.svg'}
                msg={'ADD cUSD'}
                type={'cusd'}
                symbol={'Celo_Wordmark_Yellow8.svg'}
                setOption={setOption}
                cusd={{ gen: 'cusd', spec: 'cusd-addcUSD' }}
              />
            )}

            {option?.spec === 'stripe-addUSDC' && (
              <>
                <Mid
                  txsymbol={'send-money-icon.svg'}
                  msg={'BUY USDC'}
                  // setOption={setOption}
                  type={'stripe'}
                  symbol={'usdc-100.png'}
                  usdc={{ gen: 'stripe', spec: 'stripe-addUSDC' }}
                />
                <OnrampUSDC
                  wallet={wallet}
                  kudaBalance={kudaBalanceAccount}
                  viewUser={viewUser}
                />
              </>
            )}
            {option?.spec === 'kuda-sendMoney' && (
              <Mid
                txsymbol={'send-money-icon.svg'}
                msg={'SEND NAIRA'}
                type={'kuda'}
                symbol={'kuda-logo.svg'}
              />
            )}

            {option?.spec === 'usdc-sendMoney' && (
              <Mid
                txsymbol={'add-money-icon.svg'}
                msg={'SEND USDC'}
                type={'usdc'}
                symbol={'usdc-100.png'}
              />
            )}
            {option?.spec === 'cusd-sendMoney' && (
              <Mid
                txsymbol={'send-money-icon.svg'}
                msg={'SEND cUSD'}
                type={'cusd'}
                symbol={'Celo_Wordmark_Yellow8.svg'}
              />
            )}
            {option?.spec === 'usd-sendMoney' && (
              <Mid
                txsymbol={'send-money-icon.svg'}
                msg={'SEND USD'}
                type={'cusd'}
                symbol={'Celo_Wordmark_Yellow8.svg'}
              />
            )}
            {option?.spec === 'kuda-cashOut' && (
              <Mid
                txsymbol={'cashout-icon.svg'}
                msg={'CASH OUT NAIRA'}
                type={'kuda'}
                symbol={'kuda-logo.svg'}
              />
            )}
            {option?.spec === 'usdc-cashOut' && (
              <Mid
                txsymbol={'cashout-icon.svg'}
                msg={'CASH OUT USDC'}
                type={'stripe'}
                symbol={'stripe_logo.svg'}
              />
            )}
            {option?.spec === 'cusd-cashOut' && (
              <Mid
                txsymbol={'cashout-icon.svg'}
                msg={'CASH OUT cUSD'}
                type={'stripe'}
                symbol={'stripe_logo.svg'}
              />
            )}
            {!clicked && (
              <div
                style={{
                  display: 'grid',
                  minHeight: '205px',
                  gridTemplate: '1fr 1fr/ 1fr 1fr',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  padding: '0 2rem'
                }}>
                <span
                  className="grid-item"
                  onClick={() => HandleClick(setClicked, 'addMoney')}
                  style={{
                    justifySelf: 'start',
                    padding: '1.5rem 4rem 3rem 0',
                    cursor: 'pointer'
                  }}>
                  <img
                    src="static/img/wallet-trx/add-money-icon.svg"
                    style={{ height: '24px', width: '17px' }}
                  />{' '}
                  ADD MONEY
                </span>
                <span
                  className="grid-item"
                  onClick={() => HandleClick(setClicked, 'cashOut')}
                  style={{
                    justifySelf: 'end',
                    padding: '1.5rem 0 3rem 4rem'
                  }}>
                  <img
                    src="static/img/wallet-trx/cashout-icon.svg"
                    style={{ height: '24px', width: '24px' }}
                  />{' '}
                  CASH OUT
                </span>
                <span
                  className="grid-item"
                  onClick={() => HandleClick(setClicked, 'sendMoney')}
                  style={{
                    justifySelf: 'start',
                    padding: '1.5rem 4rem 3rem 0',
                    cursor: 'pointer'
                  }}>
                  <img
                    src="static/img/wallet-trx/send-money-icon.svg"
                    style={{ height: '24px', width: '29px' }}
                  />{' '}
                  SEND MONEY
                </span>
                <span
                  className="grid-item"
                  onClick={() => HandleClick(setClicked, 'requestMoney')}
                  style={{
                    justifySelf: 'end',
                    padding: '1.5rem 0 3rem 4rem'
                  }}>
                  <img
                    src="static/img/wallet-trx/request-icon.svg"
                    style={{ height: '24px', width: '27px' }}
                  />{' '}
                  REQUEST
                </span>
              </div>
            )}
            {clicked === 'addMoney' && (
              <>
                {!option?.gen && (
                  <>
                    <Bottom
                      setOption={setOption}
                      kuda={{ gen: 'kuda', spec: 'kuda-addMoney' }}
                      usdc={{ gen: 'usdc', spec: 'usdc-addMoney' }}
                      cusd={{ gen: 'cusd', spec: 'cusd-addMoney' }}
                      txsymbol={'add-money-icon.svg'}
                      walletReady={stripeAccount && kudaAccount}
                      info={'ADD MONEY'}
                      viewUser={viewUser}
                    />
                    <span
                      className="flex-cont"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '10px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: '2rem'
                      }}
                      onClick={() => HandleClick(setClicked, 'sendMoney')}>
                      <img
                        src={`static/img/wallet-trx/send-money-icon.svg`}
                        style={{
                          height: '24px',
                          width: '25px',
                          marginRight: '9px'
                        }}
                      />{' '}
                      {'SEND MONEY'}
                    </span>
                  </>
                )}
                {option?.spec === 'kuda-addMoney' && kudaAccount && (
                  <AddMoneyKudaBottom kudaInfo={kudaAccount} />
                )}
                {option?.spec === 'kuda-addMoney' && !kudaAccount && (
                  <CreateBankAccount
                    firebase={firebase}
                    userName={viewUser.userName}
                    user={viewUser}
                    reset={reset}
                    profilePhone={viewUser.phoneNo}
                  />
                )}
                {option?.spec === 'usdc-addMoney' && usdcAddress && (
                  <>
                    <Mid
                      txsymbol={'add-money-icon.svg'}
                      msg={'ADD USDC'}
                      type={'usdc'}
                      symbol={'Polygon.svg'}
                      setOption={setOption}
                      usdc={{ gen: 'circle', spec: 'polygon-addUSDC' }}
                    />
                    <Mid
                      txsymbol={'send-money-icon.svg'}
                      msg={'BUY USDC'}
                      setOption={setOption}
                      type={'stripe'}
                      symbol={'stripe_logo.svg'}
                      usdc={{ gen: 'stripe', spec: 'stripe-addUSDC' }}
                    />
                  </>
                )}
                {option?.spec === 'cusd-addMoney' && cusdAddress && (
                  <Mid
                    txsymbol={'add-money-icon.svg'}
                    msg={'BUY cUSD'}
                    type={'stripe'}
                    symbol={'stripe_logo.svg'}
                  />
                )}
                {option?.spec === 'cusd-addcUSD' && cusdAddress && (
                  <>
                    <Mid
                      txsymbol={'add-money-icon.svg'}
                      msg={'ADD cUSD'}
                      type={'cusd'}
                      symbol={'Celo_Wordmark_Yellow8.svg'}
                    />
                    <AddCryptoBottom crypto={cusdAddress} />
                  </>
                )}
                {option?.spec === 'polygon-addUSDC' && usdcAddress && (
                  <>
                    <Mid
                      txsymbol={'add-money-icon.svg'}
                      msg={'ADD USDC'}
                      type={'usdc'}
                      symbol={'Polygon.svg'}
                    />
                    <AddCryptoBottom crypto={usdcAddress} />
                  </>
                )}
              </>
            )}
            {clicked === 'sendMoney' && (
              <>
                {!option?.gen && (
                  <>
                    <Bottom
                      setOption={setOption}
                      kuda={{ gen: 'kuda', spec: 'kuda-sendMoney' }}
                      cusd={{ gen: 'cusd', spec: 'cusd-sendMoney' }}
                      usdc={{ gen: 'usdc', spec: 'usdc-sendMoney' }}
                      txsymbol={'send-money-icon.svg'}
                      info={'SEND MONEY'}
                      viewUser={viewUser}
                    />
                    <span
                      className="flex-cont"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '10px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: '2rem'
                      }}
                      onClick={() => HandleClick(setClicked, 'addMoney')}>
                      <img
                        src={`static/img/wallet-trx/add-money-icon.svg`}
                        style={{
                          height: '24px',
                          width: '25px',
                          marginRight: '9px'
                        }}
                      />{' '}
                      {'ADD MONEY'}
                    </span>
                  </>
                )}
                {option?.spec === 'kuda-sendMoney' && (
                  <SendMoneyKuda
                    type={option?.gen}
                    reset={reset}
                    selected={options?.chosen}
                    saleInfo={saleInfo}
                    kuda={kudaAccount}
                    wallet={wallet}
                    userDet={viewUser}
                  />
                )}
                {option?.spec === 'cusd-sendMoney' && (
                  <SendMoneyCelo
                    type={option?.gen}
                    reset={reset}
                    wallet={wallet}
                    userDet={viewUser}
                    balance={cusdBalance}
                    selected={options?.chosen}
                  />
                )}
                {option?.spec === 'usdc-sendMoney' && (
                  <SendMoneyCircle
                    type={option?.gen}
                    reset={reset}
                    wallet={wallet}
                    userDet={viewUser}
                    balance={usdcBalance}
                    selected={options?.chosen}
                  />
                )}
                {option?.spec === 'usd-sendMoney' && (
                  <SendMoney
                    type={option?.gen}
                    reset={reset}
                    wallet={wallet}
                    userDet={viewUser}
                    balance={usdcBalance}
                    selected={options?.chosen}
                  />
                )}
              </>
            )}
            {clicked === 'cashOut' && (
              <>
                {!option?.gen && (
                  <>
                    <Bottom
                      setOption={setOption}
                      kuda={{ gen: 'kuda', spec: 'kuda-cashOut' }}
                      cusd={{ gen: 'cusd', spec: 'cusd-cashOut' }}
                      usdc={{ gen: 'usdc', spec: 'usdc-cashOut' }}
                      txsymbol={'cashout-icon.svg'}
                      info={'CASH OUT'}
                      viewUser={viewUser}
                    />
                    <span
                      className="flex-cont"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '10px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: '2rem'
                      }}
                      onClick={() => HandleClick(setClicked, 'requestMoney')}>
                      <img
                        src={`static/img/wallet-trx/request-icon.svg`}
                        style={{
                          height: '24px',
                          width: '25px',
                          marginRight: '9px'
                        }}
                      />{' '}
                      {'REQUEST'}
                    </span>
                  </>
                )}
                {option?.spec === 'kuda-cashOut' && (
                  <CashOutKuda
                    type={option?.gen}
                    reset={reset}
                    selected={options?.chosen}
                    saleInfo={saleInfo}
                    kuda={kudaAccount}
                    wallet={wallet}
                    userDet={viewUser}
                  />
                )}
                {/* {option?.spec === 'cusd-cashOut' && (
                  <CashOutCUSD
                    type={option?.gen}
                    reset={reset}
                    wallet={wallet}
                    userDet={viewUser}
                    balance={cusdBalance}
                    selected={options?.chosen}
                  />
                )} */}
                {option?.spec === 'usdc-cashOut' && (
                  <CashOutUSDC
                    type={option?.gen}
                    reset={reset}
                    wallet={wallet}
                    userDet={viewUser}
                    balance={usdcBalance}
                    selected={options?.chosen}
                  />
                )}
              </>
            )}
            {clicked === 'requestMoney' && (
              <>
                {!option?.gen && (
                  <>
                    <Bottom
                      setOption={setOption}
                      kuda={{ gen: 'kuda', spec: 'kuda-requestMoney' }}
                      txsymbol={'request-icon.svg'}
                      info={'REQUEST'}
                      viewUser={viewUser}
                    />
                    <span
                      className="flex-cont"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '10px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: '2rem'
                      }}
                      onClick={() => HandleClick(setClicked, 'cashOut')}>
                      <img
                        src={`static/img/wallet-trx/cashout-icon.svg`}
                        style={{
                          height: '24px',
                          width: '25px',
                          marginRight: '9px'
                        }}
                      />{' '}
                      {'CASH OUT'}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
          {!clicked && (
            <>
              <div className="auth-proof other">
                <div className="proof-head">
                  <img
                    style={{
                      width: '30px',
                      height: '23px',
                      position: 'absolute',
                      imageRendering: '-webkit-optimize-contrast'
                    }}
                    src="static/img/user-approval-icon.svg"
                  />
                  <h3 className="head">PROOF OF AUTHENTICITY</h3>
                </div>
                <div className="blockchain-ipfs">
                  <div className="blockchain proof">
                    <a
                      target="_blank"
                      href={`https://explorer.celo.org/api?module=account&action=txlist&address=${cusdAddress}`}>
                      BLOCKCHAIN
                    </a>
                  </div>
                  <div className="ipfs proof">
                    {
                      <a
                        target="_blank"
                        href={
                          aristoInfo?.aristoMetadata
                            ? aristoInfo?.aristoMetadata.image
                            : '#'
                        }>
                        IPFS
                      </a>
                    }
                  </div>
                </div>
              </div>
              <div className="history other">
                <div className="history-head">
                  <h3 className="head">HISTORY</h3>
                </div>
                <div className="history-info">
                  {transactions &&
                    transactions.reverse().map((tran, i) => {
                      return (
                        <div style={{ marginBottom: '10px' }} key={i}>
                          <div className="time">{tran.time}</div>
                          {tran.type == 'send' && (
                            <div className="info">
                              @
                              {userMetadata?.profile
                                ? userMetadata?.profile.userName
                                : ''}{' '}
                              sent {`${tran.amount} ${tran.currency}`} to{' '}
                              {tran.to}
                            </div>
                          )}
                          {tran.type == 'receive' && (
                            <div className="info">
                              @
                              {userMetadata?.profile
                                ? userMetadata?.profile.userName
                                : ''}{' '}
                              received {`${tran.amount} ${tran.currency}`} from{' '}
                              {tran.from}
                            </div>
                          )}
                          {tran.type == 'mint' && (
                            <div className="info">
                              @
                              {userMetadata?.profile
                                ? userMetadata?.profile.userName
                                : ''}{' '}
                              minted {`${tran.amount} ${tran.currency}`}
                            </div>
                          )}
                        </div>
                      );
                    })}

                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      fill: 'black',
                      position: 'absolute',
                      bottom: '5px',
                      right: '5px'
                    }}>
                    <path d="M9.90202 6.88889H9.54243C9.51644 6.88889 9.49152 6.89921 9.47314 6.91758C9.45477 6.93596 9.44444 6.96088 9.44444 6.98687V9.05056L7.15565 6.76177C7.13728 6.7434 7.11236 6.73308 7.08637 6.73308C7.06039 6.73308 7.03546 6.7434 7.01709 6.76177L6.76286 7.016C6.74448 7.03437 6.73416 7.05929 6.73416 7.08528C6.73416 7.11126 6.74448 7.13618 6.76286 7.15456L9.05273 9.44444H6.98687C6.96089 9.44444 6.93596 9.45476 6.91759 9.47314C6.89921 9.49151 6.88889 9.51644 6.88889 9.54242V9.90201C6.88889 9.928 6.89921 9.95292 6.91759 9.9713C6.93596 9.98967 6.96089 10 6.98687 10H9.72222L9.9024 9.99929C9.92832 9.99919 9.95314 9.98882 9.97144 9.97046C9.98973 9.9521 10 9.92723 10 9.90131V6.98687C10 6.96088 9.98968 6.93596 9.9713 6.91758C9.95293 6.89921 9.928 6.88889 9.90202 6.88889Z" />
                    <path d="M0.0979823 3.11003H0.457573C0.470441 3.11003 0.483182 3.10749 0.495069 3.10257C0.506957 3.09764 0.517759 3.09043 0.526857 3.08133C0.535956 3.07223 0.543173 3.06143 0.548097 3.04954C0.553021 3.03765 0.555556 3.02491 0.555556 3.01204V0.947267L2.84543 3.23714C2.86381 3.25552 2.88873 3.26584 2.91471 3.26584C2.9407 3.26584 2.96562 3.25552 2.984 3.23714L3.23822 2.98291C3.2566 2.96453 3.26692 2.93961 3.26692 2.91363C3.26692 2.88764 3.2566 2.86272 3.23822 2.84435L0.949436 0.555556H3.01313C3.03912 0.555556 3.06404 0.545233 3.08241 0.526857C3.10079 0.508482 3.11111 0.48356 3.11111 0.457573V0.0979823C3.11111 0.0719958 3.10079 0.0470736 3.08241 0.0286983C3.06404 0.0103231 3.03912 0 3.01313 0H0.0979823C0.0719958 0 0.0470736 0.0103231 0.0286983 0.0286983C0.0103231 0.0470736 0 0.0719958 0 0.0979823V3.01204C0 3.02491 0.00253439 3.03765 0.00745847 3.04954C0.0123826 3.06143 0.0195999 3.07223 0.0286984 3.08133C0.0377969 3.09043 0.0485984 3.09764 0.0604862 3.10257C0.0723739 3.10749 0.0851151 3.11003 0.0979823 3.11003Z" />
                  </svg>
                </div>
              </div>
            </>
          )}
          {option?.spec === 'polygon-addUSDC' && (
            <div
              className="invite-btn"
              onClick={() => {
                setOption({ gen: 'stripe', spec: 'stripe-addUSDC' });
              }}>
              <img
                src="static/img/transaction_icons/USDCoin-ondark1.svg"
                style={{ position: 'absolute', left: '30px' }}
                alt="USDC-logo"
              />
              <span>BUY USD Coin</span>
            </div>
          )}
          {option?.spec === 'stripe-addUSDC' && (
            <div
              className="invite-btn"
              onClick={() => {
                setOption({ gen: 'stripe', spec: 'stripe-addUSDC' });
              }}>
              <img
                src="static/img/transaction_icons/USDCoin-ondark1.svg"
                style={{ position: 'absolute', left: '30px' }}
                alt="USDC-logo"
              />
              <span>ADD USD Coin</span>
            </div>
          )}
          {option?.spec === 'cusd-addcUSD' && (
            <div
              className="invite-btn"
              onClick={() => {
                setOption({ gen: 'stripe', spec: 'stripe-addcUSD' });
              }}>
              <img
                src="static/img/transaction_icons/celo-symbol.svg"
                style={{ position: 'absolute', left: '30px' }}
                alt="celo-logo"
              />
              <span>BUY CELO USD</span>
            </div>
          )}
          <SecondaryFooter />
        </div>
      )}
      <style jsx>{`
        .invite-btn {
          border: 1px solid black;
          border-bottom: 7px solid black;
          width: 100%;
          margin: 10px;
          height: 33px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
        }

        a {
          color: black;
        }
        .black-card .grid-item {
          text-align: center;
          cursor: pointer;
          font-size: 10px;
          font-weight: 700;
          font-family: 'RobotoMono';
        }
        .middle {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #66f6ff;
          font-family: 'RobotoMono';
        }
        .wallet {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .other {
          margin: 5px 0px;
          font-family: RobotoMono;
          position: relative;
          margin-bottom: 10px;
          width: 90%;
        }
        .head {
          font-size: 12px;
          font-weight: 700;
          margin: 10px 0px 10px 50px;
        }
        .balance {
          width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 8px;
          font-wieght: 700;
        }
        .blockchain-ipfs {
          display: flex;
          align-items: center;
          border-bottom: black 5px solid;
        }
        .proof {
          width: 100%;
          height: 26px;
          background: white;
          border: black solid 1px;
          text-align: center;
        }
        .history-info {
          background: white;
          border: rgba(0, 0, 0, 0.3) solid 1px;
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 70px;
          font-size: 12px;
          padding: 5px;
          overflow-y: scroll;
        }
      `}</style>
    </>
  );
}

const HandleClick = (set, txt) => {
  set(txt);
};
