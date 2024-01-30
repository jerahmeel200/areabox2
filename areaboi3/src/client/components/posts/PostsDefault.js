import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';
import Tags from './Tags';

const divStyle = {
  flex: '1',
  flexDirection: 'column'
};

export default class PostsDefault extends Component {
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
      layout,
      showPassport
    } = this.props;
    console.log('Posts', layout);
    console.log(' this is post from postsDefault.js ', layout);
    //the filter fixes a bug from index that creates some repeated old post on end of posts lists

    return (
      <div className="messages-container" style={divStyle}>
        <div>
          {posts &&
            posts
              .filter((p) => p.key)
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
                  showPassport={showPassport}
                />
              ))}
        </div>

        {/* <Tags page={page}/> */}
      </div>
    );
  }
}
//.reverse()

PostsDefault.propTypes = {
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
