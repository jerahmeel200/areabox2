import React from 'react';

function LoginWSvg({ width, height, fill, className, style, onClick }) {
  const width = width || '';
  const height = height || '';
  const fill = fill || '';
  const className = className || '';
  const style = style || {};
  const onclick = onClick || (() => {});
  return (
    <>
      <svg
        width={width || ''}
        height={height}
        fill={fill}
        className={className}
        onClick={onclick}
        xmlnsDc="http://purl.org/dc/elements/1.1/"
        xmlnsCc="http://creativecommons.org/ns#"
        xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlnsSvg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsSodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlnsInkscape="http://www.inkscape.org/namespaces/inkscape"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 32 40"
        enableBackground="new 0 0 32 32"
        xml:space="preserve"
        id="svg5004"
        sodipodiDocname="login-w.svg"
        inkscapeVersion="0.92.4 (unknown)">
        <metadata id="metadata5010">
          <rdf:RDF>
            <cc:Work rdfAbout="">
              <dc:format>image/svg+xml</dc:format>
              <dc:type rdfResource="http://purl.org/dc/dcmitype/StillImage" />
              <dc:title />
            </cc:Work>
          </rdf:RDF>
        </metadata>
        <defs id="defs5008" />
        <sodipodi:namedview
          pagecolor="#ffffff"
          bordercolor="#666666"
          borderopacity="1"
          objecttolerance="10"
          gridtolerance="10"
          guidetolerance="10"
          inkscapePageopacity="0"
          inkscapePageshadow="2"
          inkscapeWindowWidth="1100"
          inkscapeWindowHeight="627"
          id="namedview5006"
          showgrid="false"
          inkscapeZoom="5.9"
          inkscapeCx="-4.3389831"
          inkscapeCy="20"
          inkscapeWindowX="0"
          inkscapeWindowY="0"
          inkscapeWindowMaximized="0"
          inkscapeCurrentLayer="svg5004"
        />
        <g id="g4998" style="fill:#ffffe1;fill-opacity:1">
          <g id="g4988" style="fill:#ffffe1;fill-opacity:1">
            <rect
              x="12.2"
              y="15.2"
              fill="#000000"
              width="18.7"
              height="1.5"
              id="rect4986"
              style="fill:#ffffe1;fill-opacity:1"
            />
          </g>
          <g id="g4992" style="fill:#ffffe1;fill-opacity:1">
            <path
              fill="#000000"
              d="M20.5,25.3l-8.9-8.9c-0.3-0.3-0.3-0.8,0-1.1l8.9-8.9l1.1,1.1l-8.3,8.3l8.3,8.3L20.5,25.3z"
              id="path4990"
              style="fill:#ffffe1;fill-opacity:1"
            />
          </g>
          <g id="g4996" style="fill:#ffffe1;fill-opacity:1">
            <path
              fill="#000000"
              d="M23.7,31.2H3.9c-1.5,0-2.8-1.3-2.8-2.8V3.6c0-1.5,1.3-2.8,2.8-2.8h19.7c0.4,0,0.8,0.3,0.8,0.7    s-0.3,0.8-0.8,0.8H3.9c-0.7,0-1.3,0.6-1.3,1.3v24.9c0,0.7,0.6,1.3,1.3,1.3h19.7c0.4,0,0.8,0.3,0.8,0.8S24.1,31.2,23.7,31.2z"
              id="path4994"
              style="fill:#ffffe1;fill-opacity:1"
            />
          </g>
        </g>
        <text
          x="0"
          y="47"
          fill="#000000"
          fontSize="5px"
          fontWeight="bold"
          fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
          id="text5000">
          Created by Creative Stall
        </text>

        <text
          x="0"
          y="52"
          fill="#000000"
          fontSize="5px"
          fontWeight="bold"
          fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
          id="text5002">
          from the Noun Project
        </text>
      </svg>
    </>
  );
}

export default LoginWSvg;
