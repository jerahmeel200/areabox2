import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Dropdown,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'shards-react';
import axios from 'axios';
import FeedItem from './FeedItem';
// import firestore from '../../firebase'

import Spinner from '../common/Spinner';

const FeedCard = ({ title }) => {
  const [feeds, setFeeds] = useState([]);
  const [feedSrc, setFeedSrc] = useState({
    name: 'BBC',
    url: 'http://feeds.bbci.co.uk/news/rss.xml'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const rssSources = [
    { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/rss.xml' },
    {
      name: 'Time',
      url: 'http://feeds.feedburner.com/time/topstories?fmt=xml'
    },
    {
      name: 'The Huffington Post',
      url: 'http://www.huffingtonpost.com/feeds/index.xml'
    },
    {
      name: 'The New York Times',
      url: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    },
    {
      name: 'Reddit',
      url: 'https://www.reddit.com/.rss'
    },
    {
      name: 'CNN',
      url: 'http://rss.cnn.com/rss/edition.rss'
    }
  ];

  const getFeed = (url) => {
    const params = {
      url
    };

    setIsLoading(true);
    axios
      .get(
        'get-feeds',
        { params },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        setFeeds(res.data);
        setIsLoading(false);
      })
      .catch((e) => console.error('Failed to get feeds, >', e));
  };

  const handleFeeds = (name, url) => {
    setFeedSrc({ name, url });
    getFeed(url);
  };

  useEffect(() => {
    getFeed(feedSrc.url);
  }, []);

  return (
    <Card small className="mb-3">
      <CardHeader className="border-bottom">
        <h4 className="m-0">{title}</h4>
      </CardHeader>
      <div className="p-3">
        <Dropdown
          className="mb-3"
          open={dropdownOpen}
          toggle={() => setDropdownOpen(!dropdownOpen)}>
          <DropdownToggle caret>{feedSrc.name}</DropdownToggle>
          <DropdownMenu>
            {rssSources.map((source, index) => (
              <DropdownItem
                key={index}
                onClick={() => handleFeeds(source.name, source.url)}>
                {source.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <section>
          {isLoading ? (
            <Spinner />
          ) : (
            <ul className="list-unstyled list-group overflow-auto">
              {feeds &&
                feeds
                  .slice(0)
                  .reverse()
                  .map((feed, index) => (
                    <FeedItem key={index} feed={feed} index={index} />
                  ))}
            </ul>
          )}
        </section>
      </div>
    </Card>
  );
};

FeedCard.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

FeedCard.defaultProps = {
  title: 'Feed'
};

export default FeedCard;
