import Sphinx from '../Sphinx';

export function Top({
  user,
  clicked,
  option,
  cusdAddress,
  usdcAddress,
  kudaAccount
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '7.5px 1.5rem',
        height: '72px'
      }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`static/img/ARISTOS/${user.aristo}.png`}
            style={{
              height: '20px',
              width: '20px',
              margin: '3px',
              imageRendering: '-webkit-optimize-contrast'
            }}
          />
          <h3
            style={{
              margin: '0px',
              padding: '0px',
              fontFamily: "'Noto Sans JP'",
              color: 'white',
              fontSize: '16px',
              fontWeight: '700'
            }}>
            {user.userName}
          </h3>
        </div>
        {kudaAccount[0]?.accountNumber &&
          clicked &&
          option?.gen === 'kuda' &&
          kudaAccount && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: "'Roboto Mono'",
                color: '#66F6FF'
              }}>
              <span style={{ fontSize: '8px', fontWeight: '400' }}>
                ACCT NO.
              </span>
              <span style={{ fontSize: '12px', fontWeight: '700' }}>
                {kudaAccount[0]?.accountNumber}
              </span>
            </div>
          )}
        {cusdAddress && clicked && option?.gen === 'celo' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "'Roboto Mono'",
              color: '#66F6FF'
            }}>
            <span style={{ fontSize: '8px', fontWeight: '400' }}>
              CELO WALLET ADDRESS:
            </span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '700',
                width: '100px',
                overflow: 'hidden'
              }}>
              {cusdAddress}
            </span>
          </div>
        )}
        {usdcAddress &&
          clicked &&
          (option?.gen === 'circle' || option?.gen === 'stripe') && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: "'Roboto Mono'",
                color: '#66F6FF'
              }}>
              <span style={{ fontSize: '8px', fontWeight: '400' }}>
                USDC WALLET ADDRESS:
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  width: '100px',
                  overflow: 'hidden'
                }}>
                {usdcAddress}
              </span>
            </div>
          )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          fontSize: '12px',
          color: '#66f6ff'
        }}>
        <Sphinx profile={user} />
      </div>
    </div>
  );
}

