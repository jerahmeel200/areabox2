import React from 'react';

function CinematicSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '23'}
      height={height || '23'}
      viewBox="0 0 23 23"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.74839 0H0.816129C0.370968 0 0 0.370968 0 0.816129V3.78387H4.74839V0Z"
        fill={fill || 'white'}
      />
      <path
        d="M0.816129 23H4.74839V19.2161H0V22.1838C0 22.629 0.370968 23 0.816129 23Z"
        fill={fill || 'white'}
      />
      <path d="M16.9161 0H12.0935V3.78387H16.9161V0Z" fill={fill || 'white'} />
      <path
        d="M10.8323 19.2161H6.00968V23H10.8323V19.2161Z"
        fill={fill || 'white'}
      />
      <path d="M10.8323 0H6.00968V3.78387H10.8323V0Z" fill={fill || 'white'} />
      <path
        d="M0 17.9548H23V5.04514H0V17.9548ZM7.71613 7.93868C7.71613 7.12255 8.38387 6.45481 9.2 6.45481C9.49677 6.45481 9.79355 6.52901 10.0903 6.75159L14.6903 10.3129C15.0613 10.6097 15.2839 10.9806 15.2839 11.5C15.2839 12.0193 15.0613 12.3903 14.6903 12.6871L10.0903 16.2484C9.86774 16.4709 9.49677 16.5451 9.2 16.5451C8.38387 16.5451 7.71613 15.8774 7.71613 15.0613V7.93868Z"
        fill={fill || 'white'}
      />
      <path
        d="M18.2516 3.78387H23V0.816129C23 0.370968 22.629 0 22.1839 0H18.2516V3.78387Z"
        fill={fill || 'white'}
      />
      <path
        d="M16.9161 19.2161H12.0935V23H16.9161V19.2161Z"
        fill={fill || 'white'}
      />
      <path
        d="M18.2516 23H22.1839C22.629 23 23 22.629 23 22.1838V19.2161H18.2516V23Z"
        fill={fill || 'white'}
      />
    </svg>
  );
}

export default CinematicSvg;
