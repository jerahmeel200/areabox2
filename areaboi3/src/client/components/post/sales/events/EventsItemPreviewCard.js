import React, { useState } from 'react';
import EventsItemPreviewCard1 from './EventsItemPreviewCard1';
import EventsItemPreviewCard2 from './EventsItemPreviewCard2';

function EventsItemPreviewCard({
  post,
  postClicked,
  gallery,
  showWallets,
  getSaleInformation,
  handEditEventsForm
}) {
  const [isAttendClicked, setIsAttendClicked] = useState(false);
  const handleAttendClicked = () => {
    setIsAttendClicked(true);
  };
  const getComponentToShow = () => {
    if (!isAttendClicked) {
      return (
        <EventsItemPreviewCard1
          post={post}
          postClicked={postClicked}
          handleEditEventsForm={handEditEventsForm}
          handleAttendClicked={handleAttendClicked}
          gallery={gallery}
        />
      );
    } else {
      return (
        <EventsItemPreviewCard2
          post={post}
          showWallets={showWallets}
          gallery={gallery}
          getSaleInformation={getSaleInformation}
        />
      );
    }
  };
  return <div class="item-preview-card-container">{getComponentToShow()}</div>;
}

export default EventsItemPreviewCard;
