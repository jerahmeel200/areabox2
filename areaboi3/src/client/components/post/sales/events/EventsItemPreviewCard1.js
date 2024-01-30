import React, { useState } from 'react';

import CarouselLeftArrow from '../../../../assets/svgComponents/CarouselLeftArrow';
import CarouselRightArrow from '../../../../assets/svgComponents/CarouselRightArrow';

import BabySphinx from '../../../../assets/imgs/baby_sphinx.png';
import Avi from '../../../../assets/imgs/ARISTOS/2.png';
import Book from '../../../../assets/imgs/book.png';
import Guitar from '../../../../assets/imgs/for-sale-guitar.jpg';
import Samsung from '../../../../assets/imgs/for-sale-samsung.jpg';

import DeleteIconSmSvg from '../../../../assets/svgComponents/DeleteIconSmSvg';
import ShareIconSmSvg from '../../../../assets/svgComponents/ShareIconSmSvg';

import formatPrice from '../../../../lib/formatPrice';
import LocationSvg from '../../../../assets/svgComponents/LocationSvg';
import MessageSvg from '../../../../assets/svgComponents/MessageSvg';
import AttendSvg from '../../../../assets/svgComponents/AttendSvg';
import { auth } from '../../../../settings/firebase';

function EventsItemPreviewCard1({
  post,
  handleAttendClicked,
  handleEditEventsForm,
  postClicked,
  gallery
}) {
  const images = [
    // Book,
    // Guitar,
    // Samsung,
    'static/img/for-sale-guitar.jpg',
    'static/img/book.png',
    'static/img/for-sale-samsung.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? post.gallery.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === post.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleDeletePost = () => {
    console.log(post);
  };
  const handleSharePost = () => {
    console.log(post);
  };

  const handleEditPost = () => {
    localStorage.setItem('areaboxEvents', JSON.stringify(post));
    handleEditEventsForm();
  };

  return (
    <>
      {console.log(post)}
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
                post.gallery?.length
                  ? post.gallery[currentIndex]
                  : images[currentIndex]
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
        <div class="events-item-preview-card-tags">
          <div class="item-preview-card-tag">Community Activities</div>
        </div>
        <p className="events-item-preview-card-description">
          Serious people only. Send me a message and let us talk. Same day
          delivery.
        </p>
        <div class="item-preview-card-rep">
          <p>
            REP:{' '}
            {post.user?.profile?.repScore ? post.user?.profile?.repScore : '50'}
            %
          </p>
          <img src="static/img/baby_sphinx.png" />
        </div>
        <div class="item-preview-card-actions">
          {postClicked ? (
            <div class="item-preview-card-delete">
              <MessageSvg />
              Message
            </div>
          ) : (
            <div class="item-preview-card-delete">
              <img src="static/img/delete.png" alt="delete" />
              Delete
            </div>
          )}
          <div class="item-preview-card-user">
            {/* <img src='static/img/ARISTOS/2.png'/> */}
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
          {postClicked ? (
            auth.currentUser === post.user ? (
              <div onClick={handleEditPost} class="item-preview-card-edit">
                <img src="static/img/edit.png" alt="edit" />
                Edit
              </div>
            ) : (
              <div onClick={handleAttendClicked} class="item-preview-card-edit">
                <AttendSvg />
                Attend
              </div>
            )
          ) : (
            <div onClick={handleEditPost} class="item-preview-card-edit">
              <img src="static/img/edit.png" alt="edit" />
              Edit
            </div>
          )}
        </div>
      </div>
      <div class="item-preview-card-footer">
        <p>Posted: 9 days ago</p>
        <div class="item-preview-card-footer-actions">
          <div class="delete-btn">
            <DeleteIconSmSvg onClick={handleDeletePost} />
          </div>
          <div class="share-btn">
            <ShareIconSmSvg onClick={handleSharePost} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsItemPreviewCard1;
