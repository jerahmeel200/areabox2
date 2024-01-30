import React from 'react';
import Head from 'next/head';
// import { Head } from "next/document";

const ReactionStyles = () => (
  <header className="layout-header">
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1, maximum-scale=1, width=device-width, minimal-ui"
      />
      <style>{`

        .emoji-mart {
          z-index: 999 !important;
        }
        
        .emoji-mart-anchors {
          display: none !important;
        }
        
        .emoji-mart-search {
          display: none !important;
        }
        
        .reactions .emoji-mart-bar {
          display: none !important;
        }
        
        .emoji-mart-scroll {
          overflow: auto !important;
          // height: auto;
          height: 50px !important;
        }
        
        .emoji-mart-category-label {
          display: none !important;
        }

        .emoji-mart-preview {
          height: 50px !important;
        }
      `}</style>
    </Head>
  </header>
);

export default ReactionStyles;
