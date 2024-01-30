import React from 'react';

function GhostIconSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '12'}
      height={height || '10'}
      viewBox="0 0 12 10"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 5.55556V2.77778H8.88889V1.66667H7.77778V0H3.33333V1.66667H2.22222V2.77778H1.11111V5.55556H0V7.77778H1.11111V10H3.33333V8.88889H4.44444V10H6.66667V8.88889H7.77778V10H10V7.77778H11.1111V5.55556H10ZM4.44444 6.11111H3.88889V5.55556H2.77778V4.44444H4.44444V6.11111ZM8.33333 6.11111H7.77778V5.55556H6.66667V4.44444H8.33333V6.11111Z"
        fill={fill || 'white'}
      />
    </svg>
  );
}

export default GhostIconSvg;
