import React from 'react';

function CashOutIconSvg({ width, height, fill, className, style, onClick }) {
  const onclick = onClick || (() => {});
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      className={className}
      style={style || ''}
      onClick={onclick}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.3468 2.63998V24H2.6532V2.63998H3.8556V22.7976H20.142V2.63998H21.3468Z"
        fill="white"
      />
      <path
        d="M13.7887 11.52H14.9916V9.936H16.2694V8.73191H14.9916V7.14887L12.5772 7.14839H11.3743V7.14887H11.3703L11.3731 10.3166H10.2125L10.2154 7.14887L9.01249 7.14767L9.01105 8.57256H7.73065V9.77663H9.00985L9.00841 11.5195H12.5772V8.35175H13.7887V11.52Z"
        fill="white"
      />
      <path
        d="M12 16.9287C12.4429 16.9287 12.802 16.5696 12.802 16.1267C12.802 15.6837 12.4429 15.3247 12 15.3247C11.5571 15.3247 11.198 15.6837 11.198 16.1267C11.198 16.5696 11.5571 16.9287 12 16.9287Z"
        fill="white"
      />
      <path d="M24 0V4.44H22.8V1.2H1.2V4.44H0V0H24Z" fill="white" />
    </svg>
  );
}

export default CashOutIconSvg;
