import React from 'react';

function LoginSvg({ width, height, fill, className, style, onClick }) {
  const onclick = onClick || (() => {});
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill={fill || ''}
      className={className || ''}
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 32 40"
      enableBackground="new 0 0 32 32"
      xmlSpace="preserve">
      <g>
        <g>
          <rect
            x="12.2"
            y="15.2"
            fill="#000000"
            width={width || '18.7'}
            height={height || '1.5'}
          />
        </g>
        <g>
          <path
            fill="#000000"
            d="M20.5,25.3l-8.9-8.9c-0.3-0.3-0.3-0.8,0-1.1l8.9-8.9l1.1,1.1l-8.3,8.3l8.3,8.3L20.5,25.3z"
          />
        </g>
        <g>
          <path
            fill="#000000"
            d="M23.7,31.2H3.9c-1.5,0-2.8-1.3-2.8-2.8V3.6c0-1.5,1.3-2.8,2.8-2.8h19.7c0.4,0,0.8,0.3,0.8,0.7    s-0.3,0.8-0.8,0.8H3.9c-0.7,0-1.3,0.6-1.3,1.3v24.9c0,0.7,0.6,1.3,1.3,1.3h19.7c0.4,0,0.8,0.3,0.8,0.8S24.1,31.2,23.7,31.2z"
          />
        </g>
      </g>
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

export default LoginSvg;
