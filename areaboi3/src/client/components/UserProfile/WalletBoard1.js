// import { getAvatarUrl } from '../../settings/avatars.js';
// import Web3 from 'web3';

// function truncateAddress(address) {
//   return `${address.slice(0, 8)}...${address.slice(36)}`;
// }

// // const testSendTransaction = async () => {
// //   try {
// //     setSending(true);
// //     const celo = await kit.contracts.getGoldToken();
// //     if (
// //       await send(
// //         celo
// //           // impact market contract
// //           .transfer(
// //             '0x73D20479390E1acdB243570b5B739655989412f5',
// //             Web3.utils.toWei('0.00000001', 'ether')
// //           )
// //       )
// //     ) {
// //       toast.success('sendTransaction succeeded');
// //       fetchSummary();
// //     }
// //   } catch (e) {
// //     toast.error(e.message);
// //   } finally {
// //     setSending(false);
// //   }
// // };

// const WalletBoard1 = ({ next, myProfile, address, send, handleConnect, nickname, destroy, balance, onLogout }) => {
//   return (
//     <>
//     <div className="wallet-container">
//       {!address ?
//           <div className="wallet-connect--container">
//             <button className="wallet-connect--btn" onClick={handleConnect}>Connect Wallet</button>
//           </div>
//           :
//      <>
//       <div className="wallet-header">
//         <div className="wallet-balance">
//           <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//           <path d="M18.8779 4.58912L18.8801 0H2.90395C2.15662 0.00148099 1.43849 0.290354 0.898304 0.806788C0.358117 1.32322 0.0372634 2.02764 0.00219996 2.77415L0 11.3386H1.22318V5.27551C1.71367 5.6255 2.3014 5.81321 2.90395 5.8123H20.7765V20.3123H11.0614V21.5354H21.9996V4.58912L18.8779 4.58912ZM17.6547 4.58912H2.90395C2.4576 4.58912 2.02953 4.41181 1.71391 4.09619C1.39829 3.78057 1.22098 3.3525 1.22098 2.90615C1.22098 2.4598 1.39829 2.03173 1.71391 1.71611C2.02953 1.40049 2.4576 1.22318 2.90395 1.22318H17.6547V4.58912Z" fill="currentColor"/>
//           <path d="M18.2535 13.8179C18.6978 13.8179 19.0579 13.4577 19.0579 13.0135C19.0579 12.5693 18.6978 12.2091 18.2535 12.2091C17.8093 12.2091 17.4492 12.5693 17.4492 13.0135C17.4492 13.4577 17.8093 13.8179 18.2535 13.8179Z" fill="currentColor"/>
//           <path d="M5.8024 22C4.6548 22 3.53296 21.6597 2.57876 21.0221C1.62456 20.3846 0.880854 19.4784 0.441684 18.4181C0.00251409 17.3579 -0.112393 16.1912 0.111494 15.0656C0.335381 13.9401 0.888006 12.9062 1.69949 12.0947C2.51097 11.2832 3.54486 10.7306 4.67041 10.5067C5.79597 10.2828 6.96264 10.3977 8.02289 10.8369C9.08314 11.2761 9.98935 12.0198 10.6269 12.974C11.2645 13.9282 11.6048 15.05 11.6048 16.1976C11.603 17.736 10.9912 19.2108 9.90338 20.2986C8.8156 21.3864 7.34076 21.9983 5.8024 22ZM5.8024 11.4952C4.87235 11.4952 3.96319 11.771 3.18988 12.2877C2.41657 12.8044 1.81385 13.5388 1.45793 14.3981C1.10202 15.2573 1.0089 16.2028 1.19034 17.115C1.37178 18.0272 1.81965 18.8651 2.47729 19.5227C3.13494 20.1804 3.97283 20.6282 4.88501 20.8097C5.79719 20.9911 6.74269 20.898 7.60194 20.5421C8.4612 20.1862 9.19562 19.5835 9.71232 18.8101C10.229 18.0368 10.5048 17.1277 10.5048 16.1976C10.5034 14.9509 10.0075 13.7556 9.12595 12.8741C8.24439 11.9925 7.04913 11.4966 5.8024 11.4952Z" fill="currentColor"/>
//           <path d="M5.25492 13.3429V14.0565H4.23457V16.7423H6.26954V17.2379L4.23853 17.2401L4.23963 18.3401L5.25492 18.339V19.0522H6.3549V18.3377L7.36952 18.3366V15.6423H5.33455V15.1565H7.37062V14.0565H6.3549V13.3429H5.25492Z" fill="currentColor"/>
//           </svg>
//           <div className="wallet-balance--texts">
//             <p>CELO: {Web3.utils.fromWei(balance.celo.toString())}</p>
//             <p>cUSD: {Web3.utils.fromWei(balance.cusd.toString())}</p>
//           </div>
//         </div>
//         <div className="wallet-rep">
//           <img src="../../static/img/reputation-icon.png" alt="Reputation" />
//           <p>REP: 60.1%</p>
//           <p>AR$T: 1.00</p>
//         </div>
//       </div>
//       <div className="wallet-avatar--container">
//         <img className="wallet-avatar" src={getAvatarUrl(myProfile.avatar)} alt="avatar" />
//         <h4 className="wallet-nickname">{nickname}</h4>
//         <p className="wallet-about">Royal Drummer, King Maker, Eagles Fan</p>
//         <svg width="40" height="40" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//           <path d="M0 0V5.83325H5.83325V0H0ZM4.16675 4.16675H1.66675V1.66675H4.16675V4.16675Z" fill="currentColor"/>
//           <path d="M0 14.1665V20H5.83325V14.1665H0ZM4.16675 18.3335H1.66675V15.8335H4.16675V18.3335Z" fill="currentColor"/>
//           <path d="M14.1667 0V5.83325H20V0H14.1667ZM18.3332 4.16675H15.8332V1.66675H18.3332V4.16675Z" fill="currentColor"/>
//           <path d="M18.3332 7.5V12.5H14.1667V14.1665H20V7.5H18.3332Z" fill="currentColor"/>
//           <path d="M14.1667 15.8335V20H15.8332V17.5H18.3332V20H20V15.8335H14.1667Z" fill="currentColor"/>
//           <path d="M7.5 0V1.66675H10.8333V5.83325H12.5V0H7.5Z" fill="currentColor"/>
//           <path d="M10.8333 7.5V10.8335H7.5V15.8335H10.8333V20H12.5V14.1665H9.16675V12.5H12.5V9.16675H14.1667V10.8335H15.8333V7.5H10.8333Z" fill="currentColor"/>
//           <path d="M9.16675 17.5H7.5V20H9.16675V17.5Z" fill="currentColor"/>
//           <path d="M5.83325 10.8335H3.33325V12.5H5.83325V10.8335Z" fill="currentColor"/>
//           <path d="M7.5 3.33325V7.5H0V12.5H1.66675V9.16675H9.16675V3.33325H7.5Z" fill="currentColor"/>
//         </svg>
//         {/* <p className="wallet-trade">Trade</p> */}
//         <p className="wallet-address">{truncateAddress(address)}</p>
//       </div>
//         <div className="wallet-trx--container">
//           <p className="wallet-trx">
//             <img src="../../static/img/wallet-trx/add-money-icon.svg" alt="" /> <span>Add Money</span>
//           </p>
//           <p className="wallet-trx">
//             <img src="../../static/img/wallet-trx/cashout-icon.svg" alt="" /> <span>Cash Out</span>
//           </p>
//           <p className="wallet-trx">
//             <img src="../../static/img/wallet-trx/send-money-icon.svg" alt="" /> <span>Send Money</span>
//           </p>
//           <p className="wallet-trx">
//             <img src="../../static/img/wallet-trx/request-icon.svg" alt="" /> <span>Request Money</span>
//           </p>
//         </div>
//         <div className="wallet-logout">
//           <div className="wallet-logout--subcontainer" onClick={onLogout}>
//             <img src="../../static/img/exit-icon.svg" alt="exit icon" />
//             <p className="wallet-logout--text">Log Out</p>
//           </div>
//         </div>
//         </>
//          }
//     </div>

