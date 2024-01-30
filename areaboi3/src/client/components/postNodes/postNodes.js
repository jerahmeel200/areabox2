import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import RenderMedia from '../RenderMedia';
import { linkPlayer, getFavIcon, getTags } from '../../lib';

export default class PostNodes extends Component {
  constructor(props) {
    super(props);
    this.nofollowRef = React.createRef();
  }
  render() {
    const { post, page, time } = this.props;
    const colors = this.props.colors;
    // console.log(post);
    //console.log("PostNodesDefault", post)
    let player = linkPlayer(post);
    let favIcon = getFavIcon(post);
    const tags = getTags(post.text);
    const texts = post.texts ? post.texts.trim() : '';
    let plain_text = post.text;
    if (post.link) plain_text = plain_text.replace(new RegExp(post.link), '');
    /*let plain_text_no_tags= plain_text
    if(tags) tags.forEach( function(tag) {
      plain_text_no_tags= plain_text_no_tags.replace(tag, "")
    })
    plain_text_no_tags= plain_text_no_tags.trim()
    if( plain_text_no_tags == post.tit ) plain_text=""
    */

    return (
      <>
        {post.media ? (
          <RenderMedia media={post.media} />
        ) : (
          <React.Fragment>
            <div style={{ marginLeft: '5px' }}>
              {favIcon}

              {post.tit && (
                <div
                  className="tit"
                  style={{
                    color: colors.tit,
                    textAlign: 'left',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                  {post.tit}
                </div>
              )}
            </div>
            {post.link != 0 && (
              <a
                className="media-link"
                title="open in new window"
                target="_blank"
                ref={this.nofollowRef}
                href={post.link}>
                {!post.embedHTML && post.img !== 0 && (
                  <div className="weblink-container">
                    <img className="weblink" src={post.img} />
                  </div>
                )}
              </a>
            )}

            {(post.embedHTML || post.embedHTML !== 'undefined') && (
              <div
                key={Date.now()}
                id="embed-container"
                dangerouslySetInnerHTML={{ __html: post.embedHTML }}></div>
            )}

            {player}

            {texts != '' && (
              <span
                className="webtexts"
                title={post.texts}
                style={{ color: colors.webText }}>
                {post.texts}
              </span>
            )}

            {texts != '' && (
              <div id="demarcator-container">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 10 5"
                  xmlns="http://www.w3.org/2000/svg"
                  className="demarcator"
                  style={{ fill: colors.demarcator }}>
                  <path
                    d="M4.40464 3.14012C4.20738 3.14012 4.0475 3.3 4.0475 3.49726V3.66179L3.42345 4.28571H1.33821L0.714286 3.66179V1.33857L1.33833 0.714524H3.42345L4.0475 1.33869L4.04762 1.50333C4.04774 1.70048 4.20762 1.86036 4.40476 1.86036H4.40488C4.60214 1.86024 4.76202 1.70024 4.7619 1.5031L4.76179 1.1906C4.76179 1.09595 4.72417 1.00512 4.65714 0.938214L3.82393 0.104881C3.7569 0.0378572 3.66619 0.000238192 3.57143 0.000238192H1.19036C1.0956 0.000238192 1.00476 0.0378572 0.937857 0.104881L0.104643 0.938214C0.0376191 1.00524 0 1.09595 0 1.19071V3.80976C0 3.90452 0.0376191 3.99536 0.104643 4.06226L0.937857 4.89536C1.00488 4.96238 1.0956 5 1.19036 5H3.57131C3.66607 5 3.7569 4.96238 3.82381 4.89548L4.65714 4.06238C4.72417 3.99536 4.76179 3.90452 4.76179 3.80976V3.49726C4.76179 3.3 4.6019 3.14012 4.40464 3.14012ZM9.89524 0.938214L9.0619 0.104881C8.99488 0.0378572 8.90417 0.000238192 8.8094 0.000238192L6.42821 0C6.33345 0 6.2425 0.0376192 6.17559 0.104762L5.34274 0.938333C5.27583 1.00524 5.23833 1.09583 5.23821 1.19048L5.23798 1.50298C5.23786 1.70012 5.39762 1.86024 5.59488 1.86036C5.59488 1.86036 5.595 1.86036 5.59512 1.86036C5.79226 1.86036 5.95214 1.7006 5.95226 1.50345L5.95238 1.33869L6.57619 0.714286L8.66143 0.714524L9.28559 1.33857V3.66179L8.66167 4.28571H6.57643L5.95238 3.66167L5.95214 3.4969C5.9519 3.29976 5.79202 3.14012 5.595 3.14012H5.59464C5.39738 3.14036 5.23762 3.30048 5.23786 3.49762L5.23821 3.81012C5.23833 3.90476 5.27595 3.99548 5.34286 4.06226L6.17607 4.89536C6.24309 4.96238 6.33381 5 6.42857 5H8.80952C8.90429 5 8.99512 4.96238 9.06202 4.89536L9.89524 4.06226C9.96226 3.99524 9.99988 3.90452 9.99988 3.80976V1.19071C9.99988 1.09595 9.96226 1.00524 9.89524 0.938214ZM2.05333 2.5C2.05333 2.69714 2.21321 2.85714 2.41048 2.85714L7.5894 2.85738C7.78655 2.85738 7.94655 2.6975 7.94655 2.50024C7.94655 2.3031 7.78667 2.1431 7.5894 2.1431L2.41048 2.14286C2.21333 2.14286 2.05333 2.30274 2.05333 2.5Z"
                    fill="#20093B"
                    fillOpacity="0.5"
                  />
                </svg>
              </div>
            )}

            {plain_text && (
              <div className="user-content" style={{ color: colors.userText }}>
                {plain_text}
              </div>
            )}

            <div className="bottom">
              <div className="time">{time}</div>
              {
                <div className="tags-container">
                  {tags.map(
                    function (tag) {
                      return (
                        <Link legacyBehavior key={tag} href={`?tag=${tag}`}>
                          <a
                            className="msg-tag-link"
                            style={{
                              color: colors.tagColor,
                              background: colors.tagBG
                            }}>
                            {/*
                          <i className='search-icon'>
                            <img src='../static/img/Search.png' width='18px' height='18px' alt='search icon' />
                          </i>
                          */}
                            {tag}
                          </a>
                        </Link>
                      );
                    }.bind(this)
                  )}
                </div>
              }
            </div>
          </React.Fragment>
        )}
        <style jsx>
          {`
            .weblink-container {
              width: 100%;
            }
            .weblink {
              width: 100%;
            }

            .channel-cont {
              color: white;
              font-size: 12px;
              margin-bottom: 20px;
            }
            .tags-container {
              color: white;
            }
            .content {
              width: 165px;
              margin: 3px 0px;
            }
            .container {
              color: white;
            }
            .top {
              width: 100%;
              position: relative;
            }

            .tit {
              height: 17px;
              max-width: 290px;
              text-align: center;
              font-size: 14px;
              color: #1505cc;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-family: 'Noto_Sans_JP', 'NOTO SANS JP';
              font-weight: 700;
            }
            .bottom {
              width: 100%;
              display: flex;
              justify-content: space-between;
              font-size: 10px;
              position: absolute;
              bottom: 2px;
              color: white;
              padding-right: 5px;
            }
            .webtexts {
              font-size: 12px;
              overflow: hidden;
              min-height: 60px;
              color: white;
              font-family: 'Noto Sans JP';
            }
          `}
        </style>
      </>
    );
  }
}

PostNodes.propTypes = {
  post: PropTypes.object.isRequired
};
