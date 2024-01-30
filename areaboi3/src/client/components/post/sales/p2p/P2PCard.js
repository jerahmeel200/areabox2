import React from 'react';
import Image from 'next/image';
import Guitar from '../../../../assets/imgs/for-sale-guitar.jpg';
import Avi from '../../../../assets/imgs/ARISTOS/11.png';
import Reputation from '../../../../assets/imgs/baby_sphinx.png';

function P2pCard({ post, handlePostClicked }) {
  return (
    <div className="sales-card" onClick={handlePostClicked}>
      <div className="sales-card-type">P2P</div>
      <div className="events-rep">
        <div className="events-rep-avi"></div>
        <p>
          Rep:{' '}
          {post.user?.profile?.repScore ? post.user?.profile?.repScore : '50%'}%
        </p>
      </div>

      <p className="p2p-asset-name">Bitcoin</p>

      <div className="sales-card-items">
        <div className="p2p-card-img">
          <img src={Guitar} />
        </div>
        <div className="p2p-card-content">
          <div className="p2p-content">
            <div className="p2p-content-left">
              <p>
                AVAILABLE: <span>0.0174795 BTC</span>
              </p>
              <p>
                RATE: <span>N23,600,000.00</span>
              </p>
              <p>
                LIMIT: <span>N100,000 - 411,000</span>
              </p>
            </div>

            <div className="events-user">
              <div className="events-user-avi">
                <img
                  src={`static/img/ARISTOS/${
                    post.user?.profile?.aristo
                      ? post.user?.profile?.aristo
                      : '1'
                  }.png`}
                  alt={post.user?.profile?.aristo}
                />
              </div>
              <p>{post.user?.profile?.userName || '@vagabondd'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default P2pCard;
