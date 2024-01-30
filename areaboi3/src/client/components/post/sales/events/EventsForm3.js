import React from 'react';
import EventsItemPreviewCard from './EventsItemPreviewCard';
import GeneralEnterButton from '../../../GeneralEnterButton';
function EventsForm3({ makeEventPost, post, handEditEventsForm }) {
  const onButtonClicked = () => {
    makeEventPost;
  };
  return (
    <div>
      <EventsItemPreviewCard
        post={post}
        handEditEventsForm={handEditEventsForm}
      />
      <div class="mx-auto click-effect mt-20px">
        <GeneralEnterButton
          text={'Post'}
          onButtonClick={onButtonClicked}
          type={'button'}
        />
      </div>
    </div>
  );
}

export default EventsForm3;
