import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import RenderMedia from '../RenderMedia';
import { linkPlayer, getFavIcon, getTags } from '../../lib';

export default class PostNodesDefault extends Component {
  render() {
    const { post } = this.props;
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
            <div className="container">
              <img className="big-img" src={post.img} />
              <div className="content">
                <div className="top">
                  {post.tit != 0 && (
                    <div className="tit" title={post.tit}>
                      {post.tit}
                    </div>
                  )}
                  {post.tit && <img src="static/img/blue-play.svg" />}
                </div>
                <div className="bottom">
                  {texts != '' && (
                    <span className="webtexts" title={post.texts}>
                      {post.texts}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* {post.link != 0 &&
                <a className="media-link" title="open in new window" target="_blank" ref="nofollow" href={post.link}>

                  {!post.embedHTML && post.img !== 0 &&
                    <div className="weblink-container"><img className="weblink" src={post.img} /></div>
                  }

                </a> */}

            {/* {(post.embedHTML || post.embedHTML !== 'undefined') &&
                <div key={Date.now()} id="embed-container" dangerouslySetInnerHTML={{ __html: post.embedHTML }} />
               */}

            {
              //player
            }

            {/*web texts place */}

            {/* {texts != '' &&
                <div id="demarcator-container"><img className="demarcator" src="../static/img/demarcator.svg" width="12px" height="8px" /></div>
               */}

            {/* {plain_text &&
                <div className="user-content">{plain_text}</div>
               */}

            {/* {<div className="tags-container">
                {tags.map(
                  function (tag) {
                    return (
                      <Link key={tag} href={`?tag=${tag}`}>
                        <a className="msg-tag-link">
                          <i className='search-icon'><img src='../static/img/Search.png' width='18px' height='18px' alt='search icon' /></i>
                    #{tag}
                        </a>
                      </Link>
                    )
                  }.bind(this)
                )}
              </div> */}
          </React.Fragment>
        )}
        <style jsx>
          {`
            .big-img {
              height: 64px;
              width: 95px;
            }
            .container {
              display: flex;
              position: relative;
              height: 74px;
              width: 260px;
              border: solid 0.25px #929595;
              align-items: center;
              padding: 1px;
              background: white;
            }
            .content {
              width: 165px;
              margin: 3px 0px;
            }
            .top {
              width: 100%;
              position: relative;
            }
            .top img {
              height: 8px;
              width: 6px;
              position: absolute;
              top: 2px;
              right: 4px;
            }
            .tit {
              width: 130px;
              font-size: 9px;
              color: #1505cc;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .bottom {
              width: 100%;
            }
            .webtexts {
              font-size: 8px;
              overflow: hidden;
              height: 48px;
              color: #000000;
            }
          `}
        </style>
      </>
    );
  }
}

PostNodesDefault.propTypes = {
  post: PropTypes.object.isRequired
};
