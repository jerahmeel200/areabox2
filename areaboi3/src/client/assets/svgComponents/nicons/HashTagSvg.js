import React from 'react';

function HashTagSvg({ width, height, fill, className, style, onClick }) {
  const onclick = onClick || (() => {});
  return (
    <svg
      width={width || ''}
      height={height}
      fill={fill}
      className={className}
      onClick={onclick}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 16 20"
      style="enable-background:new 0 0 16 16;"
      xmlSpace="preserve">
      <path d="M15,7V5h-2.446l1.108-3.324L11.766,1l-1.319,4H8.054l1.108-3.324L7.265,1L5.946,5H2v2h3.279L4.612,9H1v2h2.946l-1.108,3.324  L4.735,15l1.319-4h2.392l-1.108,3.324L9.235,15l1.319-4H14V9h-2.779l0.667-2H15z M9.113,9H6.721l0.667-2H9.78L9.113,9z" />
      <text
        x="0"
        y="31"
        fill="#FFFFFF"
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        {' '}
      </text>
      <text
        x="0"
        y="36"
        fill="#FFFFFF"
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        {' '}
      </text>
    </svg>
  );
}

export default HashTagSvg;
