import React, { useEffect } from 'react';
import BuySecurelySvg from '../../../../assets/svgComponents/BuySecurelySvg';

function ForSaleItemPreviewCard2({
  post,
  showWallets,
  gallery,
  getSaleInformation
}) {
  const buySecurely = () => {
    getSaleInformation(post);
    showWallets();
  };
  return (
    <>
      <div className="item-preview-card-2">
        <div class="item-preview-card-2-top">
          <div class="item-preview-card-2-info">
            <div class="item-preview-card-2-item">
              <h2>{post.title}</h2>
              <div class="item-preview-card-2-item-img">
                <img
                  src={
                    post.gallery[0]
                      ? post.gallery[0]
                      : 'static/img/for-sale-samsung.jpg'
                  }
                  alt="forsale-img"
                />
              </div>
            </div>
            <div class="item-preview-card-2-user">
              <div class="item-preview-card-2-user-avi">
                <div class="item-preview-card-2-user-avi-img">
                  {' '}
                  <img
                    src={`${
                      post.user?.profile?.aristo
                        ? `static/img/ARISTOS/${post.user?.profile?.aristo}.png`
                        : 'static/img/ARISTOS/1.png'
                    } `}
                  />{' '}
                </div>
                <p>
                  {post.user?.profile?.userName
                    ? post.user?.profile?.userName
                    : '@vagabondd'}
                </p>
              </div>
              <div class="item-preview-card-2-user-rep">
                <p>
                  REP:{' '}
                  {post.user?.profile?.repScore
                    ? post.user?.profile?.repScore
                    : '50'}
                  %
                </p>
                <div class="item-preview-card-2-user-rep-avi">
                  {' '}
                  <img src="static/img/baby_sphinx.png" />
                </div>
              </div>
            </div>
          </div>
          <div class="item-preview-card-2-price">
            <p className="item-preview-card-2-total">TOTAL</p>
            <p className="item-preview-card-2-item-price">
              &#8358;{post.price}
            </p>
          </div>
        </div>
        <div onClick={buySecurely} class="buy-securely-with-escrow">
          <BuySecurelySvg />
          <p>BUY SECURELY WITH ESCROW</p>
        </div>
      </div>
    </>
  );
}

export default ForSaleItemPreviewCard2;
