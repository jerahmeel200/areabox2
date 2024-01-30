import React from 'react';

function StopGoldSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '15'}
      height={height || '15'}
      viewBox="0 0 15 15"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 0C3.33871 0 0 3.33871 0 7.5C0 11.6613 3.33871 15 7.5 15C11.6613 15 15 11.6613 15 7.5C15 3.33871 11.6613 0 7.5 0ZM9.87097 9.33871C9.87097 9.62903 9.62903 9.87097 9.33871 9.87097H5.66129C5.37097 9.87097 5.12903 9.62903 5.12903 9.33871V5.66129C5.12903 5.37097 5.37097 5.12903 5.66129 5.12903H9.33871C9.62903 5.12903 9.87097 5.37097 9.87097 5.66129V9.33871Z"
        fill={fill || '#FFF606'}
      />
    </svg>
  );
}

export default StopGoldSvg;
