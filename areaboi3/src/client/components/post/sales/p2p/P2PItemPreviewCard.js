import React, { useState } from 'react';
import P2PItemPreviewCard1 from './P2PItemPreviewCard1';
import P2PItemPreviewCard2 from './P2PItemPreviewCard2';

function P2PItemPreviewCard({ post, postClicked, showWallets, gallery }) {
  const [isTradeClicked, setIsTradeClicked] = useState(false);
  const handleTradeClicked = () => {
    setIsTradeClicked(true);
  };
  const getComponentToShow = () => {
    if (!isTradeClicked) {
      return (
        <P2PItemPreviewCard1
          post={post}
          postClicked={postClicked}
          handleTradeClicked={handleTradeClicked}
          gallery={gallery}
        />
      );
    } else {
      return (
        <P2PItemPreviewCard2
          post={post}
          showWallets={showWallets}
          gallery={gallery}
        />
      );
    }
  };
  return <div class="item-preview-card-container">{getComponentToShow()}</div>;
}

export default P2PItemPreviewCard;
