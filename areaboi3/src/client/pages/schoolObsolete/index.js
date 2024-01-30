import React from 'react';
import PropTypes from 'prop-types';

import { FirebaseDatabase } from '../../settings/firebase.js';

import Link from 'next/link';
import Header from '../../components/Header';
import AreaboiHelp from '../../components/AreaboiHelp';
import {
  onValue,
  ref as refD,
  query as queryF,
  orderByChild
} from 'firebase/database';

export default class Metro extends React.Component {
  static async getInitialProps({ store, pathname, query, isServer }) {
    console.log('Metro getInitialProps');

    const gChatRef = FirebaseDatabase;
    const ref = refD(gChatRef, 'featured/school'); //gChatRef.ref("featured/school")
    /*
    ref.set({
    	  basicSchool: {"n":1, "subtitle":"Early education"},
    	  highSchool: {"n":2, "subtitle":"..."},
    	  masterClass: {"n":3, "subtitle":"..."},
    	  dailyNuggets: {"n":4, "subtitle":"Daily Nuggets"}        
    })
    // this was done manually (import json) at https://areabox-chat.firebaseio.com/featured/school
    */

    //for now manual data setting at
    //https://console.firebase.google.com/project/areabox-chat/database/areabox-chat/data/~2Fmetro

    return onValue(queryF(ref, orderByChild('n')), function (datasnapshot) {
      //ref.orderByChild("n").once("value").then(function(dataSnapshot) {
      const channels = [];
      var p = 0;

      datasnapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        const fn = (snap) => {
          const c = snap.val();
          if (!c) return false;
          item.tags = c.tags;
          item.title = c.title;
          channels.push(item);
          return true;
        };

        if (!item.is_private) {
          if (!p)
            // serialize promises for each, YES!
            p = new Promise((resolve) => {
              onValue(
                child(refD(gChatRef, 'rooms'), item.key),
                (snapshot) => resolve(fn(snapshot)),
                { onlyOnce: false }
              );
            });
          //gChatRef.ref("rooms").child(item.key).once("value").then( fn)
          else
            p = p.then(
              () =>
                new Promise((resolve) => {
                  onValue(
                    child(refD(gChatRef, 'rooms'), item.key),
                    (snapshot) => resolve(fn(snapshot)),
                    { onlyOnce: false }
                  );
                })
            );
        } // if private
      }); //end dataSnapshot.foreach

      if (p)
        return p.then(() => {
          console.log('have all promises', channels);
          return { channels };
        });
    }); //dataSnapshot
  } //getInitialP

  constructor(props) {
    super(props);
    console.log('Metro constructor ');
  }

  render() {
    const { channels } = this.props;

    return (
      <>
        <Header
          subheader={
            <div>
              <div className="unreadNotif">
                <div>
                  <span
                    className="metro-lagos"
                    style={{ marginTop: '2px', marginLeft: '15px' }}>
                    METRO. LAGOS
                  </span>
                </div>
              </div>

              {
                <a title="channels" className="channels_icon">
                  <span>
                    <img
                      className="view_channels"
                      src="static/img/metro-bus.svg"
                      width="25px"
                      height="18px"
                    />
                  </span>
                  <p className="get-directions">GET DIRECTIONS</p>
                </a>
              }
            </div>
          }
        />

        <section className="metro-body">
          <div className="metro-map" key="map">
            <div style={{ width: '100%' }}>
              <iframe
                width="100%"
                height="86"
                src="https://maps.google.com/maps?width=100%&amp;height=86&amp;hl=en&amp;coord=6.59450895, 3.3764905977245228&amp;q=Oshosun%20landfill+(Areabox)&amp;ie=UTF8&amp;t=&amp;z=16&amp;iwloc=B&amp;output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0">
                <a href="https://www.maps.ie/coordinates.html">AreaMap</a>
              </iframe>
            </div>
            <br />
          </div>

          {channels.map((channel) => {
            let channel_key = channel.key; //"metro-test" //debug channel
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
                <div className={`metro-card ${channel.key}`}>
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
                        <p className="metro-card-title">{channel.title}</p>
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
                              href={`?tag=${tag}&rk=${channel.key}`}>
                              <span className="metro-card-tag">
                                {channel.tags[tag].split('-')[1]}
                              </span>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
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
                </div>
              );
            if (channel.promoted)
              return (
                <div className="metro-card-promotions">
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
                            href={`?tag=${tag}&rk=${channel.key}`}>
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

            .get-directions {
              border: 0.5px dotted #ffffff;
              font-size: 0.625rem;
              margin-left: 13px;
              text-align: center;
              padding: 4px;
            }

            .metro-body {
              padding-top: 6.3em;
              display: grid;
              background: rgba(206, 209, 229, 0.1);
              overflow-y: scroll;
            }

            .metro-map {
              border: 0.25px dotted #000000;
              height: 5.375rem;
              margin-bottom: 14px;
            }

            .metro-card {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #ffffff;
              border: 0.25px dotted #000000;
              min-height: 4.825rem;
              margin-bottom: 9px;
              padding: 3.5px 7px;
            }

            .metro-card-info {
              font-size: 0.625rem;
            }

            .metro-card-title,
            .metro-card-subtitle {
              font-family: 'Noto Sans JP Bold', sans-serif;
              font-weight: bold;
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
              padding-left: 14px;
              width: 90%;
            }

            .for-sale,
            .hire-me,
            .discussion {
              flex-direction: row-reverse;
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
              width: 100%;
              background: #ffffff;
              min-height: 4.825rem;
              margin-bottom: 9px;
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
          `}
        </style>
      </>
    );
  }
}
