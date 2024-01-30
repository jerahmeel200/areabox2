import React from 'react';

function PASIconSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '31'}
      height={height || '29'}
      viewBox="0 0 31 29"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 7.39999H3.1C1.4 7.39999 0 8.79999 0 10.5V13.1C0 14.8 1.4 16.2 3.1 16.2H6.5V7.39999Z"
        fill={fill || 'black'}
      />
      <path
        d="M7.3 17.8H3.3L5.7 26.6C6 27.6 6.9 28.3 7.9 28.3C8.6 28.3 9.3 28 9.7 27.4C10.1 26.8 10.3 26.1 10 25.4L7.7 18L7.3 17.8Z"
        fill={fill || 'black'}
      />
      <path
        d="M28.6 9.3C28.3 9.3 28.1 9.3 27.8 9.4V14C28.1 14.1 28.3 14.1 28.6 14.1C29.9 14.1 31 13 31 11.7C31 10.4 29.9 9.3 28.6 9.3Z"
        fill={fill || 'black'}
      />
      <path
        d="M25.8 0L8.2 7.1V16.4L25.9 23.5C26 23.5 26 23.5 26.1 23.4C26.2 23.3 26.2 23.3 26.2 23.2V14.6V9V0.3C26.1 0.0999999 26 0 25.8 0Z"
        fill={fill || 'black'}
      />
    </svg>
  );
}

export default PASIconSvg;