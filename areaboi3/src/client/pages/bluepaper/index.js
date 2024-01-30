import React, { useState } from 'react';
import Header from '../../components/Header';
// import AreaboiHelp from "../../components/AreaboiHelp";
// import areaboi from "./media/areaboi.png";
// import vector from "./media/AreaVector.png";
import styles from './blue.module.css';
import { accordionData } from '../../lib/data';
import Accordion from './Accordion';

function index() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Header
        subHeader={
          <>
            <div>
              <img
                className="blue-star"
                src="static/img/blue-star.svg"
                alt="symbol"
              />
            </div>
            <div className="title">
              <span>BLUE PAPER</span>
            </div>
            <div className="arrows">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 32 40"
                enableBackground="new 0 0 32 32"
                xmlSpace="preserve"
                style={{ height: '17.76px', width: '14px', fill: 'white' }}>
                <g>
                  <path d="M27.5,12.5H16.8v-2h5.9c0.1,0,0.3,0,0.4-0.1l4.8-3.2c0.2-0.1,0.3-0.4,0.3-0.6c0-0.3-0.1-0.5-0.3-0.6l-4.8-3.2   c-0.1-0.1-0.3-0.1-0.4-0.1h-5.9V1.3c0-0.4-0.3-0.8-0.8-0.8c-0.4,0-0.8,0.3-0.8,0.8v1.3H4.5c-0.4,0-0.8,0.3-0.8,0.8v6.4   c0,0.4,0.3,0.8,0.8,0.8h10.7v2H9.3c-0.1,0-0.3,0-0.4,0.1l-4.8,3.2c-0.2,0.1-0.3,0.4-0.3,0.6c0,0.3,0.1,0.5,0.3,0.6l4.8,3.2   c0.1,0.1,0.3,0.1,0.4,0.1h5.9V30h-2.7c-0.4,0-0.8,0.3-0.8,0.8s0.3,0.8,0.8,0.8h6.9c0.4,0,0.8-0.3,0.8-0.8S19.9,30,19.4,30h-2.7   v-9.6h10.7c0.4,0,0.8-0.3,0.8-0.8v-6.4C28.3,12.8,27.9,12.5,27.5,12.5z" />
                </g>
                {/* <text x="0" y="47" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Creative Stall</text>
          <text x="0" y="52" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text> */}
              </svg>
            </div>
          </>
        }
      />
      <div className={styles.contain}>
        <div className={styles.container}>
          <div className={styles.left}>
            <img src="/static/img/areaboi.png" alt="stuff" />
          </div>
          <div className={styles.right}>
            <p>
              AreaBox Co. (“AreaBox”) has created and maintains websites and
              other digital properties to support its mission to increase and
              spread knowledge, engender relationships and facilitate commerce
              among Africans. <br />
              These websites include areabox.app; maintained by the AreaBox
              developers, service providers, and programs; administration sites;
              downloadable mobile applications and application program
              interfaces. By using any of the websites, you accept and agree to
              comply with the following terms.
            </p>

            <img
              src="/static/img/AreaVector.png"
              alt="image"
              style={{ float: 'right', marginTop: '20px' }}
            />
            <h4 className={styles.terms}>Terms Of Service </h4>

            <span className={styles.table}>Table of Contents</span>
            <div className="accordion">
              {accordionData.map(({ title, content, id }) => (
                <Accordion
                  title={title}
                  content={content}
                  id={id}
                  isActive={isActive}
                  setIsActive={setIsActive}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
