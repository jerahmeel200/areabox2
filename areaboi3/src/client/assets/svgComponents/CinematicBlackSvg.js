import React from 'react';

function CinematicBlackSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '10'}
      height={height || '10'}
      viewBox="0 0 10 10"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.06452 0H0.354839C0.16129 0 0 0.16129 0 0.354839V1.64516H2.06452V0Z"
        fill={fill || 'black'}
      />
      <path
        d="M0.354839 10H2.06452V8.35484H0V9.64517C0 9.83871 0.16129 10 0.354839 10Z"
        fill={fill || 'black'}
      />
      <path d="M7.35484 0H5.25806V1.64516H7.35484V0Z" fill={fill || 'black'} />
      <path
        d="M4.70967 8.35484H2.6129V10H4.70967V8.35484Z"
        fill={fill || 'black'}
      />
      <path d="M4.70967 0H2.6129V1.64516H4.70967V0Z" fill={fill || 'black'} />
      <path
        d="M0 7.80645H10V2.19354H0V7.80645ZM3.35484 3.45161C3.35484 3.09677 3.64516 2.80645 4 2.80645C4.12903 2.80645 4.25806 2.8387 4.3871 2.93548L6.3871 4.48386C6.54839 4.6129 6.64516 4.77419 6.64516 4.99999C6.64516 5.2258 6.54839 5.38709 6.3871 5.51612L4.3871 7.06451C4.29032 7.16128 4.12903 7.19354 4 7.19354C3.64516 7.19354 3.35484 6.90322 3.35484 6.54838V3.45161Z"
        fill={fill || 'black'}
      />
      <path
        d="M7.93549 1.64516H10V0.354839C10 0.16129 9.83871 0 9.64516 0H7.93549V1.64516Z"
        fill={fill || 'black'}
      />
      <path
        d="M7.35484 8.35484H5.25806V10H7.35484V8.35484Z"
        fill={fill || 'black'}
      />
      <path
        d="M7.93549 10H9.64516C9.83871 10 10 9.83871 10 9.64517V8.35484H7.93549V10Z"
        fill={fill || 'black'}
      />
    </svg>
  );
}

export default CinematicBlackSvg;
