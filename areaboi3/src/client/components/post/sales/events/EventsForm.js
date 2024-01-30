import React from 'react';
import EventsForm1 from './EventsForm1';
import EventsForm2 from './EventsForm2';
import EventsForm3 from './EventsForm3';

function EventsForm({
  page,
  eventsActiveForm,
  setEventsForm1Values,
  setEventsForm2Values,
  makeEventsPost,
  gallery
}) {
  return (
    <>
      {eventsActiveForm === 'eventsFormScreen1' && (
        <EventsForm1
          categories={page?.relatedChannels}
          setEventsForm1Values={setEventsForm1Values}
        />
      )}
      {eventsActiveForm === 'eventsFormScreen2' && (
        <EventsForm2
          setEventsForm2Values={setEventsForm2Values}
          makeEventsPost={makeEventsPost}
          gallery={gallery}
        />
      )}
      {eventsActiveForm === 'eventsFormScreen3' && (
        <EventsForm3
          setEventsForm2Values={setEventsForm2Values}
          makeEventsPost={makeEventsPost}
          gallery={gallery}
        />
      )}
    </>
  );
}

export default EventsForm;
