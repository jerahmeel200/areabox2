import React, { useState } from 'react';
import ForSaleItemPreviewCard1 from './SaleItemPreviewCard1';
import ForSaleItemPreviewCard2 from './SaleItemPreviewCard2';

function ForSaleItemPreviewCard({
  post,
  postClicked,
  showWallets,
  gallery,
  getSaleInformation,
  userLogedIn,
  handleEditSalesForm
}) {
  console.log(gallery);
  const [isBuyClicked, setIsBuyClicked] = useState(false);
  const handleBuyClicked = () => {
    setIsBuyClicked(true);
  };
  const getComponentToShow = () => {
    if (!isBuyClicked) {
      return (
        <ForSaleItemPreviewCard1
          post={post}
          postClicked={postClicked}
          handleBuyClicked={handleBuyClicked}
          gallery={gallery}
          userLogedIn={userLogedIn}
          handleEditSalesForm={handleEditSalesForm}
        />
      );
    } else {
      return (
        <ForSaleItemPreviewCard2
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

export default ForSaleItemPreviewCard;
