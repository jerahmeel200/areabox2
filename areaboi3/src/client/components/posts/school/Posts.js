import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../../post/services/post';
import Tags from '../Tags';
import RelatedChannels from '../RelatedChannels';
import PostExtended from '../../post/services/postExtended';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { channels: false };

    this.switch = this.switch.bind(this);
  }

  switch() {
    this.setState({
      channels: true
    });
  }
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
    //the filter fixes a bug from index that creates some repeated old post on end of posts lists
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
                  width="25"
                  height="20"
                  viewBox="0 0 25 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.4 13.3909C12.16 13.3909 12 13.3909 11.76 13.2922L4.88 10.2343V17.238C4.88 19.9014 11.6 20 12.32 20C13.12 20 19.76 19.9014 19.76 17.238V10.2343L12.88 13.2922C12.8 13.3909 12.64 13.3909 12.4 13.3909Z"
                    fill="white"
                  />
                  <path
                    d="M24.4 5.3021L12.64 0.0739827C12.48 -0.0246609 12.4 -0.0246609 12.24 0.0739827L0.4 5.3021C0.16 5.40074 0 5.69667 0 5.9926C0 6.28853 0.16 6.58446 0.4 6.68311L12.16 11.8126C12.24 11.8126 12.32 11.8126 12.4 11.8126C12.48 11.8126 12.56 11.8126 12.64 11.8126L24.4 6.68311C24.64 6.58446 24.8 6.28853 24.8 5.9926C24.8 5.69667 24.64 5.40074 24.4 5.3021Z"
                    fill="white"
                  />
                  <path
                    d="M21.44 14.9692C21.44 15.3637 21.68 15.7583 22.08 15.7583C22.48 15.7583 22.72 15.4624 22.72 14.9692V9.05054L21.52 9.54376V14.9692H21.44Z"
                    fill="white"
                  />
                </svg>{' '}
                Browse The {page.room_title} Channel
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
                width: 360px;
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
              }
              svg {
                height: 10px;
                width: 10px;
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
