import React from 'react';
import ItemPreviewCard from './SaleItemPreviewCard';
import GeneralEnterButton from '../../../GeneralEnterButton';

function SalesForm3({
  makePost,
  gallery,
  post,
  getSaleInformation,
  handleEditSalesForm
}) {
  const onButtonClicked = () => {
    // Make Post
    makePost();
  };
  return (
    <div>
      <ItemPreviewCard
        post={post}
        gallery={gallery}
        getSaleInformation={getSaleInformation}
        handleEditSalesForm={handleEditSalesForm}
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

export default SalesForm3;
