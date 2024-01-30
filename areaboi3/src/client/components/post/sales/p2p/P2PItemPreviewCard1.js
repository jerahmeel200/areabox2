import React from 'react';

import BabySphinx from '../../../../assets/imgs/baby_sphinx.png';
import Avi from '../../../../assets/imgs/ARISTOS/2.png';
import MessageSvg from '../../../../assets/svgComponents/MessageSvg';
import TradeSvg from '../../../../assets/svgComponents/TradeSvg';

import { auth } from '../../../../settings/firebase';

function P2PItemPreviewCard1({ post, handleTradeClicked, gallery }) {
  return (
    <>
      <div className="item-preview-card">
        <div class="sales-form-label">P2P CRYPTO EXCHANGE</div>
        {/* <div className='sales-card-price'>{post.currency === 'naira' ? 'N' : '$'} {formatPrice(post.price)}</div> */}
        <p className="p2p-item-preview-card-created">
          <span>Created: 19 minutes ago</span>
          <span>Edited: 17 minutes ago</span>
        </p>
        <div class="p2p-item-preview-card-content">
          <div class="p2p-item-preview-card-asset"></div>
          <p class="p2p-item-preview-card-title">Buy Bitcoin</p>

          <div class="p2p-item-preview-card-info">
            <p>
              AVAILABLE: <span>0.01741795 BTC</span>
            </p>
            <p>
              RATE: <span>N7,632,000.00</span>
            </p>
            <p>
              NEEDING: <span>N132,000</span>
            </p>
          </div>
        </div>
        <div class="item-preview-card-rep">
          <p>REP: 60%</p>
          <img src={BabySphinx} alt="rep" />
        </div>
        <div class="item-preview-card-actions">
          <div class="item-preview-card-delete">
            <MessageSvg />
            Message
          </div>
          <div class="item-preview-card-user">
            <img src={Avi} alt="user" />
            <p>@vagabondd</p>
          </div>
          <div onClick={handleTradeClicked} class="item-preview-card-edit">
            <TradeSvg />
            Trade
          </div>
        </div>
      </div>
      {/* <div class="item-preview-card-footer">
      <p>Posted: 9 days ago</p>
      <div class="item-preview-card-footer-actions">
        <div class="delete-btn">
          <DeleteIconSmSvg onClick={handleDeletePost}/>
        </div>
        <div class="share-btn">
          <ShareIconSmSvg onClick={handleSharePost}/>
        </div>
      </div>
    </div> */}
    </>
  );
}

export default P2PItemPreviewCard1;
