import React from 'react';

function NairaSvg({ currency, onClick }) {
  return (
    <svg
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.39808 3.56462V2.5417H8.53819V0.000127795H7.51526V2.5417H4.08618L1.88281 0.0126588V0H0.859892V2.54157H0V3.56449H0.859892V4.45955H0V5.48247H0.859892V7.99987H1.88281V5.48259H5.30729L7.50874 8L7.51539 7.9977V8H8.53831V5.48259H9.3982V4.45967H8.53831V3.56462H9.39808ZM1.88281 1.5666L2.73542 2.5417H1.88281V1.5666ZM1.88281 4.45967V3.56462H3.63009L4.41275 4.45967H1.88281ZM7.51526 6.47751L6.64834 5.48259H7.51526V6.47751ZM7.51526 4.45967H5.75712L4.97727 3.56462H7.51526V4.45967Z"
        fill="black"
        fillOpacity={currency === 'naira' ? '1' : '0.5'}
      />
    </svg>
  );
}

export default NairaSvg;
