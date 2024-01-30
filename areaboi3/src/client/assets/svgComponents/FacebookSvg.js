import React from 'react';

function FacebookSvg() {
  return (
    <svg
      width={width || '7'}
      height={height || '14'}
      viewBox="0 0 7 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.75 4.66667H0V7H1.75V14H4.66667V7H6.79117L7 4.66667H4.66667V3.69425C4.66667 3.13717 4.77867 2.91667 5.31708 2.91667H7V0H4.77867C2.681 0 1.75 0.923416 1.75 2.69208V4.66667Z"
        fill={fill || 'black'}
      />
    </svg>
  );
}

export default FacebookSvg;
