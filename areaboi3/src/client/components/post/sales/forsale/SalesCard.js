import React from 'react';
import Image from 'next/image';
import Guitar from '../../../../assets/imgs/for-sale-guitar.jpg';
// import Avi from '../../../../assets/imgs/ARISTOS/11.png'
// import Reputation from '../../../../assets/imgs/baby_sphinx.png'
// import Reputation from "static/img/baby_sphinx.png"
// import Avi from 'static/img/ARISTOS/11.png'
import formatPrice from '../../../../lib/formatPrice';

function SalesCard({ post, handlePostClicked }) {
  // console.log(post)
  return (
    <div className="sales-card" onClick={handlePostClicked}>
      <div className="sales-card-type">FOR SALE</div>
      <div className="sales-card-price">
        {post.currency === 'naira' ? '₦' : '$'} {formatPrice(post.price)}
      </div>

      <div className="sales-card-items">
        <div className="sales-card-img">
          <img
            src={`${
              post.gallery?.length
                ? post.gallery[0]
                : 'static/img/for-sale-guitar.jpg'
            }`}
            alt=""
          />
        </div>
        <div className="sales-card-content">
          <h2 className="sales-card-title">{post.title}</h2>
          <p className="sales-card-description">
            {post.description}{' '}
            {post.negotiable && (
              <span className="sales-card-description-excerpt">
                N{post.price} or best offer.
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="sales-card-owner">
        <div className="sales-card-owner-avi">
          <img
            src={`${
              post.user?.profile?.aristo
                ? `static/img/ARISTOS/${post.user?.profile?.aristo}.png`
                : 'static/img/ARISTOS/1.png'
            } `}
          />
          {post.user || '@vagabondd'}
        </div>
        <div className="sales-card-owner-rep">
          <img src="static/img/baby_sphinx.png" /> REP:{' '}
          {post.user?.profile?.repScore ? post.user?.profile?.repScore : '50'}%
        </div>
      </div>
    </div>
  );
}

export default SalesCard;
