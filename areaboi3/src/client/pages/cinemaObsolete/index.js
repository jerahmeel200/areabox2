import React, { Component } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import AreaboiHelp from '../../components/AreaboiHelp';

export default class Cinema extends Component {
  static async getInitialProps() {
    const movies = [
      {
        imageUrl: '../../static/img/lionking.jpg',
        title: 'The Lion King',
        description:
          'Lion cub and future king, Simba searches for his identity. His eagerness to please others and...'
      },
      {
        imageUrl: '../../static/img/toystory3.jpg',
        title: 'Toy Story 3',
        description:
          'The toys are mistakenly delivered to a daycare center instead of the attic right before Andy leaves for college...'
      },
      {
        imageUrl: '../../static/img/cartoon.jpg',
        title: 'Chico & Rita',
        description:
          'Chico is a young piano player with big dreams. Rita is a beautiful singer with an extraordinary voice...'
      },
      {
        imageUrl: '../../static/img/lionking.jpg',
        title: 'The Lion King',
        description:
          'Lion cub and future king, Simba searches for his identity. His eagerness to please others and...'
      }
    ];
    return { movies };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { movies } = this.props;

    return (
      <>
        <Header
          subheader={
            <div>
              <div className="unreadNotif">
                <div>
                  <span
                    className="unreadBolt"
                    style={{ marginTop: '2px', marginLeft: '15px' }}>
                    <img
                      src="static/img/purple-lolly.svg"
                      width="21px"
                      height="21px"
                    />
                  </span>
                </div>
              </div>

              <a
                style={{ margin: '-22px auto' }}
                className="rooms_btn"
                title="Rooms">
                CINEMA
              </a>

              <a title="Rooms" className="rooms_icon">
                <span>
                  <img
                    className="view_channels"
                    src="static/img/cinematic.svg"
                  />
                </span>
              </a>
            </div>
          }
        />

        <section className="cinema-body">
          <div className="cinema-movies">
            <aside className="cinema-movies--sidebar">
              <Link legacyBehavior href="/cinema/action">
                <a className="cinemar-movies--sidebar-link">Action</a>
              </Link>
              <Link legacyBehavior href="/cinema/romance">
                <a className="cinemar-movies--sidebar-link">Romance</a>
              </Link>
              <Link legacyBehavior href="/cinema/sport">
                <a className="cinemar-movies--sidebar-link">Sport</a>
              </Link>
              <Link legacyBehavior href="/cinema/cartoon">
                <a className="cinemar-movies--sidebar-link">Cartoon</a>
              </Link>
              <Link legacyBehavior href="/cinema/nollywood">
                <a className="cinemar-movies--sidebar-link">Nollywood</a>
              </Link>
              <Link legacyBehavior href="/cinema/bolywood">
                <a className="cinemar-movies--sidebar-link">Bollywood</a>
              </Link>
              <Link legacyBehavior href="/cinema/serial">
                <a className="cinemar-movies--sidebar-link">Serial</a>
              </Link>
              <Link legacyBehavior href="/cinema/comedy">
                <a className="cinemar-movies--sidebar-link">Comedy</a>
              </Link>
              <Link legacyBehavior href="/cinema/documentary">
                <a className="cinemar-movies--sidebar-link">Documentary</a>
              </Link>
              <Link legacyBehavior href="/cinema/sci-fi">
                <a className="cinemar-movies--sidebar-link">Sci-Fi</a>
              </Link>
              <Link legacyBehavior href="/cinema/drama">
                <a className="cinemar-movies--sidebar-link">Drama</a>
              </Link>
            </aside>

            <div className="cinema-movies--select">
              {movies.map(({ title, imageUrl, description }, i) => {
                return (
                  <div className="cinema-movies--select-item" key={i}>
                    <div className="cinema-movies--select-item-image">
                      <img src={imageUrl} />
                    </div>
                    <div className="cinema-movies--select-item-desc">
                      <span className="cinema-movies--select-item-title">
                        {title}
                      </span>
                      <p>{description}</p>
                      <button className="cinema-movies--select-item-play">
                        <img src="../../static/img/blue-play.svg" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cinema-movies--footer">
              <img src="../../static/img/cinematics-black.svg" />{' '}
              <span>Browse All Cartoon Channels</span>
            </div>
          </div>

          <div style={{ margin: '0 auto' }}>
            <AreaboiHelp
              message={'Select from  playlist or send a request to @areaboi'}
            />
          </div>

          <div className="nowPlaying--container">
            <span className="nowPlaying--label">
              <img src="../static/img/tv-play.svg" />
              Now Playing
            </span>
            <div className="nowPlaying--card">
              <p className="nowPlaying--navigator">&#8249;</p>

              <div className="nowPlaying-movieCard--container">
                <div className="nowPlaying-movieCard">
                  <div className="nowPlaying-movieCard--imageContainer">
                    <img
                      className="nowPlaying-movieCard--image"
                      src="../static/img/robocop.jpg"
                      alt=""
                      height="128px"
                    />
                    <div className="nowPlaying-movieCardTitle--container">
                      <div className="nowPlaying-movieCardTitle">Robocop</div>
                    </div>
                  </div>
                </div>

                <div className="nowPlaying-movieCard">
                  <div className="nowPlaying-movieCard--imageContainer">
                    <img
                      className="nowPlaying-movieCard--image"
                      src="../static/img/avatar.jpg"
                      alt=""
                    />
                    <div className="nowPlaying-movieCardTitle--container">
                      <div className="nowPlaying-movieCardTitle">Avatar</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="nowPlaying--navigator">&#8250;</p>
            </div>
          </div>
        </section>

        <footer className="cinema-footer">
          <div className="cinema-footer-content">
            <nav className="cinema-footer-navs">
              <Link legacyBehavior href="/">
                <a className="cinema-footer-nav">My Channels</a>
              </Link>
              <Link legacyBehavior href="/metro">
                <a className="cinema-footer-nav">Metro</a>
              </Link>
              <Link legacyBehavior href="/radio">
                <a className="cinema-footer-nav">Radio</a>
              </Link>
              <Link legacyBehavior href="/school">
                <a className="cinema-footer-nav">School</a>
              </Link>
              <Link legacyBehavior href="/trending">
                <a className="cinema-footer-nav">Trending</a>
              </Link>
            </nav>
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
              top: 62px;
            }

            .cinema-body {
              padding-top: 6.3em;
              display: grid;
              background: rgba(142, 109, 185, 0.1);
              overflow-y: scroll;
              width: 100vw;
              min-width: 360px;
              max-width: 768px;
              margin: 0 auto;
            }

            .cinema-movies {
              display: grid;
              grid-template-columns: repeat(3, auto);
              grid-template-rows: auto;
              grid-gap: 7px;
              grid-template-areas:
                'c-sidebar c-select c-select'
                'c-sidebar c-select c-select'
                'c-sidebar c-footer c-footer';
              margin-bottom: 35px;
              background: rgba(0, 0, 0, 0.1);
              padding: 3px;
            }

            .cinema-movies--sidebar {
              grid-area: c-sidebar;
              display: grid;
              font-family: 'ScriberStencil', sans-serif;
              font-size: 0.875rem;
            }

            .cinema-movies--select {
              grid-area: c-select;
            }

            .cinema-movies--footer {
              grid-area: c-footer;
              margin-top: auto;
              background: #ffffff;
              border: 0.25px solid #000000;
              font-family: 'Roboto Mono';
              font-size: 0.625rem;
              padding: 6px 0;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              width: 100%;
            }

            .cinema-movies--footer img {
              margin-right: 6px;
            }

            .cinemar-movies--sidebar-link:first-child {
              border-top: 0.25px solid #000000;
            }

            .cinemar-movies--sidebar-link {
              display: inline-block;
              cursor: pointer;
              padding: 6px 10px;
              background: #ffffff;
              text-align: center;
              text-decoration: none;
              color: #000000;
              border-left: 0.25px solid #000000;
              border-right: 0.25px solid #000000;
              border-bottom: 0.25px solid #000000;
            }

            .cinemar-movies--sidebar-link:hover {
              color: #1505cc;
            }

            .cinemar-movies--sidebar-link:active,
            .cinemar-movies--sidebar-link.active {
              color: #1505cc;
              background: transparent;
              border-left: 0;
              border-right: 0;
            }

            .cinema-movies--select-item {
              display: flex;
              position: relative;
              font-size: 0.5625rem;
              background: #ffffff;
              border: 0.25px solid #000000;
              margin-bottom: 7px;
            }

            .cinema-movies--select-item:last-child {
              margin-bottom: 0;
            }

            .cinema-movies--select-item-image {
              flex: 0.4;
            }

            .cinema-movies--select-item-image img {
              width: 100%;
              height: 100%;
            }

            .cinema-movies--select-item-desc {
              flex: 0.6;
            }

            .cinema-movies--select-item-title {
              font-family: 'Noto Sans JP Bold', sans-serif;
              color: #1505cc;
              padding: 3px;
              font-weight: bold;
            }

            .cinema-movies--select-item p {
              line-height: 16px;
              padding: 3px;
            }

            .cinema-movies--select-item-play {
              position: absolute;
              bottom: 0;
              right: 0;
              padding: 1.5px 3px;
              border: none;
            }

            .nowPlaying--container {
              margin-top: 35px;
              margin-bottom: 50px;
            }

            .nowPlaying--label {
              color: #000000;
              font-family: 'ScriberStencil', Helvetica;
              font-weight: bold;
              font-size: 1.25rem;
              padding: 8px 16px;
              background: #ffffff;
              display: inline-flex;
              align-items: center;
            }

            .nowPlaying--label img {
              margin-right: 5px;
            }

            .nowPlaying--card {
              display: flex;
              align-items: center;
              border: 0.25px dotted #000000;
              font-family: 'Noto Sans JP Bold', Helvetica;
              font-size: 0.625rem;
              justify-content: space-between;
              min-height: auto;
              background: rgba(0, 0, 0, 0.1);
            }

            .nowPlaying-movieCard--container {
              display: flex;
              width: 100%;
              justify-content: center;
              padding: 5px 0;
            }

            .nowPlaying-movieCard {
              flex: 1;
              position: relative;
              margin-right: 10px;
            }

            .nowPlaying-movieCard:last-child {
              margin-right: 0;
            }

            .nowPlaying-movieCard--imageContainer {
              width: 100%;
              height: 100%;
              position: relative;
            }

            .nowPlaying-movieCard--image {
              width: 100%;
              height: 100%;
              opacity: 1;
              display: block;
              height: auto;
              transition: 0.5s ease;
              backface-visibility: hidden;
            }

            .nowPlaying-movieCardTitle--container {
              transition: 0.3s ease;
              opacity: 0;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              text-align: center;
              border: 0.25px solid #000000;
            }

            .nowPlaying-movieCard--imageContainer:hover
              .nowPlaying-movieCard--image {
              opacity: 0.3;
            }

            .nowPlaying-movieCard--imageContainer:hover
              .nowPlaying-movieCardTitle--container {
              opacity: 1;
            }

            .nowPlaying-movieCardTitle {
              background: #ffffff;
              color: #000000;
              font-family: 'Noto Sans JP Bold';
              font-weight: bold;
              font-size: 0.625rem;
              padding: 16px 32px;
            }

            .nowPlaying--navigator {
              font-size: 2rem;
              color: #3c3c3c;
              padding: 0 8px;
            }

            /* Footer Styles */
            .cinema-footer {
              background: #000000;
              font-family: 'Roboto Mono Bold', Helvetica;
              font-weight: bold;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 5px;
              padding-right: 5px;
              position: sticky;
              bottom: 0;
              width: 100vw;
              min-width: 360px;
              max-width: 768px;
              margin: 0 auto;
            }

            .cinema-footer-navs {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
            }

            .cinema-footer-nav {
              background: rgba(255, 255, 255, 1);
              display: block;
              color: #000000;
              text-align: center;
              padding: 1px 2px;
              text-decoration: none;
              text-transform: uppercase;
              font-size: 0.875rem;
            }
          `}
        </style>
      </>
    );
  }
}
