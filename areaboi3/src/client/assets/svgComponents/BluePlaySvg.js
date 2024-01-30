import React from 'react';

function BluePlaySvg({ width, height, fill }) {
  return (
    <svg
      width={width || '8'}
      height={height || '11'}
      viewBox="0 0 8 11"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.45763 4.20339L2.0339 0.237288C1.83051 0.101695 1.55932 0 1.28814 0C0.576271 0 0 0.576271 0 1.28814V9.22034C0 9.93221 0.576271 10.5085 1.28814 10.5085C1.55932 10.5085 1.83051 10.4068 2.0339 10.2712L7.45763 6.30509C7.79661 6.0678 8 5.69492 8 5.25424C8 4.84746 7.79661 4.47458 7.45763 4.20339Z"
        fill={fill || '#1505CC'}
      />
    </svg>
  );
}

export default BluePlaySvg;
