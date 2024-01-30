import React from 'react';

function BlackPackmanSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '30'}
      height={height || '27'}
      viewBox="0 0 30 27"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27 15V7.5H24V4.5H21V0H9V4.5H6V7.5H3V15H0V21H3V27H9V24H12V27H18V24H21V27H27V21H30V15H27ZM12 16.5H10.5V15H7.5V12H12V16.5ZM22.5 16.5H21V15H18V12H22.5V16.5Z"
        fill={fill || 'black'}
      />
    </svg>
  );
}

export default BlackPackmanSvg;
