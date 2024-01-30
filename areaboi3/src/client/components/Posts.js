import React from 'react';
import PropTypes from 'prop-types';
import PostsDefault from './posts/PostsDefault';
import PostsCinema from './posts/cinema/Posts';
import PostsSchool from './posts/school/Posts';
import PostsRadio from './posts/radio/Posts';
import PostsSales from './posts/sales/Posts';

function Posts({
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
  loadMore,
  showPassport,
  showWallets,
  getSaleInformation
}) {
  if (layout === '') {
    return (
      <PostsDefault
        posts={posts}
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
        layout={layout}
        loadMore={loadMore}
        showPassport={showPassport}
      />
    );
  } else if (layout === 'cinema') {
    return (
      <PostsCinema
        posts={posts}
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
        layout={layout}
      />
    );
  } else if (layout === 'school') {
    return (
      <PostsSchool
        posts={posts}
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
        layout={layout}
      />
    );
  } else if (layout === 'radio') {
    return (
      <PostsRadio
        posts={posts}
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
        layout={layout}
      />
    );
  } else if (layout === 'sales') {
    return (
      <PostsSales
        posts={posts}
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
        layout={layout}
        showWallets={showWallets}
        getSaleInformation={getSaleInformation}
      />
    );
  } else {
    return null;
  }
}

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

export default Posts;
