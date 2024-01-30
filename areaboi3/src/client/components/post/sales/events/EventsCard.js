import React from 'react';
import Image from 'next/image';
import Guitar from '../../../../assets/imgs/for-sale-guitar.jpg';
import Avi from '../../../../assets/imgs/ARISTOS/11.png';
import Reputation from '../../../../assets/imgs/baby_sphinx.png';
import formatPrice from '../../../../lib/formatPrice';
import LocationSvg from '../../../../assets/svgComponents/LocationSvg';

function EventsCard({ post, handlePostClicked }) {
  return (
    <div className="sales-card" onClick={handlePostClicked}>
      <div className="sales-card-type">EVENTS</div>
      <div className="events-rep">
        <div class="events-rep-avi">
          <img src="static/img/baby_sphinx.png" />
        </div>
        <p>Rep: {post.user?.profile?.repScore}%</p>
      </div>
      <div class="events-sub">
        <div class="events-sub-img"></div>
        <p>SUB</p>
      </div>
      <div class="events-attending">+36</div>

      <div className="sales-card-items">
        <div className="events-card-img">
          <img
            src={`${
              post.gallery?.length ? post.gallery : 'static/img/eventsimg.png'
            }`}
            alt=""
          />
        </div>
        <div className="events-card-content">
          <h2 className="sales-card-title">{post.title}</h2>
          <div class="events-content">
            <div class="events-content-left">
              <h3 className="events-date">DEC 22. Public</h3>
              <div className="events-location">
                <LocationSvg />
                <p>Ikoyi</p>
              </div>
            </div>
            <div class="events-user">
              <div class="events-user-avi">
                <img
                  src={`${
                    post.user?.profile?.aristo
                      ? `static/img/ARISTOS/${post.user?.profile?.aristo}.png`
                      : 'static/img/ARISTOS/1.png'
                  } `}
                />
              </div>
              <p>{post.user || '@vagabondd'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='sales-card-owner'>
        <div className='sales-card-owner-avi'><img src={Avi}/> @vagabondd</div>
        <div className='sales-card-owner-rep'><img src={Reputation}/> REP: 60%</div>
      </div> */}
    </div>
  );
}

export default EventsCard;
