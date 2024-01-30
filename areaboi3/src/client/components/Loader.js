import React from 'react';

const Loader = ({ color }) => {
  return (
    <div id="loading">
      <span className="loader">
        <span className="loader-inner"></span>
      </span>

      <style jsx>{`
        #loading {
          text-align: center;
          height: 80px;
          margin-top: -50px;
        }

        .loader {
          display: inline-block;
          width: 30px;
          height: 30px;
          position: relative;
          border: 4px solid ${color ? color : '#fff'};
          top: 50%;
          animation: loader 2s infinite ease;
        }

        .loader-inner {
          vertical-align: top;
          display: inline-block;
          width: 100%;
          background-color: ${color ? color : '#fff'};
          animation: loader-inner 2s infinite ease-in;
        }

        @keyframes loader {
          0% {
            transform: rotate(0deg);
          }

          25% {
            transform: rotate(180deg);
          }

          50% {
            transform: rotate(180deg);
          }

          75% {
            transform: rotate(360deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes loader-inner {
          0% {
            height: 0%;
          }

          25% {
            height: 0%;
          }

          50% {
            height: 100%;
          }

          75% {
            height: 100%;
          }

          100% {
            height: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
