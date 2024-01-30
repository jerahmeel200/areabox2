import React from 'react';

function CommentSvg({ width, height, fill }) {
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
          fill={fill || '#a8a4ff'}
          d="M12.1,17.4c0-2,1.6-3.6,3.6-3.6h11.4V3.3c0-1.5-1.2-2.8-2.7-2.8H3.2c-1.5,0-2.7,1.2-2.7,2.8v13.2c0,1.5,1.2,2.8,2.7,2.8   h1.4v4.5c0,0.3,0.2,0.6,0.5,0.7c0.1,0,0.2,0.1,0.3,0.1c0.2,0,0.4-0.1,0.5-0.2l4.9-5h1.3V17.4z"
        />
        <path
          fill={fill || '#a8a4ff'}
          d="M29.5,15.3H15.7c-1.1,0-2,0.9-2,2.1V26c0,1.1,0.9,2.1,2,2.1h8.7l3.1,3.2c0.1,0.2,0.3,0.2,0.5,0.2c0.1,0,0.2,0,0.3-0.1   c0.3-0.1,0.5-0.4,0.5-0.7v-2.7h0.7c1.1,0,2-0.9,2-2.1v-8.6C31.5,16.2,30.6,15.3,29.5,15.3z"
        />
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
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        from the Noun Project
      </text>
    </svg>
  );
}

export default CommentSvg;
