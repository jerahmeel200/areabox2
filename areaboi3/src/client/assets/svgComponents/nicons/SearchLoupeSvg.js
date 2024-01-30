import React from 'react';

function SearchLoupeSvg({ width, height, fill, className, style, onClick }) {
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
      onClick={onclick}
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 32 40"
      enableBackground="new 0 0 32 32"
      xml:space="preserve">
      <path
        fill="#ffffff"
        d="M28.3,3.7c-2.1-2.1-4.8-3.2-7.7-3.2c-2.9,0-5.6,1.1-7.7,3.2c-4.1,4.1-4.2,10.5-0.5,14.8L10,21c-1.1-0.6-2.5-0.4-3.4,0.4  l-5.3,5.3c-1.1,1.1-1.1,2.9,0,4c0.5,0.5,1.2,0.8,2,0.8c0.8,0,1.5-0.3,2-0.8l5.3-5.3c0.5-0.5,0.8-1.2,0.8-2c0-0.5-0.1-1-0.4-1.4  l2.4-2.4c2,1.7,4.5,2.7,7.1,2.7c2.9,0,5.6-1.1,7.7-3.2C32.6,14.8,32.6,7.9,28.3,3.7z M25.4,16.2c-2.7,2.7-7,2.7-9.6,0  c-2.7-2.7-2.7-7,0-9.6c2.7-2.7,7-2.7,9.6,0S28.1,13.5,25.4,16.2z"
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

export default SearchLoupeSvg;
