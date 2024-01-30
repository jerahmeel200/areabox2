import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const divStyle = {
  paddingLeft: '100px',
  paddingTop: '200px'
};

const tagStyle = {
  cursor: 'pointer',
  border: '1px solid',
  width: '30%'
};

export default class Tags extends Component {
  render() {
    const { page } = this.props;

    return (
      <div className="tags-container" style={divStyle}>
        {page.room_tags &&
          Object.keys(page.room_tags)
            .sort((ta, tb) =>
              page.room_tags[ta].localeCompare(page.room_tags[tb])
            )
            .map((tag) => (
              <div style={tagStyle} className="channel-tag">
                <Link key={tag} href={`?tag=${tag}&rk=${page.room_key}`}>
                  <span>
                    {page.room_tags[tag].substring(
                      page.room_tags[tag].indexOf('-') + 1
                    )}
                  </span>
                </Link>
              </div>
            ))}
      </div>
    );
  }
}
//.reverse()

Tags.propTypes = {
  page: PropTypes.object.isRequired
};
