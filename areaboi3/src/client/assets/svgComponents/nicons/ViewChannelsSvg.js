import React from 'react';

function ViewChannelsSvg({ width, height, fill, className, style, onClick }) {
  const onclick = onClick || (() => {});
  return (
    <svg
      width={width || ''}
      height={height}
      fill={fill}
      className={className}
      style={style}
      onClick={onclick}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 32 40"
      enableBackground="new 0 0 32 32"
      xmlSpace="preserve">
      <g>
        <path
          d="M16.3,0.7C7.9,0.7,1,7.6,1,16c0,2.6,0.7,5.1,1.9,7.4l-2.4,6.9c-0.1,0.3,0,0.6,0.2,0.8c0.1,0.2,0.3,0.2,0.5,0.2   c0.1,0,0.1,0,0.2,0l7.2-2.1c2.3,1.3,4.9,2.1,7.6,2.1c8.4,0,15.2-6.8,15.2-15.2C31.5,7.6,24.7,0.7,16.3,0.7z M20.5,22.5h-9.1   c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8h9.1c0.4,0,0.8,0.3,0.8,0.8C21.3,22.1,20.9,22.5,20.5,22.5z M20.5,16.8h-9.1   c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8h9.1c0.4,0,0.8,0.3,0.8,0.8C21.3,16.4,20.9,16.8,20.5,16.8z M20.5,11h-9.1   c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h9.1c0.4,0,0.8,0.3,0.8,0.8S20.9,11,20.5,11z"
          fill="white"
        />
      </g>
    </svg>
  );
}

export default ViewChannelsSvg;
