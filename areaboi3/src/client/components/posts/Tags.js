import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class Tags extends Component {
  render() {
    const { page } = this.props;

    return (
      <>
        <div className="tags-container">
          {page.room_tags &&
            Object.keys(page.room_tags)
              .sort((ta, tb) =>
                page.room_tags[ta].localeCompare(page.room_tags[tb])
              )
              .map((tag) => (
                <div>
                  <Link key={tag} href={`?tag=${tag}&rk=${page.room_key}`}>
                    <span className="channel-tag">
                      {page.room_tags[tag].substring(
                        page.room_tags[tag].indexOf('-') + 1
                      )}
                    </span>
                  </Link>
                </div>
              ))}
        </div>
        <style jsx>{`
      .tags-container{
        display: flex;
        flex-direction: row;
        width:350px
        height: 26px;
        overflow:scroll;
        margin: 3px;
        border: solid 0.2px #1505cc;

        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
      }
      
      .tags-container::-webkit-scrollbar { 
          display: none;  /* Safari and Chrome */
      }
      .channel-tag{
        display:block;
        font-size:11px;
        padding:0px 3px;
        white-space:nowrap;
        cursor:pointer;
        height:24px;
        margin:auto 3px;
        color:#1505CC
      }
      .channel-tag:hover{
        border-bottom:#1505cc solid 2px;
        
      }
      `}</style>
      </>
    );
  }
}
//.reverse()

Tags.propTypes = {
  page: PropTypes.object.isRequired
};