export function Mid({
  txsymbol,
  msg,
  symbol,
  type,
  setOption,
  cusd,
  usdc,
  stripe
}) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          height: '60px',
          justifyContent: 'space-between',
          padding: '5px 1.5rem',
          border: 'dotted rgba(256, 256, 256, 0.4) 1px',
          alignItems: 'center'
        }}>
        <div
          className="flex-cont"
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '10px',
            cursor: 'pointer'
          }}
          onClick={() => {
            msg == 'ADD cUSD'
              ? setOption(cusd)
              : msg == 'ADD USDC' || (msg == 'BUY USDC' && setOption(usdc));
          }}>
          <img
            src={`static/img/wallet-trx/${txsymbol}`}
            style={{ height: '24px', width: '29px', marginRight: '10px' }}
          />
          {msg}
        </div>
        {msg === 'SEND USD' ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '15rem'
            }}>
            <div>
              <img
                src="static/img/transaction_icons/USDCoin-ondark3.svg"
                alt="usdc-logo"
              />
            </div>
            <div>
              <img
                src="static/img/transaction_icons/Celo_Wordmark_Yellow8.svg"
                alt="celo-logo"
              />
            </div>
            <div>
              <img
                src="static/img/transaction_icons/USDTether.svg"
                alt="usdt-logo"
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
            {msg == 'ADD NAIRA' ||
            msg == 'SEND NAIRA' ||
            msg == 'CASH OUT USDC' ||
            msg == 'CASH OUT cUSD' ||
            msg == 'CASH OUT NAIRA' ? (
              <>
                <span
                  style={{
                    color: '#66F6FF',
                    fontSize: '8px',
                    marginBottom: '2px',
                    textAlign: 'center'
                  }}>
                  POWERED BY
                </span>
                {type === 'cusd' ? (
                  <img
                    src={`static/img/transaction_icons/${symbol}`}
                    alt="celo_logo"
                  />
                ) : type === 'usdc' ? (
                  <img
                    src={`static/img/transaction_icons/${symbol}`}
                    alt="polygon-logo"
                  />
                ) : type === 'kuda' ? (
                  <img
                    src={`static/img/transaction_icons/${symbol}`}
                    alt="kuda_logo"
                  />
                ) : (
                  type === 'stripe' && (
                    <img
                      src={`static/img/transaction_icons/${symbol}`}
                      alt="stripe_logo"
                    />
                  )
                )}
              </>
            ) : msg == 'BUY cUSD' || msg == 'BUY USDC' ? (
              <img
                src={`static/img/transaction_icons/${symbol}`}
                alt="stripe_logo"
              />
            ) : msg == 'ADD USDC' || msg == 'SEND USDC' ? (
              <img
                style={{ padding: '0 1rem .5rem 0' }}
                src={`static/img/transaction_icons/${symbol}`}
                alt="polygon-logo"
              />
            ) : msg == 'ADD cUSD' || msg == 'SEND cUSD' ? (
              <img
                style={{ padding: '0 0 .5rem 1rem' }}
                src="static/img/transaction_icons/Celo_Wordmark_Yellow4.svg"
              />
            ) : (
              msg !== 'SEND USD' && (
                <>
                  <div>
                    <img
                      style={{ padding: '0 0 .5rem 1rem' }}
                      src="static/img/transaction_icons/USDTether.svg"
                    />
                    <img
                      style={{ padding: '0 0 .5rem 1rem' }}
                      src="static/img/transaction_icons/kuda-logo.svg"
                    />
                  </div>
                  <div>
                    <img
                      style={{ padding: '0 0 .5rem 1rem' }}
                      src="static/img/transaction_icons/USDCoin-ondark3.svg"
                    />
                    <img
                      style={{ padding: '0 0 .5rem 1rem' }}
                      src="static/img/transaction_icons/Celo_Wordmark_Yellow4.svg"
                    />
                  </div>
                </>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export function Bottom({
  setOption,
  kuda,
  cusd,
  usdc,
  usdt,
  txsymbol,
  info,
  walletReady,
  viewUser
}) {
  return (
    <>
      {walletReady && (
        <div
          style={{
            margin: '0px',
            fontSize: '12px',
            border: 'dotted rgba(256, 256, 256, 0.4) 1px',
            fontFamily: "'Noto Sans JP'"
          }}>
          <div
            style={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <p
              style={{
                marginBottom: '1rem'
              }}>
              Your wallet is now ready!
            </p>
            <p>
              You may now carry out NAIRA and USD transactions on your account.
            </p>
          </div>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          height: '250px',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: 'dotted rgba(256, 256, 256, 0.4) 1px',
          padding: '2rem'
        }}>
        <span
          className="flex-cont"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr',
            width: '100%',
            height: '100%',
            fontSize: '10px',
            fontWeight: '700'
          }}>
          <span>
            <img
              src={`static/img/wallet-trx/${txsymbol}`}
              style={{ height: '24px', width: '25px', marginRight: '9px' }}
            />{' '}
            {info}
          </span>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: '1fr 1fr 1fr',
              justifyItems: 'center',
              alignItems: 'center'
            }}>
            {viewUser?.phoneNo?.countryCode === '+234' ? (
              <span className="currency-name" onClick={() => setOption(kuda)}>
                NAIRA
              </span>
            ) : (
              <span className="currency-name" onClick={() => setOption(kuda)}>
                CASH
              </span>
            )}
            <span className="currency-name" onClick={() => setOption(usdc)}>
              USDC
            </span>
            <span className="currency-name" onClick={() => setOption(cusd)}>
              cUSD
            </span>
            <span className="currency-name" onClick={() => setOption(usdt)}>
              USDT
            </span>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: '1fr 1fr 1fr',
              justifyItems: 'end'
            }}>
            {viewUser?.phoneNo?.countryCode === '+234' ? (
              <img
                onClick={() => setOption(kuda)}
                className="platform-img"
                src="static/img/transaction_icons/kuda-logo.svg"
                alt="Kuda-logo"
              />
            ) : (
              <img
                onClick={() => setOption(kuda)}
                className="platform-img"
                src="static/img/transaction_icons/Areanna_Sphinx.png"
                alt="Areabank-logo"
              />
            )}
            <img
              onClick={() => setOption(usdc)}
              className="platform-img"
              src="static/img/transaction_icons/USDCoin-ondark1.svg"
              alt="USDC-logo"
            />
            <img
              onClick={() => setOption(cusd)}
              className="platform-img"
              src="static/img/transaction_icons/Celo_Wordmark_Yellow4.svg"
              alt="Celo-logo"
            />
            <img
              onClick={() => setOption(usdt)}
              className="platform-img"
              src="static/img/transaction_icons/USDTether.svg"
              alt="USDT-logo"
            />
          </div>
        </span>
      </div>
      <style jsx>{`
        .platform-img {
          width: 53px;
          height: 53px;
          cursor: pointer;
        }
        .currency-name {
          color: #66f6ff;
          font-size: 12px;
          cursor: pointer;
          padding: 1rem 2rem;
        }
      `}</style>
    </>
  );
}
