import React from 'react';
import ForSalesItemPreviewCard from './forsale/SaleItemPreviewCard';
import EventsItemPreviewCard from './events/EventsItemPreviewCard';
import P2PItemPreviewCard from './p2p/P2PItemPreviewCard';

function ItemCardPreview({
  page,
  salesPost,
  eventsPost,
  p2pPost,
  postClicked,
  showWallets,
  gallery,
  eventsGallery,
  p2pAssets,
  userLogedIn,
  handleEditSalesForm,
  handEditEventsForm,
  getSaleInformation
}) {
  const getComponentToShow = () => {
    if (page?.room_key === 'for-sale') {
      return (
        <ForSalesItemPreviewCard
          post={salesPost}
          postClicked={postClicked}
          showWallets={showWallets}
          gallery={gallery}
          getSaleInformation={getSaleInformation}
          userLogedIn={userLogedIn}
          handleEditSalesForm={handleEditSalesForm}
        />
      );
    } else if (page?.room_key === 'events') {
      return (
        <EventsItemPreviewCard
          post={eventsPost}
          postClicked={postClicked}
          showWallets={showWallets}
          gallery={eventsGallery}
          getSaleInformation={getSaleInformation}
          handEditEventsForm={handEditEventsForm}
        />
      );
    } else if (page?.room_key === 'p2p-exchange') {
      return (
        <P2PItemPreviewCard
          post={p2pPost}
          postClicked={postClicked}
          showWallets={showWallets}
          gallery={p2pAssets}
        />
      );
    } else return null;
  };
  return getComponentToShow();
}

export default ItemCardPreview;
