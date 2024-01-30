import React from 'react';

function BlueArrowSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '18'}
      height={height || '15'}
      viewBox="0 0 18 15"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.1992 6.76692L10.7143 0.281955C10.5451 0.112782 10.2632 0 9.9812 0C9.41729 0 8.96617 0.451128 8.96617 1.01504V2.76316C8.96617 2.81955 8.90978 2.93233 8.79699 2.93233H1.01504C0.451128 2.93233 0 3.38346 0 3.94737V11.0526C0 11.6165 0.451128 12.0677 1.01504 12.0677H8.79699C8.85338 12.0677 8.96617 12.1241 8.96617 12.2368V13.985C8.96617 14.5489 9.41729 15 9.9812 15C10.2632 15 10.4887 14.8872 10.7143 14.718L17.1992 8.23308C17.3684 8.06391 17.4812 7.78196 17.4812 7.5C17.4812 7.21805 17.3684 6.99248 17.1992 6.76692Z"
        fill={fill || '#66F6FF'}
      />
    </svg>
  );
}

export default BlueArrowSvg;
