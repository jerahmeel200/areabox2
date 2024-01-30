import React from 'react';

function LandscapePhotoSvg({ width, height, fill }) {
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
        <circle cx="9" cy="8" r="1.8" />
        <path
          fill="none"
          d="M9,11.4c1.9,0,3.4-1.5,3.4-3.4S10.9,4.7,9,4.7S5.7,6.2,5.7,8S7.2,11.4,9,11.4z"
        />
        <path d="M0.5,25.8v3.9c0,1,0.8,1.8,1.8,1.8h27.4c1,0,1.8-0.8,1.8-1.8v-3.9h-19H0.5z" />
        <path d="M6.5,17.5l4,4.3L22.8,7.5c0.7-0.8,2-0.8,2.7,0l6,7V2.3c0-1-0.8-1.8-1.8-1.8H2.3c-1,0-1.8,0.8-1.8,1.8v18.6l3.2-3.4   C4.4,16.7,5.8,16.7,6.5,17.5z M9,4.7c1.9,0,3.4,1.5,3.4,3.4s-1.5,3.4-3.4,3.4S5.7,9.9,5.7,8S7.2,4.7,9,4.7z" />
      </g>
      <text
        x="0"
        y="47"
        fill="#000000"
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        {' '}
      </text>
      <text
        x="0"
        y="52"
        fill="#000000"
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        {' '}
      </text>
    </svg>
  );
}

export default LandscapePhotoSvg;
