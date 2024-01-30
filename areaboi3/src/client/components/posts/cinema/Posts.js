import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../../post/services/post';
import Tags from '../Tags';
import RelatedChannels from '../RelatedChannels';
import PostExtended from '../../post/services/postExtended';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: false
    };
  }
  switch = () => {
    this.setState({
      channels: true
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
    if (!this.state.channels) {
      return (
        <>
          <div className="messages-container">
            <RelatedChannels page={page} />
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
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.06452 0H0.354839C0.16129 0 0 0.16129 0 0.354839V1.64516H2.06452V0Z"
                    fill="black"
                  />
                  <path
                    d="M0.354839 10H2.06452V8.35484H0V9.64517C0 9.83871 0.16129 10 0.354839 10Z"
                    fill="black"
                  />
                  <path
                    d="M7.35484 0H5.25806V1.64516H7.35484V0Z"
                    fill="black"
                  />
                  <path
                    d="M4.70967 8.35484H2.6129V10H4.70967V8.35484Z"
                    fill="black"
                  />
                  <path d="M4.70967 0H2.6129V1.64516H4.70967V0Z" fill="black" />
                  <path
                    d="M0 7.80645H10V2.19354H0V7.80645ZM3.35484 3.45161C3.35484 3.09677 3.64516 2.80645 4 2.80645C4.12903 2.80645 4.25806 2.8387 4.3871 2.93548L6.3871 4.48386C6.54839 4.6129 6.64516 4.77419 6.64516 4.99999C6.64516 5.2258 6.54839 5.38709 6.3871 5.51612L4.3871 7.06451C4.29032 7.16128 4.12903 7.19354 4 7.19354C3.64516 7.19354 3.35484 6.90322 3.35484 6.54838V3.45161Z"
                    fill="black"
                  />
                  <path
                    d="M7.93549 1.64516H10V0.354839C10 0.16129 9.83871 0 9.64516 0H7.93549V1.64516Z"
                    fill="black"
                  />
                  <path
                    d="M7.35484 8.35484H5.25806V10H7.35484V8.35484Z"
                    fill="black"
                  />
                  <path
                    d="M7.93549 10H9.64516C9.83871 10 10 9.83871 10 9.64517V8.35484H7.93549V10Z"
                    fill="black"
                  />
                </svg>{' '}
                Browse The {page.room_key} Channel
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
                width: 100vh;
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
                font-family: 'RobotoMono';
                font-weight: 400;
              }
              svg {
                height: 10px;
                width: 10px;
                margin-right: 12px;
              }
              path {
                fill: black;
              }
            `}
          </style>
        </>
      );
    } else {
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
