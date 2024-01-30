import React from 'react';
import dynamic from 'next/dynamic';

import { isUriVideo, isUriGif, isUriAudio, isUriImage, isUriPdf } from '../lib';

const PDFViewer = dynamic(() => import('./PDFViewer'), { ssr: false });
const RenderMedia = ({ media }) => {
  if (isUriVideo(media)) {
    return (
      <video className="media" controls preload="none">
        <source src={media} type={`video/${media.split('.').pop()}`}></source>
      </video>
    );
  }

  if (isUriAudio(media)) {
    return (
      <audio className="media-audio" controls>
        <source src={media} />
      </audio>
    );
  }

  if (isUriImage(media) || isUriGif(media)) {
    return <img className="media" loading="lazy" src={media} />;
  }

  if (isUriPdf(media)) {
    const allowOrigin = 'https://cors-anywhere.herokuapp.com/';
    return <PDFViewer pdf={`${allowOrigin}${media}`} />;
  }
};

export default RenderMedia;
