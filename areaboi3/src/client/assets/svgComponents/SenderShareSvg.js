import React from 'react';

function SenderShareSvg({ width, height, fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 32 40"
      enableBackground="new 0 0 32 32"
      xml:space="preserve">
      <g>
        <path
          fill={fill || '#ca96ff'}
          d="M25,21.5V10.5c2.4-0.4,4.3-2.5,4.3-5c0-2.8-2.3-5.1-5.1-5.1c-2.8,0-5.1,2.3-5.1,5.1c0,2.5,1.9,4.6,4.3,5v10.9   c-1.2,0.2-2.2,0.7-3,1.6L12,18.7c0.5-0.8,0.8-1.7,0.8-2.7c0-2.8-2.3-5.1-5.1-5.1c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1   c1.2,0,2.3-0.4,3.2-1.2l8.8,4.4c-0.3,0.6-0.5,1.4-0.5,2.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1   C29.3,23.9,27.4,21.8,25,21.5z"
        />
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

export default SenderShareSvg;
