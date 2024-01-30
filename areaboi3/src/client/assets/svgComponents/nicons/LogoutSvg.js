import React from 'react';

function LogoutSvg({ width, height, fill, className, style, onClick }) {
  const onclick = onClick || (() => {});
  return (
    <svg
      onclick={onclick}
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
      xmlSpace="preserve"
      id="svg250"
      sodipodiDocname="logout.svg"
      inkscapeVersion="0.92.4 (unknown)">
      <metadata id="metadata256">
        <rdfRDF>
          <ccWork rdfAbout="">
            <dcformat>image/svg+xml</dcformat>
            <dcType rdfResource="http://purl.org/dc/dcmitype/StillImage" />
          </ccWork>
        </rdfRDF>
      </metadata>
      <defs id="defs254" />
      <sodipodiNamedview
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1"
        objecttolerance="10"
        gridtolerance="10"
        guidetolerance="10"
        inkscapePageopacity="0"
        inkscapePageshadow="2"
        inkscapeWindowWidth="640"
        inkscapeWindowHeight="480"
        id="namedview252"
        showgrid="false"
        inkscapeZoom="5.9"
        inkscapeCx="16"
        inkscapeCy="20"
        inkscapeWindowX="0"
        inkscapeWindowY="0"
        inkscapeWindowMaximized="0"
        inkscapeCurrentLayer="svg250"
      />
      <g id="g244">
        <g id="g234">
          <rect
            x="-30.075001"
            y="15.2"
            width={width || '18.700001'}
            height={height || '1.5'}
            id="rect232"
            transform="scale(-1,1)"
            style="fill:#000000"
          />
        </g>
        <g id="g238">
          <path
            d="m 21.775001,25.3 8.9,-8.9 c 0.3,-0.3 0.3,-0.8 0,-1.1 l -8.9,-8.9 -1.1,1.1 8.3,8.3 -8.3,8.3 z"
            id="path236"
            inkscapeConnectorCurvature="0"
            style="fill:#000000"
          />
        </g>
        <g id="g242">
          <path
            fill="#000000"
            d="M23.7,31.2H3.9c-1.5,0-2.8-1.3-2.8-2.8V3.6c0-1.5,1.3-2.8,2.8-2.8h19.7c0.4,0,0.8,0.3,0.8,0.7    s-0.3,0.8-0.8,0.8H3.9c-0.7,0-1.3,0.6-1.3,1.3v24.9c0,0.7,0.6,1.3,1.3,1.3h19.7c0.4,0,0.8,0.3,0.8,0.8S24.1,31.2,23.7,31.2z"
            id="path240"
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
        id="text246">
        Created by Creative Stall
      </text>
      <text
        x="0"
        y="52"
        fill="#000000"
        fontSize="5px"
        fontWeight="bold"
        fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
        id="text248">
        from the Noun Project
      </text>
    </svg>
  );
}

export default LogoutSvg;
