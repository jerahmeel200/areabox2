import React, { Component } from 'react';
import Header from '../../../components/Header';
import Link from 'next/link';

export default class ForSale extends Component {
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
                    style={{ marginTop: '3px', marginLeft: '15px' }}>
                    <Link href="/metro">
                      <img src="../static/img/back-arrow-fat.svg" />
                    </Link>
                    <span>&nbsp; Ikeja, LAGOS</span>
                  </span>
                </div>
              </div>

              <a title="Rooms" className="rooms_icon">
                <span>
                  <img
                    className="view_channels"
                    src="../static/img/metro-bus.svg"
                    width="25px"
                    height="18px"
                    alt="metro bus icon"
                  />
                </span>
              </a>
            </div>
          }
        />

        <section className="forSale-body">
          <Link href="/metro/for-sale/item-sale">
            <div className="forSale-card">
              <span className="forSale-label">FOR SALE</span>
              <div className="forSale-card-image">
                <img src="../static/img/for-sale-guitar.jpg" alt="" />
              </div>

              <div className="forSale-card-info">
                <p className="forSale-card-title">
                  Vintage guitar in pristine condition
                </p>
                <div className="forSale-card-details">
                  Single owner of legendary Rhodes Fender guitar used by legends
                  like King Sunny Ade, Osadebe, Bob Marley. &#8358;250,000 or
                  best offer
                </div>
                <span className="forSale-author">@mad_mellon88</span>
              </div>
            </div>
          </Link>

          <div className="forSale-card">
            <span className="forSale-label">FOR SALE</span>
            <div className="forSale-card-image">
              <img
                src="../static/img/for-sale-samsung.jpg"
                alt="corona virus info image"
              />
            </div>
            <div className="forSale-card-info">
              <p className="forSale-card-title">Samsung A20e</p>
              <div className="forSale-card-details">
                Tear rubber. Only &#8358;50,000
              </div>
              <span className="forSale-author">@youdontsay</span>
            </div>
          </div>

          <div className="forSale-card">
            <span className="forSale-label">FOR SALE</span>
            <div className="forSale-card-image">
              <img src="../static/img/for-sale-kabuki.jpg" alt="" />
            </div>
            <div className="forSale-card-info">
              <p className="forSale-card-title">Japanes Poster</p>
              <div className="forSale-card-details">
                Brand new poster showing scene from kabuki Theatre. 500x350.
                Printed in Japan. Includes artist's certificate
              </div>
              <span className="forSale-author">@vagabondd</span>
            </div>
          </div>

          <div className="forSale-card">
            <span className="forSale-label">FOR SALE</span>
            <div className="forSale-card-image">
              <img
                src="static/img/hiring-image.png"
                alt=""
                width="72px"
                height="72px"
              />
            </div>
            <div className="forSale-card-info">
              <p className="forSale-card-title"></p>
              <div className="forSale-card-details"></div>
            </div>
          </div>

          <div className="forSale-card">
            <span className="forSale-label">FOR SALE</span>
            <div className="forSale-card-image">
              <img
                src="static/img/hire-me-image.png"
                alt=""
                width="72px"
                height="72px"
              />
            </div>
            <div className="forSale-card-info">
              <p className="forSale-card-title"></p>
              <div className="forSale-card-details"></div>
            </div>
          </div>
        </section>

        <footer className="metro-footer">
          <div className="metro-footer-content">
            <nav className="metro-footer-navs">
              <a className="metro-footer-nav">Fashion</a>
              <a className="metro-footer-nav">Vehicles</a>
              <a className="metro-footer-nav">Furniture</a>
              <a className="metro-footer-nav">Books</a>
              <a className="metro-footer-nav">Tools</a>
              <a className="metro-footer-nav">Household</a>
              <a className="metro-footer-nav">Toys + Games</a>
              <a className="metro-footer-nav">Farm + Garden</a>
            </nav>
          </div>
        </footer>

        <style jsx>{`
          body,
          html {
            height: 100%;
          }

          p {
            margin: 0;
            padding: 0;
          }

          .rooms_icon {
            top: 62px;
          }

          .metro-lagos {
            color: white;
            display: flex;
            align-items: center;
          }

          .forSale-body {
            padding-top: 6.3em;
            display: grid;
            background: rgba(206, 209, 229, 0.1);
            overflow-y: scroll;
            width: 360px;
          }

          .forSale-card {
            display: flex;
            align-items: center;
            background: #ffffff;
            border: 0.25px dotted #000000;
            font-family: 'Noto Sans JP', Helvetica;
            font-size: 0.625rem;
            min-height: 4.825rem;
            margin-bottom: 9px;
            padding: 3.5px 7px;
            position: relative;
          }

          .forSale-card-image {
            width: 30%;
          }

          .forSale-card-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 70%;
            min-height: 4.825rem;
          }

          .forSale-card-title {
            font-family: 'Noto Sans JP Bold', Helvetica;
            font-weight: bold;
            text-decoration: underline;
            color: #000000;
          }

          .forSale-card-details {
            padding: 3px 16px 3px 0;
          }

          .forSale-label {
            border: 1px solid #1505cc;
            color: #1505cc;
            font-family: 'Noto Sans JP Bold', Helvetica;
            font-weight: bold;
            padding: 1px 2px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            background: #ffffff;
          }

          .forSale-author {
            text-decoration: underline;
            font-family: 'Roboto Mono', sans-serif;
          }

          .metro-footer {
            background: #000000;
            font-family: 'Roboto Mono Bold', Helvetica;
            font-weight: bold;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 5px;
            padding-right: 5px;
            position: fixed;
            bottom: 0;
            left: 0;
          }

          .metro-footer-navs {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          .metro-footer-nav {
            background: rgba(255, 255, 255, 1);
            display: block;
            color: #000000;
            text-align: center;
            padding: 1px 2px;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 0.875rem;
            margin-bottom: 8px;
          }
        `}</style>
      </>
    );
  }
}
