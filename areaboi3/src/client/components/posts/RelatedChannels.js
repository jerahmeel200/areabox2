import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class RelatedChannels extends Component {
  render() {
    const { page } = this.props;

    console.log(' RelatedChannels', page.relatedChannels);

    return (
      <>
        <div className="rel-channels-container">
          {page.relatedChannels &&
            Object.keys(page.relatedChannels).length > 1 &&
            Object.values(page.relatedChannels).map((c) => (
              <div className="channel-cont">
                <Link key={c.key} href={`?rk=${c.key}`}>
                  <span className="a-rel-channel">{c.title}</span>
                </Link>
              </div>
            ))}
        </div>
        <style jsx>{`
          .rel-channels-container {
            display: flex;
            flex-direction: column;
          }
          .channel-cont {
            width: 92px;
            height: 24.5px;
          }
          .a-rel-channel {
            display: flex;
            font-size: 12px;
            font-family: 'ScriberStencil', sans-serif;
            width: 100%;
            height: 100%;
            border: solid 0.25px #929595;
            padding: 0px 3px;
            align-items: center;
            cursor: pointer;
            background: white;
            color: #222222;
          }
          .a-rel-channel:hover {
            color: #1505cc;
          }
        `}</style>
      </>
    );
  }
}
//.reverse()

RelatedChannels.propTypes = {
  page: PropTypes.object.isRequired
};