//     <style jsx>{`
//          body, html {
//           height: 100%;
//         }

//         p {
//           margin: 0;
//           padding: 0;
//           font-family: 'Noto Sans JP';
//           font-size: 10px;
//           font-style: normal;
//           font-weight: 400;
//           line-height: 11px;
//           letter-spacing: 0em;
//         }

//         .wallet-container {
//           background: #000000;
//           border: 0.5px dotted #ffffff;
//           width: 20rem;
//           height: 32rem;
//         }

//         .wallet-connect--container {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 100%;
//         }

//         .wallet-connect--btn {
//           padding: 4px 8px;
//           background: transparent;
//           border: 1px solid #66FFFF;
//           color: #66FFFF;
//         }

//         .wallet-header {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 5px;
//         }

//         .wallet-header p {
//           font-family: 'Roboto Mono';
//           font-size: 8px;
//           font-weight: 700;
//         }

//         .wallet-balance,
//         .wallet-rep {
//           color: #66FFFF;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//         }

//         .wallet-balance--texts {
//           margin-top: 3px;
//           text-align: left;
//         }

//         .wallet-avatar--container {
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           color: white;
//         }

//         .wallet-nickname {
//           margin-top: 5px;
//           margin-bottom: 3px;
//         }

//         .wallet-about {
//          margin-bottom: 10px;
//         }

//         .wallet-trade,
//         .wallet-address {
//           margin-top: 7.5px;
//           margin-bottom: 7.5px;
//           text-transform: uppercase;
//         }

//         .wallet-trx--container {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           grid-template-rows: 1fr 1fr;
//           text-transform: uppercase;
//           height: 40%;
//           width: 100%;
//           color: #ffffff;
//           margin-left: auto;
//           margin-right: auto;
//           padding: 5px 5px 5px 25px;
//         }

//         .wallet-trx {
//           display: flex;
//           align-items: center;
//         }

//         .wallet-trx span {
//           margin-left: 7.5px;
//         }

//         .wallet-logout {
//           border-top: 1px dotted #ffffff;
//           border-bottom: 1px dotted #ffffff;
//           padding: 5px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .wallet-logout--text,
//         .wallet-trade {
//           color: #66FFFF;
//           font-family: 'Roboto Mono';
//           font-size: 10px;
//           font-weight: 400;
//         }

//         .wallet-logout--subcontainer {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//         }

//         `}
//       </style>
//     </>
//   )
// }

// export default WalletBoard1;
