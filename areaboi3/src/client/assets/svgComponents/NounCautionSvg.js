import React from 'react';

function NounCautionSvg({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      dataName="Layer 1"
      viewBox="0 0 100 125"
      x="0px"
      y="0px">
      <title>A</title>
      <path d="M60.527,15.49463a12.15593,12.15593,0,0,0-21.054,0L6.64813,72.34967a12.15567,12.15567,0,0,0,10.527,18.233H82.82489a12.15567,12.15567,0,0,0,10.527-18.233ZM50,80.73773A4.68875,4.68875,0,1,1,54.68878,76.049,4.68873,4.68873,0,0,1,50,80.73773Zm6.61993-47.04632-1.656,28.15283a4.97269,4.97269,0,0,1-9.92822,0L43.37964,33.69141a6.63159,6.63159,0,1,1,13.24029,0Z" />
      <text
        x="0"
        y="115"
        fill={fill || '#000000'}
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        {' '}
      </text>
      <text
        x="0"
        y="120"
        fill={fill || '#000000'}
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
        {' '}
      </text>
    </svg>
  );
}

export default NounCautionSvg;
