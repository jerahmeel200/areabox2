import React from 'react';

function ExitIconSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '20'}
      height={height || '20'}
      viewBox="0 0 20 20"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.561 3.338L13.5368 4.3622L17.2274 8.0342H13.2218V0H0V16.8376L9.4734 20V16.9846H13.2218V9.4828H17.2272L13.5818 13.203L14.606 14.2272L20 8.7586L14.561 3.338ZM8.0096 17.9696L1.4496 15.7824V1.8262L8.0096 4.0136V17.9696ZM11.7582 8.0344H9.8838V9.4828H11.7582V15.5206H8.9466V3.338L3.324 1.4638H11.7582V8.0344Z"
        fill={fill || '#66FFFF'}
      />
    </svg>
  );
}

export default ExitIconSvg;
