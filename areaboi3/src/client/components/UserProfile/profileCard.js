import React from 'react';

export default function ProfileCard(props) {
  const viewProfile = () => {
    props.fullProfile();
    props.closeModal();
  };
  const sendTo = (a, b, c, d) => {
    send(a, b, c, d);
    props.closeModal();
  };
  let { viewUser, username, send } = props;

  const { address, userName, aristo } = viewUser;
  console.log('view User', viewUser);
  return (
    <>
      <div
        style={{
          background: 'black',
          color: 'white',
          position: 'relative',
          width: '300px',
          position: 'relative',
          fontFamily: "'Noto Sans JP'",
          paddingBottom: '35px'
        }}>
        <div
          className="areabox column"
          style={{ position: 'absolute', left: '20px', top: '20px' }}>
          {/* <img src='static/img/AreaBox.png' style={{width:'40px', height:'40px', }} />
                    <h2 style={{fontFamily:"'Stolzl'", color:'#FFF606', fontSize:'10px'}}>AREABOX</h2> */}
        </div>
        <div
          className="sphinx column"
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <img
            src="static/img/baby_sphinx.png"
            style={{ width: '40px', height: '32.4px' }}
          />
          <div
            style={{
              fontFamily: "'Roboto Mono'",
              color: '#66F6FF',
              fontSize: '8px'
            }}>
            REP: <span style={{ fontSize: '12px' }}>51.0%</span>
          </div>
        </div>

        <div className="column" style={{ paddingTop: '90px' }}>
          <img
            src={`static/img/ARISTOS/${aristo}.png`}
            style={{ width: '44px', height: '60px' }}
          />
          <div
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => viewProfile()}>
            <h2 style={{ fontSize: '20px', color: 'white' }}>{userName}</h2>
            <svg
              className="expand"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                fill: 'white',
                position: 'relative',
                bottom: '4px',
                left: '5px'
              }}>
              <path
                d="M9.90202 6.88889H9.54243C9.51644 6.88889 9.49152 6.89921 9.47314 6.91758C9.45477 6.93596 9.44444 6.96088 9.44444 6.98687V9.05056L7.15565 6.76177C7.13728 6.7434 7.11236 6.73308 7.08637 6.73308C7.06039 6.73308 7.03546 6.7434 7.01709 6.76177L6.76286 7.016C6.74448 7.03437 6.73416 7.05929 6.73416 7.08528C6.73416 7.11126 6.74448 7.13618 6.76286 7.15456L9.05273 9.44444H6.98687C6.96089 9.44444 6.93596 9.45476 6.91759 9.47314C6.89921 9.49151 6.88889 9.51644 6.88889 9.54242V9.90201C6.88889 9.928 6.89921 9.95292 6.91759 9.9713C6.93596 9.98967 6.96089 10 6.98687 10H9.72222L9.9024 9.99929C9.92832 9.99919 9.95314 9.98882 9.97144 9.97046C9.98973 9.9521 10 9.92723 10 9.90131V6.98687C10 6.96088 9.98968 6.93596 9.9713 6.91758C9.95293 6.89921 9.928 6.88889 9.90202 6.88889Z"
                fill-opacity="0.5"
              />
              <path
                d="M0.0979823 3.11003H0.457573C0.470441 3.11003 0.483182 3.10749 0.495069 3.10257C0.506957 3.09764 0.517759 3.09043 0.526857 3.08133C0.535956 3.07223 0.543173 3.06143 0.548097 3.04954C0.553021 3.03765 0.555556 3.02491 0.555556 3.01204V0.947267L2.84543 3.23714C2.86381 3.25552 2.88873 3.26584 2.91471 3.26584C2.9407 3.26584 2.96562 3.25552 2.984 3.23714L3.23822 2.98291C3.2566 2.96453 3.26692 2.93961 3.26692 2.91363C3.26692 2.88764 3.2566 2.86272 3.23822 2.84435L0.949436 0.555556H3.01313C3.03912 0.555556 3.06404 0.545233 3.08241 0.526857C3.10079 0.508482 3.11111 0.48356 3.11111 0.457573V0.0979823C3.11111 0.0719958 3.10079 0.0470736 3.08241 0.0286983C3.06404 0.0103231 3.03912 0 3.01313 0H0.0979823C0.0719958 0 0.0470736 0.0103231 0.0286983 0.0286983C0.0103231 0.0470736 0 0.0719958 0 0.0979823V3.01204C0 3.02491 0.00253439 3.03765 0.00745847 3.04954C0.0123826 3.06143 0.0195999 3.07223 0.0286984 3.08133C0.0377969 3.09043 0.0485984 3.09764 0.0604862 3.10257C0.0723739 3.10749 0.0851151 3.11003 0.0979823 3.11003Z"
                fill-opacity="0.5"
              />
            </svg>
          </div>

          <p>Royal drummer. King maker. Eagles fan</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly'
            }}>
            <svg
              onClick={() =>
                sendTo('celo', 'celo-sendMoney', 'sendMoney', viewUser)
              }
              style={{ width: '30px', height: '30px', fill: 'white' }}
              xmlnsDc="http://purl.org/dc/elements/1.1/"
              xmlnsCc="http://creativecommons.org/ns#"
              xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
              xmlnsSvg="http://www.w3.org/2000/svg"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsSodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
              xmlnsInkscape="http://www.inkscape.org/namespaces/inkscape"
              viewBox="0 0 16.933333 21.1666675"
              version="1.1"
              x="0px"
              y="0px">
              <g transform="translate(0,-280.06665)">
                <path d="m 7.8148962,282.31612 v 0.65159 1.18821 h -0.745452 c -1.686798,0 -2.74715,1.2577 -2.74715,2.51504 0,1.25733 1.060352,2.51468 2.74715,2.51468 h 0.745452 v 2.42153 h -2.608537 -0.651952 v 1.30354 h 0.651952 2.608537 v 1.18821 0.65159 h 1.303542 v -0.65159 -1.18821 h 0.745088 c 1.6867968,0 2.7475128,-1.25769 2.7475128,-2.51504 0,-1.25733 -1.060716,-2.51467 -2.7475128,-2.51467 h -0.745088 v -2.42153 h 2.6081718 0.651953 v -1.30355 H 11.72661 9.1184382 v -1.18821 -0.65159 z m -0.745452,3.14335 h 0.745452 v 2.42153 h -0.745452 c -1.107284,0 -1.443609,-0.60466 -1.443609,-1.21004 0,-0.60539 0.336325,-1.21149 1.443609,-1.21149 z m 2.048994,3.72617 h 0.745088 c 1.1072838,0 1.4439718,0.60465 1.4439718,1.21003 0,0.60539 -0.336688,1.2115 -1.4439718,1.2115 h -0.745088 z" />
              </g>
            </svg>
            <h3 className="send" style={{ color: 'white' }}>
              send
            </h3>
            <svg
              onClick={() =>
                sendTo('kuda', 'kuda-sendMoney', 'sendMoney', viewUser)
              }
              style={{ width: '30px', height: '30px', fill: 'white' }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 100 125"
              enableBackground="new 0 0 100 100"
              xmlSpace="preserve">
              <path d="M86.75,46.594v-8h-6.725V18.717h-8v19.877H45.207L27.975,18.815v-0.099h-8v19.877H13.25v8h6.725v7H13.25v8h6.725v19.688h8  V61.594h26.782l17.217,19.688l0.052-0.018v0.018h8V61.594h6.725v-8h-6.725v-7H86.75z M27.975,30.968l6.668,7.626h-6.668V30.968z   M27.975,53.594v-7H41.64l6.121,7H27.975z M72.025,69.375l-6.78-7.781h6.78V69.375z M72.025,53.594h-13.75l-6.099-7h19.849V53.594z" />
            </svg>
          </div>
        </div>
        <div
          className="area"
          style={{
            border: 'dotted 1px rgba(256, 256, 256, 0.4)',
            minHeight: '55px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <div style={{ fontSize: '12px', width: '200px', margin: '5px' }}>
            {address?.display_name}
          </div>
          <div
            className="column"
            style={{ margin: '5px', flexDirection: 'row' }}>
            <img
              src="static/img/retha.png"
              style={{ height: '10px', width: '10px' }}
            />
            <p
              style={{
                fontFamily: "'Roboto Mono'",
                fontSize: '10px',
                color: '#66F6FF',
                padding: '0px',
                margin: '0px'
              }}>
              INVITE/JOIN
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .column {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
}
