import React from 'react';
import BuySecurelySvg from '../../../../assets/svgComponents/BuySecurelySvg';
import BitcoinBlackSvg from '../../../../assets/svgComponents/BitcoinBlackSvg';

function P2PItemPreviewCard2({ post, showWallets, galley }) {
  return (
    <>
      {console.log(post)}
      <div className="item-preview-card-2">
        <div class="item-preview-card-2-top">
          <div class="item-preview-card-2-info">
            <div class="p2p-item-preview-card-2-item">
              <div class="p2p-item-preview-card-2-item-asset">
                <BitcoinBlackSvg />
              </div>
              <p>
                <span>0.01741795 BTC</span>
              </p>
              <p>
                1 BTC : <span>N7,623,667.98</span>
              </p>
            </div>
            <div class="item-preview-card-2-user">
              <div class="item-preview-card-2-user-avi">
                <div class="item-preview-card-2-user-avi-img">
                  <img
                    src={`static/img/ARISTOS/${post.user?.profile?.aristo}.png`}
                  />
                </div>
                <p>@{post.user?.profile?.userName}</p>
              </div>
              <div class="item-preview-card-2-user-rep">
                <p>REP: {post.user?.profile?.repScore}%</p>
                <div class="item-preview-card-2-user-rep-avi"></div>
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

        <div onClick={showWallets} class="buy-securely-with-escrow">
          <BuySecurelySvg />
          <p>BUY SECURELY WITH ESCROW</p>
        </div>
      </div>
    </>
  );
}

export default P2PItemPreviewCard2;
