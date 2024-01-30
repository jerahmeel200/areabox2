import React, { Component } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';
import Map from '../../components/map';
import styles from './lagos.module.css';

const Home = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  const products = [
    {
      id: 1,
      image: '../static/img/USDCoin.png'
    },
    {
      id: 1,
      image: '../static/img/USDCoin.png'
    },
    {
      id: 1,
      image: '../static/img/USDCoin.png'
    },
    {
      id: 1,
      image: '../static/img/USDCoin.png'
    },
    {
      id: 1,
      image: '../static/img/USDCoin.png'
    },
    {
      id: 1,
      image: '../static/img/USDCoin.png'
    },
    {
      id: 1,
      image: '../static/img/USDCoin.png'
    },
    {
      id: 1,
      image: '../static/img/USDCoin.png'
    }
  ];

  const customArrow = ({ type, onClick, isEdge }) => {
    const arrowSymbol = type === 'PREV' ? '<' : '>';

    // Define your custom styles here
    const buttonStyles = {
      background: 'transparent',
      border: 'none',
      fontSize: '24px',
      color: '#333', // Arrow color
      cursor: 'pointer',
      outline: 'none',
      marginLeft: '20px' // Adjust spacing
    };
    return (
      <button onClick={onClick} disabled={isEdge} style={buttonStyles}>
        {arrowSymbol}
      </button>
    );
  };
  return (
    <>
      <Header
        subHeader={
          // testing
          <>
            <div>
              <img
                className="blue-star"
                src="static/img/blue-star.svg"
                alt="symbol"
              />
            </div>
            <div className="title">
              <span> Ikeja, LAGOS</span>
            </div>

            <div className={styles.mapInteract}>
              <img
                // className="view_channels"
                src="static/img/metro-bus.svg"
                width="18px"
                height="18px"
                // style={{ marginLeft: "20px" }}
              />
              <p className={styles.getDirections}>GET DIRECTIONS</p>
            </div>
          </>
        }
      />

      <section className={styles.homeeBody}>
        <div className={styles.metroMap}>
          <Map />
        </div>
        <div style={{ marginTop: '7rem' }} className="home-card--container">
          <span className="homeCard-label">Featured</span>
          <div
            style={{ border: '1px solid lightgray' }}
            className={styles.homeCardFeatured}>
            <div className={styles.featuredCardContainer}>
              {/* <Carousel
                breakPoints={breakPoints}
                pagination={false}
                renderArrow={customArrow}
              >
                {products.map((item, index) => (
                  <div key={index} className={styles.featuredCard}>
                    <span className={styles.featuredCardLabel}>For Sale</span>
                    <div
                      style={{
                        background: "white",
                        width: "320px",
                        height: "200px",
                        padding: " 20px 17px",
                      }}
                      className="featured-card--image"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className={styles.cardDetails}>
                          <img
                            height="30px"
                            width="30px"
                            src="../static/img/profileIcon.png"
                            alt=""
                          />
                          <span>@vagabond</span>
                        </div>
                        <div className={styles.cardDetails}>
                          <img
                            height="30px"
                            style={{ objectFit: "contain" }}
                            src="../static/img/baby_sphinx.png"
                            alt=""
                          />
                          <span>rep: 58%</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "center", marginTop: "30px" }}>
                        <img src={item.image} alt="" height="50px" />
                      </div>
                      <p
                        style={{
                          paddingTop: "30px",
                          fontWeight: "700",
                          fontSize: "15px",
                          lineHeight: "17.38px",
                          color: "#0B0061",
                        }}
                        className="featured-card--tag"
                      >
                        USD Coin
                      </p>

                      <div></div>
                    </div>
                  </div>
                ))}
              </Carousel> */}
            </div>
          </div>
        </div>

        <div className="home-card--container services-container">
          <span className="homeCard-label">Services</span>
          <div className="home-card services">
            <div className="service">
              <div className="service-card-image">
                <img src="../static/img/metro-bus.svg" alt="" />
              </div>
              <Link legacyBehavior href="/metro">
                <a className="service-title">Metro</a>
              </Link>
            </div>

            <div className="service">
              <div className="service-card-image">
                <img src="../static/img/headphone.svg" alt="" />
              </div>
              <Link legacyBehavior href="/radio">
                <a className="service-title">Radio</a>
              </Link>
            </div>

            <div className="service">
              <div className="service-card-image">
                <img src="../static/img/cinematic.svg" alt="" />
              </div>
              <Link legacyBehavior href="/cinema">
                <a className="service-title">Cinema</a>
              </Link>
            </div>

            <div className="service">
              <div className="service-card-image">
                <img src="../static/img/graduation.svg" alt="" />
              </div>
              <Link legacyBehavior href="/school">
                <a className="service-title">School</a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="metro-footer">
        <div className="metro-footer-content">
          <span>&#174;</span>
          <p>Ask about me</p>
        </div>
      </footer>

      <style jsx>{`
        .home-body {
          padding-top: 6.3em;
          display: grid;
          background: rgba(142, 109, 185, 0.1);
          overflow-y: scroll;
          padding-bottom: 3.2em;
        }

        .metro-map {
          min-height: 15.125rem;
          margin-bottom: 9px;
        }

        .metro-map img {
          width: 100%;
          height: 100%;
        }

        .home-card--container {
          margin: 0 auto;
          width: 100vw;
          min-width: 360px;
          max-width: 768px;
        }

        .home-card {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 0.25px dotted #000000;
          font-family: 'Noto Sans JP Bold', Helvetica;
          font-size: 0.625rem;
        }

        .homeCard-label {
          color: #000000;
          font-family: 'ScriberStencil', Helvetica;
          font-weight: bold;
          font-size: 1.25rem;
          padding: 8px 16px;
          background: #ffffff;
          display: inline-block;
        }

        .services-container .homeCard-label {
          color: #0b0061;
        }

        .services-container {
          width: 100vw;
          min-width: 360px;
          max-width: 768px;
          margin: 0 auto;
        }

        .services {
          background: #1505cc;
          color: #ffffff;
          font-family: 'Roboto Mono', Helvetica;
          width: 100%;
          justify-content: space-around;
        }

        .service {
          flex: 1;
          display: flex;
          flex-direction: column;
          place-items: center;
          border-right: 0.5px dotted #ffffff;
          text-align: center;
          padding-top: 5px;
          padding-bottom: 5px;
        }

        .service:last-child {
          border-right: 0;
        }

        .service-title {
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
        }

        .metro-footer {
          display: block;
          background: #dad8df;
          font-family: 'Roboto Mono', Helvetica;
          font-weight: bold;
          position: sticky;
          bottom: 0;
          width: 100vw;
          min-width: 360px;
          max-width: 768px;
          margin: 0 auto;
        }

        .metro-footer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1px 5px;
        }

        .metro-footer-content p {
          font-size: 0.625rem;
        }
      `}</style>
    </>
  );
};

export default Home;
