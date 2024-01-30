import React from 'react';
import dynamic from 'next/dynamic';

const PageViewer = dynamic(() => import('./PageViewer'), { ssr: false });

export default function Pdf({ pdf }) {
  return (
    <div className="pdf-container">
      <PageViewer pdf={pdf} />

      <style jsx>
        {`
          .pdf-container {
            width: calc(100% - 10%);
            /* width: 100%; */
            max-width: 1110px;
            margin-bottom: 4em;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            justify-content: center;
            font-size: 1.2rem;
          }

          .pdf-container:hover .page-controls {
            opacity: 1;
          }

          .react-pdf__Page {
            /* overflow-x: scroll; */
          }

          .react-pdf__Page__textContent {
            width: 400px;
          }

          .react-pdf__Page__annotations.annotationLayer {
            padding: 20px;
          }

          .react-pdf__Page__canvas {
            margin: 0 auto;
          }

          .react-pdf__Document {
            border-radius: 8px;
            max-width: 100%;
            position: relative;
          }

          .react-pdf__Page:hover .page-controls {
            opacity: 1;
          }

          .react-pdf__Page {
            max-width: 400px;
            width: 90vw;
          }

          .react-pdf__Page__svg {
            width: auto !important;
            height: auto !important;
            border-radius: 8px;
          }

          .react-pdf__Page__textContent {
            border: 1px solid darkgrey;
            box-shadow: 5px 5px 5px 1px #ccc;
            border-radius: 5px;
          }

          /* For all pages */
          .all-page-container {
            height: 100%;
            max-height: 500px;
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
}
