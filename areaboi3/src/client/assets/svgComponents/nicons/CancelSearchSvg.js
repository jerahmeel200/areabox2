import React from 'react';

function CancelSearchSvg({ width, height, fill, className, style, onClick }) {
  const width = width || '';
  const height = height || '';
  const fill = fill || '';
  const className = className || '';
  const style = style || {};
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
      <path
        fill="#ffffff"
        d="M31.3,24.7L22.6,16l8.7-8.7c0.3-0.3,0.3-0.8,0-1.1l-5.6-5.6c-0.3-0.3-0.8-0.3-1.1,0L16,9.4L7.3,0.7c-0.3-0.3-0.8-0.3-1.1,0  L0.7,6.3C0.4,6.6,0.4,7,0.7,7.3L9.4,16l-8.7,8.7c-0.3,0.3-0.3,0.8,0,1.1l5.6,5.6c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2  l8.7-8.7l8.7,8.7c0.3,0.3,0.8,0.3,1.1,0l5.6-5.6C31.6,25.4,31.6,24.9,31.3,24.7z"
      />
      <text
        x="0"
        y="47"
        fill="#000000"
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        Created by Creative Stall
      </text>
      <text
        x="0"
        y="52"
        fill="#000000"
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        from the Noun Project
      </text>
    </svg>
  );
}

export default CancelSearchSvg;
