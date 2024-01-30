import React from 'react';

function BarcodeSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '20'}
      height={height || '20'}
      viewBox="0 0 20 20"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0V5.83325H5.83325V0H0ZM4.16675 4.16675H1.66675V1.66675H4.16675V4.16675Z"
        fill={fill || 'black'}
      />
      <path
        d="M0 14.1665V20H5.83325V14.1665H0ZM4.16675 18.3335H1.66675V15.8335H4.16675V18.3335Z"
        fill={fill || 'black'}
      />
      <path
        d="M14.1667 0V5.83325H20V0H14.1667ZM18.3332 4.16675H15.8332V1.66675H18.3332V4.16675Z"
        fill={fill || 'black'}
      />
      <path
        d="M18.3332 7.5V12.5H14.1667V14.1665H20V7.5H18.3332Z"
        fill={fill || 'black'}
      />
      <path
        d="M14.1667 15.8335V20H15.8332V17.5H18.3332V20H20V15.8335H14.1667Z"
        fill={fill || 'black'}
      />
      <path
        d="M7.5 0V1.66675H10.8333V5.83325H12.5V0H7.5Z"
        fill={fill || 'black'}
      />
      <path
        d="M10.8333 7.5V10.8335H7.5V15.8335H10.8333V20H12.5V14.1665H9.16675V12.5H12.5V9.16675H14.1667V10.8335H15.8333V7.5H10.8333Z"
        fill={fill || 'black'}
      />
      <path d="M9.16675 17.5H7.5V20H9.16675V17.5Z" fill={fill || 'black'} />
      <path
        d="M5.83325 10.8335H3.33325V12.5H5.83325V10.8335Z"
        fill={fill || 'black'}
      />
      <path
        d="M7.5 3.33325V7.5H0V12.5H1.66675V9.16675H9.16675V3.33325H7.5Z"
        fill={fill || 'black'}
      />
    </svg>
  );
}

export default BarcodeSvg;
