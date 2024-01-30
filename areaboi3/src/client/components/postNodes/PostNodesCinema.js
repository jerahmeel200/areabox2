import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import RenderMedia from '../RenderMedia';
import { linkPlayer, getFavIcon, getTags } from '../../lib';

export default class PostNodesDefault extends Component {
  render() {
    const { post } = this.props;

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
            {favIcon}

            {post.tit != 0 && <div className="tit">{post.tit}</div>}

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

            {post.video && (
              <video className="media" controls preload="none">
                <source
                  src={
                    post.video.startsWith('Qm')
                      ? `https://ipfs.io/ipfs/${post.video}`
                      : post.video
                  }></source>
              </video>
            )}

            {player}

            {texts != '' && <span className="webtexts">{post.texts}</span>}

            {texts != '' && (
              <div id="demarcator-container">
                <img
                  className="demarcator"
                  src="../static/img/demarcator.svg"
                  width="12px"
                  height="8px"
                />
              </div>
            )}

            {plain_text && <div className="user-content">{plain_text}</div>}

            <div className="tags-container">
              {tags.map(
                function (tag) {
                  return (
                    <Link legacyBehavior key={tag} href={`?tag=${tag}`}>
                      <a className="msg-tag-link">
                        <i className="search-icon">
                          <img
                            src="../static/img/Search.png"
                            width="18px"
                            height="18px"
                            alt="search icon"
                          />
                        </i>
                        #{tag}
                      </a>
                    </Link>
                  );
                }.bind(this)
              )}
            </div>
          </React.Fragment>
        )}
      </>
    );
  }
}

PostNodesDefault.propTypes = {
  post: PropTypes.object.isRequired
};
