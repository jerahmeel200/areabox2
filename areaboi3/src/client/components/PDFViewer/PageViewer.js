import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Document, Page, pdfjs } from 'react-pdf';
import Loader from '../Loader';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PagePDFViewer = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const LoaderBox = () => <Loader color="#000" />;

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 480px)'
  });

  return (
    <>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={LoaderBox}>
        <Page pageNumber={pageNumber} width={isDesktopOrLaptop ? '' : '300'} />
      </Document>
      <div className="page-controls">
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          &lt;
        </button>
        <span>
          {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </span>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}>
          &gt;
        </button>
      </div>
      <style jsx>
        {`
          button {
            background: #3f51b5;
            color: white;
            border: none;
            padding: 5px 10px;
            width: 100px;
            cursor: pointer;
            box-shadow: 2px 2px 2px 1px #ccc;
          }

          .page-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 60%;
            position: absolute;
            bottom: 2%;
            left: 50%;
            background: white;
            opacity: 1;
            transform: translateX(-50%);
            transition: opacity ease-in-out 0.2s;
            box-shadow: 0 30px 40px 0 rgba(16, 36, 94, 0.2);
            border-radius: 4px;
          }

          .page-controls button:last-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }

          .page-controls button {
            width: 44px;
            height: 44px;
            background: white;
            border: 0;
            font: inherit;
            font-size: 0.8em;
            border-radius: 4px;
            color: black;
          }

          .page-controls span {
            font: inherit;
            font-size: 0.8em;
            padding: 0 0.5em;
          }
        `}
      </style>
    </>
  );
};

export default PagePDFViewer;
