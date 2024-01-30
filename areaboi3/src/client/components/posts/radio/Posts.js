import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../../post/services/post';
import PostExtended from '../../post/services/postExtended';
import Tags from '../Tags';

import RelatedChannels from '../RelatedChannels';

export default class Posts extends Component {
  constructor(props) {
    super(constructor);
    this.state = {
      channels: true
    };
  }
  switch = () => {
    this.setState((state, props) => {
      return {
        channels: !state.channels
      };
    });
  };
  render() {
    const {
      posts,
      page,
      userLogedIn,
      registered,
      commentFn,
      editFn,
      userMetadata,
      profileFn,
      gChatRef,
      readonly,
      pinFn,
      layout
    } = this.props;
    if (this.state.channels) {
      return (
        <>
          <div className="messages-container">
            <RelatedChannels page={page} />
            <div>
              <div className="post-browse">
                {posts &&
                  posts
                    .filter((p) => p.key)
                    .filter((p) => posts.indexOf(p) >= posts.length - 3)
                    .map((post, postIndex, postsArray) => (
                      <Post
                        key={post.key}
                        post={post}
                        page={page}
                        commentFn={commentFn}
                        userLogedIn={userLogedIn}
                        registered={registered}
                        nocache="1.2"
                        editFn={editFn}
                        userMetadata={userMetadata}
                        profileFn={profileFn}
                        gChatRef={gChatRef}
                        readonly={readonly}
                        pinFn={pinFn}
                        postIndex={postIndex}
                        postsArray={postsArray}
                        layout={layout}
                      />
                    ))}
                <div className="browse-all" onClick={() => this.switch()}>
                  <svg
                    width="24"
                    height="23"
                    viewBox="0 0 24 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.727 0C5.29605 0 0 5.67434 0 12.7105V17.9309C0 20.7303 2.26974 23 5.06908 23C5.59868 23 6.05263 22.9243 6.58224 22.773C6.80921 22.6974 6.96053 22.4704 6.96053 22.2434V13.6941C6.96053 13.4671 6.80921 13.2401 6.58224 13.1645C6.12829 13.0132 5.59868 12.9375 5.06908 12.9375C3.48026 12.9375 2.11842 13.6941 1.13487 14.7533V12.7105C1.13487 6.35526 5.90132 1.13487 11.727 1.13487C17.5526 1.13487 22.3191 6.35526 22.3191 12.7105V14.7533C21.4112 13.6184 19.9737 12.9375 18.3849 12.9375C17.8553 12.9375 17.4013 13.0132 16.8717 13.1645C16.6447 13.2401 16.4934 13.4671 16.4934 13.6941V22.2434C16.4934 22.4704 16.6447 22.6974 16.8717 22.773C17.3257 22.9243 17.8553 23 18.3849 23C21.1842 23 23.4539 20.7303 23.4539 17.9309V12.7105C23.4539 5.67434 18.1579 0 11.727 0Z"
                      fill="white"
                    />
                  </svg>{' '}
                  Browse The {page.room_title} Channel
                </div>
              </div>
            </div>
            {
              //<RelatedChannels page={page}/>
            }
          </div>

          <style jsx>
            {`
              .messages-container {
                display: flex;
                width: 100vw;
                min-width: 360px;
                max-width: 768px;
                height: 275px;
                background: rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(0, 0, 0, 0.2);
                padding: 2px 0px;
              }

              .post-browse {
                margin-left: 2px;
              }
              .browse-all {
                font-size: 10px;
                height: 30px;
                width: 263px;
                border: solid 0.25px #929595;
                text-align: center;
                padding-top: 6px;
                margin-top: 3px;
                background: white;
                cursor: pointer;
                font-family: 'RobotoMono';
              }
              svg {
                height: 10px;
                width: 10px;
                margin-righ: 12px;
              }
              path {
                fill: black;
              }
            `}
          </style>
        </>
      );
    } else if (!this.state.channels) {
      return (
        <>
          <div className="container">
            <Tags page={page} />
            <div className="extended-posts">
              {posts &&
                posts
                  .filter((p) => p.key)
                  .map((post, postIndex, postsArray) => (
                    <PostExtended
                      key={post.key}
                      post={post}
                      page={page}
                      commentFn={commentFn}
                      userLogedIn={userLogedIn}
                      registered={registered}
                      nocache="1.2"
                      editFn={editFn}
                      userMetadata={userMetadata}
                      profileFn={profileFn}
                      gChatRef={gChatRef}
                      readonly={readonly}
                      pinFn={pinFn}
                      postIndex={postIndex}
                      postsArray={postsArray}
                      layout={layout}
                    />
                  ))}
            </div>
          </div>
          <style jsx>
            {`
              .container {
                display: flex;
                flex-direction: column;
              }
            `}
          </style>
        </>
      );
    }
  }
}
//.reverse()

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  commentFn: PropTypes.func.isRequired,
  registered: PropTypes.bool.isRequired,
  editFn: PropTypes.func.isRequired,
  userLogedIn: PropTypes.string.isRequired,
  userMetadata: PropTypes.object.isRequired,
  profileFn: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired,
  pinFn: PropTypes.func.isRequired,
  layout: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired
};
