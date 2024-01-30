import React, { useEffect } from 'react';
import SalesForm1 from './SalesForm1';
import SalesForm2 from './SalesForm2';
import SalesForm3 from './SalesForm3';

function SalesForms({
  page,
  salesPost,
  activeForm,
  handleEditSalesForm,
  setSalesForm1Values,
  setSalesForm2Values,
  makePost,
  gallery,
  getSaleInformation,
  sellers
}) {
  const getForms = () => {
    return (
      <>
        {activeForm === 'formScreen1' && (
          <SalesForm1
            categories={page?.relatedChannels}
            setSalesForm1Values={setSalesForm1Values}
            sellers={sellers}
          />
        )}
        {activeForm === 'formScreen2' && (
          <SalesForm2
            setSalesForm2Values={setSalesForm2Values}
            salesPost={salesPost}
            gallery={gallery}
          />
        )}
        {activeForm === 'formScreen3' && (
          <SalesForm3
            post={salesPost}
            gallery={gallery}
            makePost={makePost}
            getSaleInformation={getSaleInformation}
            handleEditSalesForm={handleEditSalesForm}
          />
        )}
      </>
    );
  };
  return getForms();
}

export default SalesForms;
