import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import RenderMedia from '../../RenderMedia';
import { linkPlayer, getFavIcon, getTags } from '../../../lib';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.img = React.createRef();
  }
  componentDidMount() {
    let img = this.img.current.style;
    let width = this.img.current.naturalWidth;
    let height = this.img.current.naturalHeight;
    // if(width < heigth ){
    //   img.height = 70
    // }
    // else if(width > height && width < 95){
    //   img.height = 70;
    //   img.width = width;
    // }else if(width > height && width > 95){
    //   img.height = 70;
    //   img.width = 95;
    // }
    // console.log('width', width.current)
  }
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
        <div id={post.key} key={post.num}>
          <div className="post-container">
            <div className="container">
              {}
              <img className="big-img" ref={this.img} src={post.img} />
              {
                //className={userClass}
              }
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
          </div>
        </div>

        <style jsx>
          {`
            .post-container {
              margin-bottom: 6px;
            }
            .big-img {
              height: 64px;
              width: 95px;
            }
            .container {
              display: flex;
              position: relative;
              height: 74px;
              width: 263px;
              border: solid 0.25px #929595;
              align-items: center;
              padding: 1px;
              background: white;
              font-family: 'NotoSansJP';
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
              font-family: 'Noto Sans JP Bold';
            }
            .webtexts {
              font-size: 8px;
              overflow: hidden;
              height: 48px;
              color: #000000;
              font-family: 'NOTO SANS JP';
            }
            .load-more {
              display: none;
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
