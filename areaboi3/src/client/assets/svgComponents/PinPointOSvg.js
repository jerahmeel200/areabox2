import React from 'react';

function PinPointOSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '19'}
      height={height || '31'}
      viewBox="0 0 19 31"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.6 22.6V24.1C15.1 24.5 17.1 25.8 17.1 26.7C17.1 27.8 14.1 29.4 9.3 29.4C4.5 29.4 1.5 27.8 1.5 26.7C1.5 25.7 3.5 24.5 7 24.1V22.6C3.3 23 0 24.4 0 26.7C0 29.5 4.8 31 9.3 31C13.8 31 18.6 29.5 18.6 26.7C18.6 24.4 15.3 23 11.6 22.6Z"
        fill={fill || 'black'}
      />
      <path
        d="M15.4 6.1C15.4 2.7 12.7 0 9.30001 0C5.90001 0 3.20001 2.7 3.20001 6.1C3.20001 9.2 5.50001 11.8 8.50001 12.2V26.8C8.50001 27.2 8.80001 27.6 9.30001 27.6C9.70001 27.6 10.1 27.3 10.1 26.8V12.2C13.1 11.8 15.4 9.2 15.4 6.1Z"
        fill={fill || 'black'}
      />
    </svg>
  );
}

export default PinPointOSvg;
