import React from 'react';

function LogoutWSvg({ width, height, fill, className, style, onClick }) {
  const width = width || '';
  const height = height || '';
  const fill = fill || '';
  const className = className || '';
  const style = style || {};
  const onclick = onClick || (() => {});
  return (
    <svg
      onclick={onclick}
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 32 40"
      enableBackground="new 0 0 32 32"
      xml:space="preserve"
      id="svg250"
      sodipodi:docname="logout-w.svg"
      inkscape:version="0.92.4 (unknown)">
      <metadata id="metadata256">
        <rdf:RDF>
          <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title></dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <defs id="defs254" />
      <sodipodi:namedview
        pagecolor="#ffffff"
        bordercolor="#666666"
        borderopacity="1"
        objecttolerance="10"
        gridtolerance="10"
        guidetolerance="10"
        inkscape:pageopacity="0"
        inkscape:pageshadow="2"
        inkscape:windowWidth="1260"
        inkscape:windowHeight="659"
        id="namedview252"
        showgrid="false"
        inkscape:zoom="5.9"
        inkscape:cx="-12.135593"
        inkscape:cy="20"
        inkscape:windowX="0"
        inkscape:windowY="0"
        inkscape:windowMaximized="0"
        inkscape:currentLayer="svg250"
      />
      <g id="g244" style="fill:#ffff00;fill-opacity:1">
        <g id="g234" style="fill:#ffff00;fill-opacity:1">
          <rect
            x="-30.075001"
            y="15.2"
            width="18.700001"
            height="1.5"
            id="rect232"
            transform="scale(-1,1)"
            style="fill:#ffff00;fill-opacity:1"
          />
        </g>
        <g id="g238" style="fill:#ffff00;fill-opacity:1">
          <path
            d="m 21.775001,25.3 8.9,-8.9 c 0.3,-0.3 0.3,-0.8 0,-1.1 l -8.9,-8.9 -1.1,1.1 8.3,8.3 -8.3,8.3 z"
            id="path236"
            inkscape:connectorCurvature="0"
            style="fill:#ffff00;fill-opacity:1"
          />
        </g>
        <g id="g242" style="fill:#ffff00;fill-opacity:1">
          <path
            fill="#000000"
            d="M23.7,31.2H3.9c-1.5,0-2.8-1.3-2.8-2.8V3.6c0-1.5,1.3-2.8,2.8-2.8h19.7c0.4,0,0.8,0.3,0.8,0.7    s-0.3,0.8-0.8,0.8H3.9c-0.7,0-1.3,0.6-1.3,1.3v24.9c0,0.7,0.6,1.3,1.3,1.3h19.7c0.4,0,0.8,0.3,0.8,0.8S24.1,31.2,23.7,31.2z"
            id="path240"
            style="fill:#ffff00;fill-opacity:1"
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

export default LogoutWSvg;
