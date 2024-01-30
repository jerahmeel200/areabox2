import React from 'react';
import P2PForm1 from './P2PForm1';
function P2PForm({ page, P2PActiveForm, setP2pForm1Values, makeP2PPost }) {
  return (
    <>
      {P2PActiveForm === 'p2pFormScreen1' && (
        <P2PForm1
          categories={page?.relatedChannels}
          setP2pForm1Values={setP2pForm1Values}
          // makeP2PPost={makeP2PPost}
        />
      )}
    </>
  );
}

export default P2PForm;
