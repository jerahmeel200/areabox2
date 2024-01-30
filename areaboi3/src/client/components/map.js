import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

//import L from 'leaflet';
//import {MapContainer, TileLayer} from 'react-leaflet';
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const mapp = (props) => {
  return (
    <>
      {console.log('mappppp', MapContainer)}
      <div className="map-cont leaflet-container">
        {
          <MapContainer
            center={[6.5244, 3.3792]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://api.mapbox.com/styles/v1/areaboi88/ciyqaexhk00412rp6heentn04/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXJlYWJvaTg4IiwiYSI6ImNrcmF0eDRvaDA0b3kybnBlbnplN2s2azQifQ.2QaD-7Qb4FG566_oebKIgg"
            />
          </MapContainer>
        }
      </div>
      <style jsx>{`
        .map-cont {
          min-height: 130px;
          width: 100vw;
          min-width: 360px;
          max-width: 768px;
          position: relative;
          margin: 5.6rem auto;
        }
        .leaflet-container {
          height: 100%;
        }
        .map-interact {
          position: absolute;
          bottom: 7px;
          right: 0px;
          z-index: 3;
          display: flex;
          justify-content: space-around;
          margin: 4px;
          color: white;
          cursor: pointer;
          z-index: 999;
        }
        .get-directions {
          border: 0.5px solid #ffffff;
          font-size: 0.625rem;
          margin-left: 13px;
          text-align: center;
          padding: 4px;
        }
        .view_channels {
          position: relative;
          top: 5px;
        }
      `}</style>
    </>
  );
};

export default mapp;
