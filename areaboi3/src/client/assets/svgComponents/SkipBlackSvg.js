import React from 'react';

function SkipBlackSvg({ width, height, fill }) {
  return (
    <svg
      width={width || '12'}
      height={height || '10'}
      viewBox="0 0 12 10"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.15815 0.179623C0.835582 -0.107103 0.333811 -0.0354215 0.118766 0.287146C0.0112436 0.50219 -0.0245972 0.717235 0.0470844 0.93228L1.65992 4.94645C1.65992 4.98229 1.65992 4.98229 1.65992 5.01813L0.0470844 9.0323C-0.0245972 9.24734 -0.0245972 9.46239 0.118766 9.67743C0.262129 9.85664 0.477174 10 0.692219 10C0.871423 10 1.01479 9.92832 1.12231 9.8208L6.06834 5.5199C6.2117 5.37654 6.31922 5.19733 6.31922 5.01813C6.31922 4.80308 6.24754 4.62388 6.06834 4.51636L1.15815 0.179623Z"
        fill={fill || 'black'}
      />
      <path
        d="M10.871 4.48052L7.60949 1.6491C7.32277 1.39821 6.821 1.46989 6.60595 1.79246C6.46259 1.97166 6.46259 2.22255 6.53427 2.43759L7.53781 4.98229C7.53781 5.01813 7.53781 5.01813 7.53781 5.05397L6.53427 7.59867C6.46259 7.81371 6.46259 8.02876 6.60595 8.2438C6.74932 8.42301 6.96436 8.56637 7.1794 8.56637C7.35861 8.56637 7.50197 8.49469 7.60949 8.38716L10.871 5.55574C11.0144 5.41238 11.1219 5.23317 11.1219 5.05397C11.1219 4.76724 11.0502 4.58804 10.871 4.48052Z"
        fill={fill || 'black'}
      />
    </svg>
  );
}

export default SkipBlackSvg;