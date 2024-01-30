import React from 'react';

const areaboiHelp = ({ message }) => {
  return (
    <div className="areaboi-help">
      <div className="areaboi-card-image">
        <img
          src="static/img/areaboi.svg"
          alt="areaboi"
          width="30px"
          height="38px"
        />
      </div>
      <div className="areaboi-card-help-info">{message}</div>

      <style jsx>
        {`
        .areaboi-help {
          display: flex;
          font-family: "Noto Sans JP", sans-serif;
          margin-bottom: 9px;
          width: 100vw;
          min-width: 360px;
          max-width: 768px;
        }

        .areaboi-card-help-info {
          background: #1505cc;
          color: #ffffff;
          font-size: 0.75rem;
          border-bottom: 12px solid #0b0061;
          padding: 8px 16px;
          width:100%;
        `}
      </style>
    </div>
  );
};
export default areaboiHelp;
