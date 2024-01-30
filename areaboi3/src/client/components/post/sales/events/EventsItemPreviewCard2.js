import React, { useState } from 'react';

import CarouselLeftArrow from '../../../../assets/svgComponents/CarouselLeftArrow';
import CarouselRightArrow from '../../../../assets/svgComponents/CarouselRightArrow';

import BabySphinx from '../../../../assets/imgs/baby_sphinx.png';
import Avi from '../../../../assets/imgs/ARISTOS/2.png';
import Book from '../../../../assets/imgs/book.png';
import Guitar from '../../../../assets/imgs/for-sale-guitar.jpg';
import Samsung from '../../../../assets/imgs/for-sale-samsung.jpg';

import formatPrice from '../../../../lib/formatPrice';
import LocationSvg from '../../../../assets/svgComponents/LocationSvg';
import AttendSvg from '../../../../assets/svgComponents/AttendSvg';

function EventsItemPreviewCard2({
  post,
  showWallets,
  gallery,
  getSaleInformation
}) {
  const image = [
    // Book,
    // Guitar,
    // Samsung
    'static/img/for-sale-guitar.jpg',
    'static/img/book.png',
    'static/img/for-sale-samsung.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleDeletePost = () => {
    console.log(post);
  };
  const handleSharePost = () => {
    console.log(post);
  };

  const attend = () => {
    getSaleInformation(post);
    showWallets();
  };
  return (
    <>
      <div class="item-preview-card-2">
        <div className="item-preview-card">
          <div class="sales-form-label">EVENTS</div>
          {/* <div className='sales-card-price'>{post.currency === 'naira' ? 'N' : '$'} {formatPrice(post.price)}</div> */}
          <div className="sales-card-price">FREE</div>
          <h3>{post.title}</h3>
          <div className="sales-carousel">
            <div className="sales-carousel-arrow" onClick={goToPrevious}>
              <CarouselLeftArrow />
            </div>
            <div class="sales-carousel-image-div">
              <img
                src={
                  gallery.length ? gallery[currentIndex] : image[currentIndex]
                }
                alt={`Image ${currentIndex + 1}`}
                className="sales-carousel-image"
              />
            </div>

            <div className="sales-carousel-arrow" onClick={goToNext}>
              <CarouselRightArrow />
            </div>
          </div>
          <div class="events-item-preview-card-info">
            <p>DEC 24. 9.AM PRIVATE</p>
            <div class="events-item-preview-card-location">
              <LocationSvg /> Ikeja
            </div>
            <div class="events-item-preview-card-attending">+17 Attending</div>
          </div>
          <div class="item-preview-card-tags">
            <div class="item-preview-card-tag">Community Activities</div>
            {/* <div class="item-preview-card-tag">{post.negotiable ? "NEGOTIABLE" : "NOT-NEGOTIABLE"}</div> */}
          </div>
          <p className="item-preview-card-description">
            Serious people only. Send me a message and let us talk. Same day
            delivery.
          </p>
          <div class="events-item-preview-card-2-user-container">
            <div class="item-preview-card-user">
              {/* <img src='static/img/ARISTOS/11.png'/> */}
              <img
                src={`${
                  post.user?.profile?.aristo
                    ? `static/img/ARISTOS/${post.user?.profile?.aristo}.png`
                    : 'static/img/ARISTOS/1.png'
                } `}
              />
              <p>
                {post.user?.profile?.userName
                  ? post.user?.profile?.userName
                  : '@vagabondd'}
              </p>
            </div>
            <div class="item-preview-card-rep">
              <p>
                REP:{' '}
                {post.user?.profile?.repScore
                  ? post.user?.profile?.repScore
                  : '50'}
                %
              </p>
              <img src="static/img/baby_sphinx.png" />
            </div>
          </div>
        </div>
      </div>
      <div onClick={attend} class="buy-securely-with-escrow">
        <AttendSvg />
        <p>ATTEND THIS EVENT</p>
      </div>
    </>
  );
}

export default EventsItemPreviewCard2;
