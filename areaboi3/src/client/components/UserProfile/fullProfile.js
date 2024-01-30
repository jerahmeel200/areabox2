import { useState, useEffect } from 'react';
import Link from 'next/link';
import loadProfiles from '../../settings/loadProfiles';
import {
  getTransactionInfo,
  getUserChannelMemberships
} from '../../settings/services';
import Sphinx from '../Sphinx';
import SecondaryFooter from '../SecondaryFooter';

export default function FullProfile({
  viewUser,
  username,
  passport,
  userMetadata,
  wallet,
  channels,
  hideAll,
  profileFn
}) {
  const [accounts, setAccounts] = useState([]);
  const first5Accounts = accounts.slice(0, 5);
  const [transactions, setTransactions] = useState([]);
  const [userChannelMemberships, setUserChannelMemberships] = useState([]);
  const [expandedProfile, setExpandedProfile] = useState(false);

  if (!viewUser) {
    viewUser = {
      address: { display_name: 'not set' },
      userName: username,
      aristo: 1
    };
  }
  if (passport) {
    viewUser = userMetadata.profile;
  }

  const {
    address = { display_name: 'not set' },
    userName,
    aristo
  } = viewUser || {};

  // useEffect(() => {
  //   getTransactionInfo(viewUser.userName, setTransactions);

  //   loadProfiles(userMetadata.profile, setAccounts);
  // }, []);
  useEffect(() => {
    if (viewUser && viewUser.userName) {
      getTransactionInfo(viewUser.userName, setTransactions);
      loadProfiles(userMetadata.profile, setAccounts);
    }
  }, [viewUser, userMetadata]);

  useEffect(() => {
    // Check if viewUser is defined before accessing userName
    if (viewUser?.userName) {
      getUserChannelMemberships(viewUser.userName)
        .then((channels) => {
          setUserChannelMemberships(channels);
        })
        .catch((error) => {
          console.error('Error fetching user channel memberships: ', error);
        });
    }
  }, [viewUser]);

  return (
    <>
      <div
        className="full-profile"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <div
          style={{
            display: 'flex',
            border: 'solid 2px black',
            width: '100%',
            background: 'white'
          }}
          className="section">
          <div
            className="wallet Avatar"
            onClick={() => (passport ? wallet() : null)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '81px',
              justifyContent: 'space-evenly',
              border: 'solid 1px black'
            }}>
            <img
              src={`static/img/ARISTOS/${aristo}.png`}
              style={{ height: '40px', cursor: 'pointer' }}
            />
            {passport && (
              <>
                <img
                  src="static/img/wallet-icon.svg"
                  style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                />
                <p
                  style={{
                    padding: '0px',
                    margin: '0px',
                    fontFamily: "'Roboto Mono'",
                    fontSize: '10px'
                  }}>
                  My Wallet
                </p>
              </>
            )}
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div
              style={{
                display: 'flex',
                border: 'solid 1px black',
                padding: '3px',
                justifyContent: 'space-between'
              }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  fontFamily: "'Noto Sans JP'",
                  margin: '1px'
                }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src="static/img/barcode.svg"
                    style={{ width: '16px', height: '16px', margin: '5px' }}
                  />
                  <span style={{ fontFamily: '', fontWeight: '700' }}>
                    {userName}
                  </span>
                </div>
                <div style={{ fontSize: '10px' }}>
                  Tap to add more details to your profile
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '1px',
                  alignItems: 'flex-end'
                }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                  <Sphinx profile={viewUser} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', minHeight: '28px' }}>
              <div
                style={{
                  border: 'solid black 1px',
                  fontFamily: "'Noto Sans JP'",
                  fontSize: '9px',
                  flexGrow: '2',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '3px'
                }}>
                {address?.display_name}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  border: 'solid 1px black',
                  flexGrow: '1'
                }}>
                <img className="social" src="static/img/facebook.svg" />
                <img className="social" src="static/img/twitter.svg" />
                <img className="social" src="static/img/instagram.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <span className="section-title">My Transactions</span>
          <div
            className="section-body"
            style={{ gridTemplate: 'none/1fr 1fr' }}>
            {transactions &&
              transactions.map((tran, i) => {
                return (
                  <div style={{ marginBottom: '10px' }} key={i}>
                    <div className="time">{tran.time}</div>
                    {tran.type == 'send' && (
                      <div className="info">
                        @
                        {userMetadata?.profile
                          ? userMetadata?.profile.userName
                          : ''}{' '}
                        sent {`${tran.amount} ${tran.currency}`} to {tran.to}
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
            <div
              style={{
                position: 'absolute',
                bottom: '5px',
                right: '5px'
              }}>
              <img src="static/img/expand_black.svg" />
            </div>
          </div>
        </div>
        <div className="section">
          <span className="section-title">My Channels</span>
          <div
            className="section-body"
            style={{ gridTemplate: 'none/1fr 1fr' }}>
            {/* <span onClick={() => hideAll()} className="my-channels">
              <Link legacyBehavior href="/">
                <a>[Development]</a>
              </Link>
            </span>
            <span onClick={() => hideAll()} className="my-channels">
              {channeLink(channels[6])}
            </span>
            <span onClick={() => hideAll()} className="my-channels">
              {channeLink(channels[10])}
            </span>
            <span onClick={() => hideAll()} className="my-channels">
              {channeLink(channels[23])}
            </span> */}
            {userChannelMemberships.map((channel, i) => (
              <span key={i} className="my-channels">
                {channeLink(channel)}
              </span>
            ))}
          </div>
        </div>
        <div className="section">
          <span className="section-title">My Area</span>
          {expandedProfile ? (
            <div className="section-body">
              <ul
                style={{
                  height: '5rem',
                  overflow: 'scroll'
                }}>
                {accounts.map((user) => {
                  return (
                    <li
                      style={{
                        padding: '.5rem',
                        cursor: 'pointer',
                        borderBottom: 'dotted grey 1px'
                      }}
                      onClick={() => selected(user)}
                      key={user.profile.userName}>
                      <img
                        width={15}
                        height={20}
                        src={`static/img/ARISTOS/${user.profile.aristo}.png`}
                      />{' '}
                      <span>@{user.profile.userName}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div
              className="section-body"
              style={{ gridTemplate: 'none/1fr 1fr 1fr' }}>
              {first5Accounts.map((acc, i) => {
                return (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      showProfile(hideAll, profileFn, acc.profile.userName)
                    }
                    className="my-area"
                    key={i}>
                    <img src={`static/img/ARISTOS/${acc.profile.aristo}.png`} />
                    @{acc.profile.userName}
                  </span>
                );
              })}
              <span>+12 others</span>
            </div>
          )}
          <div
            onClick={() => setExpandedProfile(!expandedProfile)}
            style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px'
            }}>
            <img src="static/img/expand_black.svg" />
          </div>
        </div>
        <div className="section">
          <span className="section-title">My Favourite Things</span>
          <div className="section-body">
            <div className="fav-things">
              <img src="static/img/Books.svg" />
              <span>Old books (NFTs)</span>
            </div>
            <div className="fav-things">
              <img src="static/img/Film.svg" />
              <span>Foreign movies (NFTs)</span>
            </div>
            <div className="fav-things">
              <img src="static/img/Music.svg" />
              <span>Your dad's jamz (NFTs)</span>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '5px',
              right: '5px'
            }}>
            <img src="static/img/expand_black.svg" />
          </div>
        </div>
        <div className="section">
          <span className="section-title">Something Else</span>
          <div className="section-body">
            Tap to add more details to your profile
          </div>
        </div>
        <div className="invite-btn">
          <img
            src="static/img/AreaBoxVector.svg"
            style={{ position: 'absolute', left: '10px' }}
          />
          <span>Invite/Join My Area</span>
        </div>
        <SecondaryFooter />
      </div>
      <style jsx>{`
        .social {
          width: 10px;
          height: 10px;
        }
        a {
          color: black;
        }
        p {
          margin: 0px;
          padding: 0px;
          color: black;
        }
        .section {
          margin-bottom: 20px;
          width: 100%;
          position: relative;
        }
        .section-title {
          font-family: 'Noto Sans JP';
          font-weight: 700;
          border: solid 1px rgba(0, 0, 0, 0.8);
          height: 24px;
          display: inline;
          background: white;
          padding: 5px 8px;
          position: relative;
          bottom: 2px;
          font-size: 9px;
        }
        .section-body {
          border: solid 1px rgba(0, 0, 0, 0.8);
          padding: 5px 5px 5px 40px;
          display: grid;
          font-family: 'Roboto Mono';
          font-size: 11px;
          background: white;
        }
        .my-area img {
          width: 19px;
          height: 22px;
          margin: 2px;
        }
        .invite-btn {
          border: 1px solid black;
          border-bottom: 7px solid black;
          width: 90%;
          margin: 10px;
          height: 33px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
      `}</style>
    </>
  );
}

const channeLink = (room) => {
  return (
    <Link
      key={room.key}
      legacyBehavior
      href={
        '/?rk=' +
        encodeURIComponent(room.key) +
        '&rt=' +
        encodeURIComponent(room.title)
      }>
      <a style={{ color: 'black' }}>[{room.title}]</a>
    </Link>
  );
};

const showProfile = (hide, profile, key) => {
  hide();
  profile(key);
};
