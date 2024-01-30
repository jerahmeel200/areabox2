import React from 'react';

function GallerySvg({ width, height, fill }) {
  return (
    <svg
      width={width || '31'}
      height={height || '31'}
      viewBox="0 0 31 31"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.50001 9.3C9.49412 9.3 10.3 8.49411 10.3 7.5C10.3 6.50588 9.49412 5.7 8.50001 5.7C7.5059 5.7 6.70001 6.50588 6.70001 7.5C6.70001 8.49411 7.5059 9.3 8.50001 9.3Z"
        fill={fill || 'black'}
      />
      <path
        d="M0 25.3V29.2C0 30.2 0.8 31 1.8 31H29.2C30.2 31 31 30.2 31 29.2V25.3H12H0Z"
        fill={fill || 'black'}
      />
      <path
        d="M6 17L10 21.3L22.3 7C23 6.2 24.3 6.2 25 7L31 14V1.8C31 0.8 30.2 0 29.2 0H1.8C0.8 0 0 0.8 0 1.8V20.4L3.2 17C3.9 16.2 5.3 16.2 6 17ZM8.5 4.2C10.4 4.2 11.9 5.7 11.9 7.6C11.9 9.5 10.4 11 8.5 11C6.6 11 5.2 9.4 5.2 7.5C5.2 5.6 6.7 4.2 8.5 4.2Z"
        fill={fill || 'black'}
      />
    </svg>
  );
}

export default GallerySvg;
