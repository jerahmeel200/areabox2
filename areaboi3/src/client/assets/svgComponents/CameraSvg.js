import React from 'react';

function CameraSvg({ fill }) {
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
        <path d="M16,12.2c-3.5,0-6.3,2.8-6.3,6.3c0,3.5,2.8,6.3,6.3,6.3c3.5,0,6.3-2.8,6.3-6.3C22.3,15,19.5,12.2,16,12.2z" />
        <path d="M27.7,7.5h-3.4c-0.9,0-1.7-0.5-2.1-1.4l-0.7-1.7C21,3,19.6,2.1,18.1,2.1h-4.2c-1.5,0-2.9,0.9-3.5,2.3L9.7,6.1   C9.4,6.9,8.6,7.5,7.7,7.5H4.3c-2.1,0-3.8,1.7-3.8,3.8v14.9c0,2.1,1.7,3.8,3.8,3.8h23.5c2.1,0,3.8-1.7,3.8-3.8V11.2   C31.5,9.2,29.8,7.5,27.7,7.5z M16,26.2c-4.3,0-7.8-3.5-7.8-7.8c0-4.3,3.5-7.8,7.8-7.8c4.3,0,7.8,3.5,7.8,7.8   C23.8,22.7,20.3,26.2,16,26.2z" />
      </g>
      <text
        x="0"
        y="47"
        fill={fill || '#000000'}
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        Created by Creative Stall
      </text>
      <text
        x="0"
        y="52"
        fill={fill || '#000000'}
        fontSize="5px"
        font-weight="bold"
        font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        from the Noun Project
      </text>
    </svg>
  );
}

export default CameraSvg;
