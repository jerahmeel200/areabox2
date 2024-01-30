import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {
  query as queryD,
  get,
  ref as refD,
  orderByChild,
  onValue
} from 'firebase/database';
import { FirebaseDatabase } from '../../settings/firebase.js';

//import {MapContainer, TileLayer} from "react-leaflet"

import Link from 'next/link';
import Header from '../../components/Header';
import AreaboiHelp from '../../components/AreaboiHelp';
import Footer from '../../components/Footer_Black.js';
import Map from '../../components/map';
//const Map= dynamic(()=>import('../../components/map'), {ssr:false})

export default class Metro extends React.Component {
  static async getInitialProps({ store, pathname, query, isServer }) {
    console.log('Metro getInitialProps');

    const gChatRef = FirebaseDatabase;
    const ref = refD(gChatRef, 'metro');
    const queryM = queryD(ref, orderByChild('n'));

    //for now manual data setting at
    //https://console.firebase.google.com/project/areabox-chat/database/areabox-chat/data/~2Fmetro
    return new Promise((resolve) => {
      onValue(queryM, function (dataSnapshot) {
        const channels = [];
        dataSnapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val();
          item.key = childSnapshot.key;

          if (!item.is_private) channels.push(item);
        });

        resolve({ channels, test: { store, pathname, query, isServer } });
      });
    });
  }
  constructor(props) {
    super(props);
    console.log('Metro constructor ');
  }

  render() {
    const { channels } = this.props;
    console.log(this.props.test);
    console.log(channels);
    return (
      <div className="metrobody">
        <Header
          subHeader={
            <>
              <div>
                <img
                  className="blue-star"
                  src="static/img/blue-star.svg"
                  alt="symbol"
                />
              </div>
              <div className="title">
                <span>METRO - LAGOS</span>
              </div>
              <div className="arrows">
                <img src="static/img/arrows.svg" />
              </div>
            </>
          }
        />

        <section className="metro-body">
          <Map />

          {/*
        <div className="map-interact">
                <img className="view_channels" src="static/img/metro-bus.svg" width="25px" height="18px" />
                <p className="get-directions">GET DIRECTIONS</p>
              </div> */}
          {channels.map((channel, i) => {
            let channel_key = channel.key;
            let tags_sorted =
              channel.tags &&
              Object.keys(channel.tags).sort(
                (a, b) => channel.tags[a] < channel.tags[b]
              );

            if (channel.help)
              return (
                <AreaboiHelp
                  key="AreaboiHelp"
                  message={`Can't find something in your area? Ask @areaboi to help you search for it in other parts of the city.`}
                />
              );
            if (!channel.promoted)
              return (
                <div
                  key={channel.key}
                  className={`metro-card ${channel.key}`}
                  style={{
                    flexDirection: i % 2 === 0 ? 'row-reverse' : ''
                  }}>
                  <Link
                    key={channel.key}
                    href={
                      '/?rk=' +
                      encodeURIComponent(channel_key) +
                      '&rt=' +
                      encodeURIComponent(channel.title)
                    }>
                    <div className="metro-card-image">
                      <img
                        src={`static/img/${channel.key}-image.png`}
                        alt={channel.key}
                        width="72px"
                        height="72px"
                      />
                    </div>
                  </Link>
                  <div className="metro-card-info">
                    <Link
                      key={channel.key}
                      href={
                        '/?rk=' +
                        encodeURIComponent(channel_key) +
                        '&rt=' +
                        encodeURIComponent(channel.title)
                      }>
                      <span>
                        <p className="metro-card-title">
                          {channel_key === 'covid19' && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              data-name="Layer 1"
                              viewBox="0 0 100 125"
                              x="0px"
                              y="0px"
                              style={{
                                fill: '#FF1800',
                                width: '13.19px',
                                height: '12px'
                              }}>
                              <title>A</title>
                              <path d="M60.527,15.49463a12.15593,12.15593,0,0,0-21.054,0L6.64813,72.34967a12.15567,12.15567,0,0,0,10.527,18.233H82.82489a12.15567,12.15567,0,0,0,10.527-18.233ZM50,80.73773A4.68875,4.68875,0,1,1,54.68878,76.049,4.68873,4.68873,0,0,1,50,80.73773Zm6.61993-47.04632-1.656,28.15283a4.97269,4.97269,0,0,1-9.92822,0L43.37964,33.69141a6.63159,6.63159,0,1,1,13.24029,0Z" />
                              <text
                                x="0"
                                y="115"
                                fill="#000000"
                                fontSize="5px"
                                fontWeight="bold"
                                fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
                                {' '}
                              </text>
                              <text
                                x="0"
                                y="120"
                                fill="#000000"
                                fontSize="5px"
                                fontweight="bold"
                                fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">
                                {' '}
                              </text>
                            </svg>
                          )}{' '}
                          {channel.title}
                        </p>
                        <p className="metro-card-subtitle">
                          {channel.subtitle || ''}
                        </p>
                      </span>
                    </Link>
                    <div className="metro-card-tags-container">
                      {channel.tags &&
                        tags_sorted.map(function (tag) {
                          return (
                            <Link
                              key={tag}
                              href={`/?tag=${tag}&rk=${channel.key}`}>
                              <span className="metro-card-tag">
                                {channel.tags[tag].split('-')[1]}
                              </span>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            if (channel.promoted)
              return (
                <div key={channel.key} className="metro-card-promotions">
                  <div className="metro-card-info">
                    <Link
                      key={channel.key}
                      href={
                        '/?rk=' +
                        encodeURIComponent(channel_key) +
                        '&rt=' +
                        encodeURIComponent(channel.title)
                      }>
                      <p className="metro-card-title">{channel.title}</p>
                    </Link>
                    <div className="metro-promotions-horizontal-line"></div>
                    <div className="metro-card-tags-container">
                      {channel.tags &&
                        tags_sorted.map((tag) => {
                          <Link
                            key={tag}
                            href={`/?tag=${tag}&rk=${channel.key}`}>
                            <span className="metro-card-promotions-tag">
                              {channel.tags[tag].split('-')[1]}
                            </span>
                          </Link>;
                        })}
                    </div>
                  </div>
                </div>
              );
          })}
        </section>
        <Footer
          cont={[
            { text: 'my channels', url: '' },
            { text: 'radio', url: '/?rk=Radio' },
            { text: 'school', url: '/?rk=basicSchool' },
            { text: 'cinema', url: '/?rk=Cinema' }
            // { text: "forsale", url: "/?rk=for-sale" },
          ]}
        />
        <style jsx>
          {`
            body,
            html {
              height: 100%;
            }

            p {
              margin: 0;
              padding: 0;
            }

            .channels_icon {
              top: 60px;
            }

            .metro-lagos {
              color: white;
            }

            .metro-body {
              padding-top: 2px;
              display: grid;
              background: rgba(206, 209, 229, 0.1);
              margin: 0 auto;
              width: 100vw;
              min-width: 360px;
              max-width: 768px;
            }

            .metro-map {
              height: 86px;
              margin-bottom: 14px;
              width: 100vw;
              min-width: 360px;
              max-width: 768px;
              position: relative;
            }
            .metro-map img[alt='map'] {
              width: 100%;
              height: 86px;
              object-fit: cover;
            }
            .map-interact {
              position: absolute;
              bottom: 0px;
              right: 0px;
              z-index: 3;
              display: flex;
              justify-content: space-around;
              margin: 4px;
              color: white;
              cursor: pointer;
            }

            .metro-card {
              display: flex;
              align-items: center;
              background: #ffffff;
              border: 1px solid rgba(0, 0, 0, 0.4);
              min-height: 4.825rem;
              margin: 3px 5px 7px 5px;
              padding: 3.5px 4px;
              width: 100vw;
              min-width: 360px;
              max-width: 768px;
              justify-content: space-between;
            }

            .events {
              margin-top: 6rem;
            }

            .metro-card-info {
              font-size: 0.625rem;
            }

            .metro-card-title,
            .metro-card-subtitle {
              font-family: 'Noto Sans JP Bold', sans-serif;
              font-weight: 700;
              cursor: pointer;
            }

            .metro-card-title {
              color: #1505cc;
            }

            .metro-card-subtitle {
              text-decoration: underline;
              color: #000000;
            }

            .metro-card-tags-container {
              padding-top: 6px;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              cursor: pointer;
            }

            .metro-card-tag {
              font-family: 'Roboto Mono', Helvetica;
              background: #e9e6eb;
              color: #20093b;
              margin-right: 4px;
              margin-bottom: 5px;
              word-wrap: wrap;
            }

            .covid19 .metro-card-title {
              color: #ff1800;
            }

            .covid19 .metro-card-subtitle,
            .covid19 .metro-card-tags-container {
              width: 90%;
            }

            .for-sale,
            .hire-me,
            .discussion {
              //flex-direction: row-reverse;
            }

            .for-sale .metro-card-tags-container {
              word-break: normal;
            }

            .metro-help {
              display: flex;
              font-family: 'Noto Sans JP', sans-serif;
              margin-bottom: 9px;
            }

            .metro-card-help-info {
              background: #1505cc;
              color: #ffffff;
              font-size: 0.75rem;
              border-bottom: 12px solid #0b0061;
              padding: 8px 16px;
            }

            .metro-card-promotions {
              display: grid;
              border: 1.5px solid #000000;
              color: #000000;
              font-size: 0.625rem;
              width: 100vw;
              min-width: 360px;
              max-width: 768px;
              background: #ffffff;
              min-height: 4.825rem;
              margin: 0px 5px 9px 5px;
            }

            .metro-card-promotions .metro-card-title {
              color: #000000;
              padding: 2px 0 2px 8px;
            }

            .metro-card-promotions .metro-card-tags-container {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              min-height: 2rem;
              grid-gap: 10px;
              align-items: center;
              justify-content: space-between;
              font-weight: bold;
              padding: 8px;
            }

            .metro-promotions-horizontal-line:after {
              content: '';
              display: flex;
              border-bottom: 0.5px solid #000000;
            }

            .metro-card-image {
              cursor: pointer;
            }

            .metro-footer {
              background: #000000;
              font-family: 'Roboto Mono Bold', Helvetica;
              font-weight: bold;
              padding-top: 10px;
              padding-bottom: 10px;
            }

            .metro-footer-navs {
              display: flex;
              justify-content: space-around;
            }

            .metro-footer-nav {
              background: rgba(255, 255, 255, 1);
              display: block;
              color: #000000;
              text-align: center;
              padding: 1px 2px;
              text-decoration: none;
              font-size: 0.875rem;
            }

            .metro-footer-trendings {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              justify-content: center;
              grid-gap: 8px;
              margin-top: 9px;
              margin-left: 31px;
              margin-right: 31px;
            }

            .metro-footer-trending {
              background: rgba(255, 255, 255, 1);
              font-size: 0.625rem;
              color: #000000;
              padding: 1px 2px;
              width: 100%;
            }
            .metrobody {
              height: 100vh;
            }
          `}
        </style>
      </div>
    );
  }
}
