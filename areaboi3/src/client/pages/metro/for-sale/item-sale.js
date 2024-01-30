import React, { Component } from 'react';
import Header from '../../../components/Header';
import Link from 'next/link';

export default class ItemSale extends Component {
  render() {
    return (
      <>
        <Header
          mascotUrl={'../../static/img/areabox_logo.svg'}
          subheader={
            <div>
              <div className="unreadNotif">
                <div>
                  <span
                    className="metro-lagos"
                    style={{ marginTop: '3px', marginLeft: '15px' }}>
                    <Link href="/metro/for-sale">
                      <img src="../../static/img/back-arrow-fat.svg" />
                    </Link>
                    <span>&nbsp; Ikeja, LAGOS</span>
                  </span>
                </div>
              </div>

              <a title="Rooms" className="rooms_icon">
                <span>
                  <img
                    className="view_channels"
                    src="../../static/img/metro-bus.svg"
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
          <div className="forSale-card">
            <div className="forSale-card-header">
              <span className="forSale-label">FOR SALE</span>
              <p className="forSale-card-title">Samsung A20e</p>
              <div className="forSale-card-timestamp">
                <span className="forSale-created">Created: 9 days ago</span>
                <br />
                <span className="forSale-edited">Edited: 17 minutes ago</span>
              </div>
            </div>

            <div className="forSale-showcase">
              <p className="forSale-showcase-navigator">&#8249;</p>
              <div className="forSale-card-image">
                <img
                  src="../../static/img/for-sale-samsung.jpg"
                  alt=""
                  width="266.67px"
                  height="200px"
                />
              </div>
              <p className="forSale-showcase-navigator">&#8250;</p>
            </div>

            <div className="forSale-card-info">
              <div className="forSale-card-details">
                Tear rubber. Only &#8358;50,000. Serious people only. Send me a
                Flash Message and let us talk.
              </div>
              <span className="forSale-author">@mad_mellon88</span>
              <div className="forSale-card-flash">
                <img src="../../static/img/flash-message-icon.svg" />
                <p>Flash Message</p>
              </div>
            </div>
            <span className="forSale-card-actions">
              <img src="../../static/img/item-sale-actions.svg" />
            </span>
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
          }

          .forSale-card {
            display: grid;
            align-items: center;
            background: #ffffff;
            border: 0.25px dotted #000000;
            font-family: 'Noto Sans JP', Helvetica;
            font-size: 0.625rem;
            min-height: 10rem;
            margin-bottom: 9px;
            padding: 3.5px 7px;
            position: relative;
          }

          .forSale-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 8px;
          }

          .forSale-card-title {
            font-family: 'Noto Sans JP Bold', Helvetica;
            font-weight: bold;
            font-size: 0.875rem;
            text-decoration: underline;
            color: #000000;
          }

          .forSale-card-timestamp {
            font-size: 0.5rem;
          }

          .forSale-showcase {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
          }

          .forSale-showcase-navigator {
            font-size: 2rem;
          }

          .forSale-card-info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 0 3rem;
            text-align: center;
          }

          .forSale-card-details {
            padding: 16px 0;
            font-size: 0.625rem;
          }

          .forSale-label {
            border: 1px solid #1505cc;
            color: #1505cc;
            font-family: 'Noto Sans JP Bold', Helvetica;
            font-weight: bold;
            padding: 1px 2px;
            z-index: 5;
            background: #ffffff;
          }

          .forSale-author {
            text-decoration: underline;
            padding-bottom: 10px;
            font-family: 'Roboto Mono', sans-serif;
            font-size: 0.75rem;
          }

          .forSale-card-flash p {
            font-family: 'Roboto Mono', sans-serif;
          }

          .forSale-card-actions {
            text-align: right;
          }

          .metro-footer {
            background: #000000;
            font-family: 'Roboto Mono Bold', Helvetica;
            font-weight: bold;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
            position: fixed;
            bottom: 0;
            left: 0;
          }

          .metro-footer-navs {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding-left: 10px;
            padding-right: 10px;
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
