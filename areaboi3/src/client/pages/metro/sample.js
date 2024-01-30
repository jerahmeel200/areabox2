import React, { Component } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import AreaboiHelp from '../../components/AreaboiHelp';

export default class Metro extends Component {
  render() {
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
                <a title="Rooms" className="rooms_icon">
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
          <div className="metro-map">
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

          <div className="metro-card corona-virus">
            <div className="metro-card-info">
              <p className="metro-card-title">
                <span>
                  <img
                    src="static/img/danger-sign.svg"
                    alt="danger sign image"
                  />
                </span>{' '}
                CORONAVIRUS ALERT. Please stay safe
              </p>
              <p className="metro-card-subtitle">
                Developments around the COVID-19 outbreak
              </p>
              <div className="metro-card-tags-container">
                <span className="metro-card-tag">Live Tracker</span>
                <span className="metro-card-tag">Explainers</span>
                <span className="metro-card-tag">How to Help</span>
                <span className="metro-card-tag">Chat Bot</span>
              </div>
            </div>

            <div className="metro-card-image">
              <img
                src="static/img/covid19-image.png"
                alt=""
                width="72px"
                height="72px"
              />
            </div>
          </div>

          <Link href="/metro/for-sale">
            <div className="metro-card for-sale">
              <div className="metro-card-info">
                <p className="metro-card-title">FOR SALE</p>
                <p className="metro-card-subtitle">
                  New, used and free items in your area and nearby
                </p>
                <div className="metro-card-tags-container">
                  <span className="metro-card-tag">Books</span>
                  <span className="metro-card-tag">Fashion</span>
                  <span className="metro-card-tag">Toys</span>
                  <span className="metro-card-tag">Furniture</span>
                  <span className="metro-card-tag">Vehicles</span>
                  <span className="metro-card-tag">Household</span>
                  <span className="metro-card-tag">Electronics</span>
                </div>
              </div>

              <div className="metro-card-image">
                <img
                  src="static/img/for-sale-image.png"
                  alt=""
                  width="72px"
                  height="72px"
                />
              </div>
            </div>
          </Link>

          <div className="metro-card for-rent">
            <div className="metro-card-info">
              <p className="metro-card-title">FOR RENT</p>
              <p className="metro-card-subtitle">
                Spaces, objects and appliances
              </p>
              <div className="metro-card-tags-container">
                <span className="metro-card-tag">Office</span>
                <span className="metro-card-tag">Event Center</span>
                <span className="metro-card-tag">Warehouse + Storage</span>
                <span className="metro-card-tag">Flats + Duplexes</span>
                <span className="metro-card-tag">Vehicles</span>
                <span className="metro-card-tag">Shops</span>
                <span className="metro-card-tag">Tools</span>
              </div>
            </div>

            <div className="metro-card-image">
              <img
                src="static/img/for-rent-image.png"
                alt=""
                width="72px"
                height="72px"
              />
            </div>
          </div>

          <AreaboiHelp
            message={`Can't find something in your area?Ask @areaboi to help you search for it in other parts of the city.`}
          />

          <div className="metro-card hiring">
            <div className="metro-card-info">
              <p className="metro-card-title">I'M HIRING</p>
              <p className="metro-card-subtitle">
                Jobs, contracts and collaborations
              </p>
              <div className="metro-card-tags-container">
                <span className="metro-card-tag">Electrician</span>
                <span className="metro-card-tag">Mechanic</span>
                <span className="metro-card-tag">Lawyer</span>
                <span className="metro-card-tag">Security</span>
                <span className="metro-card-tag">Software Engr</span>
                <span className="metro-card-tag">Factory</span>
                <span className="metro-card-tag">Cook</span>
                <span className="metro-card-tag">Artists</span>
              </div>
            </div>

            <div className="metro-card-image">
              <img
                src="static/img/hiring-image.png"
                alt=""
                width="72px"
                height="72px"
              />
            </div>
          </div>
          <div className="metro-card hire-me">
            <div className="metro-card-info">
              <p className="metro-card-title">HIRE ME</p>
              <p className="metro-card-subtitle">
                Jobs, contracts and collaborations
              </p>
              <div className="metro-card-tags-container">
                <span className="metro-card-tag">Electrician</span>
                <span className="metro-card-tag">Mechanic</span>
                <span className="metro-card-tag">Lawyer</span>
                <span className="metro-card-tag">Security</span>
                <span className="metro-card-tag">Software Engr</span>
                <span className="metro-card-tag">Factory</span>
                <span className="metro-card-tag">Cook</span>
                <span className="metro-card-tag">Artists</span>
              </div>
            </div>

            <div className="metro-card-image">
              <img
                src="static/img/hire-me-image.png"
                alt=""
                width="72px"
                height="72px"
              />
            </div>
          </div>
          <div className="metro-card-promotions">
            <div className="metro-card-info">
              <p className="metro-card-title">PROMOTIONS</p>
              <div className="metro-promotions-horizontal-line"></div>
              <div className="metro-card-tags-container">
                <span className="metro-card-promotions-tag">
                  *Haircuts & styling
                </span>
                <span className="metro-card-promotions-tag">
                  *Cinema Tickets
                </span>
                <span className="metro-card-promotions-tag">*Bet365</span>
                <span className="metro-card-promotions-tag">
                  *Imported Used Cars
                </span>
                <span className="metro-card-promotions-tag">
                  *Swiss Watches
                </span>
                <span className="metro-card-promotions-tag">
                  *Dominoes Pizza
                </span>
              </div>
            </div>
          </div>

          <div className="metro-card events">
            <div className="metro-card-info">
              <p className="metro-card-title">EVENTS + ANNOUNCEMENTS</p>
              <p className="metro-card-subtitle">
                Social arrangements and get-togethers
              </p>
              <div className="metro-card-tags-container">
                <span className="metro-card-tag">Volunteers</span>
                <span className="metro-card-tag">Open Parties</span>
                <span className="metro-card-tag">Lost + Found</span>
                <span className="metro-card-tag">Rideshare</span>
                <span className="metro-card-tag">Community activities</span>
                <span className="metro-card-tag">Connections</span>
              </div>
            </div>

            <div className="metro-card-image">
              <img
                src="static/img/events-image.png"
                alt=""
                width="72px"
                height="72px"
              />
            </div>
          </div>

          <div className="metro-card discussion">
            <div className="metro-card-info">
              <p className="metro-card-title">DISCUSSION FORUMS</p>
              <p className="metro-card-subtitle">
                Common interests and developing topics
              </p>
              <div className="metro-card-tags-container">
                <span className="metro-card-tag">Sports</span>
                <span className="metro-card-tag">Politics</span>
                <span className="metro-card-tag">Finance + Investing</span>
                <span className="metro-card-tag">Celeb + Gossip</span>
                <span className="metro-card-tag">Christianity</span>
                <span className="metro-card-tag">Islam</span>
                <span className="metro-card-tag">Music</span>
              </div>
            </div>

            <div className="metro-card-image">
              <img
                src="static/img/discussion-image.png"
                alt=""
                width="72px"
                height="72px"
              />
            </div>
          </div>

          <div className="metro-card-promotions">
            <div className="metro-card-info">
              <p className="metro-card-title">PROMOTIONS</p>
              <div className="metro-promotions-horizontal-line"></div>
              <div className="metro-card-tags-container">
                <span className="metro-card-promotions-tag">
                  *WORLD CUP 2022
                </span>
                <span className="metro-card-promotions-tag">
                  *Affordable Solar Power
                </span>
                <span className="metro-card-promotions-tag">*Visit Dubai</span>
                <span className="metro-card-promotions-tag">
                  *Free Pepper Soup
                </span>
                <span className="metro-card-promotions-tag">
                  *Shoes:Buy 2 get 1 free!
                </span>
                <span className="metro-card-promotions-tag">*JAMB Tutor</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="metro-footer">
          <div className="metro-footer-content">
            <nav className="metro-footer-navs">
              <Link legacyBehavior href="/">
                <a className="metro-footer-nav">MY CHANNELS</a>
              </Link>
              <a className="metro-footer-nav">RADIO</a>
              <a className="metro-footer-nav">CINEMA</a>
              <a className="metro-footer-nav">SCHOOL</a>
              <a className="metro-footer-nav">TRENDING</a>
            </nav>
            <div className="metro-footer-trendings">
              <a className="metro-footer-trending">[Arsenal]</a>
              <a className="metro-footer-trending">[DanceHallQueen]</a>
              <a className="metro-footer-trending">[Aso_Ebi]</a>
              <a className="metro-footer-trending">[Alaba_Market]</a>
              <a className="metro-footer-trending">[Chelsea]</a>
              <a className="metro-footer-trending">[Politricking]</a>
              <a className="metro-footer-trending">[Igboro1]</a>
              <a className="metro-footer-trending">[parish 12]</a>
            </div>
          </div>
        </footer>

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

            .rooms_icon {
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
            }

            .metro-card-tag {
              font-family: 'Roboto Mono', Helvetica;
              background: #e9e6eb;
              color: #20093b;
              margin-right: 4px;
              margin-bottom: 5px;
              word-wrap: wrap;
            }

            .corona-virus .metro-card-title {
              color: #ff1800;
            }

            .corona-virus .metro-card-subtitle,
            .corona-virus .metro-card-tags-container {
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
