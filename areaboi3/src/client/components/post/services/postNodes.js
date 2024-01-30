import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import RenderMedia from '../../RenderMedia';
import { linkPlayer, getFavIcon, getTags } from '../../../lib';

export default class Post extends Component {
  render() {
    const { post, page, time } = this.props;
    console.log(post);
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
            {
              //favIcon
            }

            {post.link != 0 && (
              <a
                className="media-link"
                title="open in new window"
                target="_blank"
                ref="nofollow"
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
                dangerouslySetInnerHTML={{ __html: post.embedHTML }}
              />
            )}

            {player}
            {post.tit && <div className="tit">{post.tit}</div>}

            {texts != '' && (
              <span className="webtexts" title={post.texts}>
                {post.texts}
              </span>
            )}

            {/* texts != '' &&
                <div id="demarcator-container">
                  <img className="demarcator" src="../static/img/demarcator.svg" width="12px" height="8px" />
                </div> */}

            {/* plain_text &&
                <div className="user-content">{plain_text}</div> */}
            {<div className="channel-cont">[{page.room_title}]</div>}
            <div className="bottom">
              <div className="time">{time}</div>
              {
                <div className="tags-container">
                  {tags.map(
                    function (tag) {
                      return (
                        <Link legacyBehavior key={tag} href={`?tag=${tag}`}>
                          <a className="msg-tag-link">
                            {
                              // <i className='search-icon'>
                              //   <img src='../static/img/Search.png' width='18px' height='18px' alt='search icon' />
                              // </i>
                            }
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
              padding: 0 7px;

              font-family: 'BarlowBold';
            }
            .tags-container {
              color: white;

              font-family: 'BarlowExtraBold';
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
              color: white;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-family: 'BarlowExtraBold';
              text-align: left;
              text-transform: uppercase;
              font-weight: 800;
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
              padding: 0 7px;
            }
            .webtexts {
              font-size: 8px;
              overflow: hidden;
              min-height: 60px;
              color: white;
              width: 270px;
              font-family: BarlowRegular;
              font-size: 12px;
            }
            .time {
              font-family: BarlowRegular;
            }
          `}
        </style>
      </>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};
