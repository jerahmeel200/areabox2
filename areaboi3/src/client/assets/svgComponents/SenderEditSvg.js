import React from 'react';

function SenderEditSvg({ width, height, fill }) {
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
      <path
        fill={fill || '#ca96ff'}
        d="M30,15.9h-6.7c-0.4-2.5,0-5.3,1.2-7.8c1.1-2.4,2.7-4.5,5-6.2c0.3-0.2,0.4-0.5,0.3-0.8c-0.1-0.3-0.4-0.5-0.7-0.5l-0.3,0  C23.2,0.5,17.4,3,13,7.3c-2.5,2.5-4.5,5.4-5.9,8.7H2c-0.3,0-0.6,0.2-0.7,0.5c-0.1,0.3-0.1,0.6,0.2,0.8l14,14  c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2l14-14c0.2-0.2,0.3-0.5,0.2-0.8C30.6,16.1,30.4,15.9,30,15.9z"
      />
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
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        from the Noun Project
      </text>
    </svg>
  );
}

export default SenderEditSvg;
