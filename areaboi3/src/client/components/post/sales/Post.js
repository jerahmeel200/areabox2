import React from 'react';
import SalesCard from '../sales/forsale/SalesCard';
import P2pCard from '..//sales/p2p/P2PCard';
import EventsCard from '../sales/events/EventsCard';

function Post({ page, post, index, handlePostClicked, userLogedIn }) {
  if (page?.room_key === 'for-sale') {
    return (
      <SalesCard
        handlePostClicked={() => {
          handlePostClicked(post, 'for-sale');
        }}
        key={index}
        post={post}
        userLogedIn={userLogedIn}
      />
    );
  } else if (page?.room_key === 'p2p-exchange') {
    return (
      <P2pCard
        handlePostClicked={() => {
          handlePostClicked(post, 'p2p');
        }}
        key={index}
        post={post}
        userLogedIn={userLogedIn}
      />
    );
  } else if (page?.room_key === 'events') {
    return (
      <EventsCard
        handlePostClicked={() => {
          handlePostClicked(post, 'events');
        }}
        key={index}
        post={post}
        userLogedIn={userLogedIn}
      />
    );
  } else {
    return null;
  }
}

export default Post;
