import React, { useState } from 'react';
import { Tooltip } from 'shards-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import format from 'date-fns/format';

const FeedItem = ({ feed, index }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { title, summary, link, date } = feed;

  return (
    <li key={index} className="list-group-item">
      <h5>{title}</h5>
      <p className="mb-0">{summary}</p>
      <span className="d-flex justify-content-between">
        <a href={link}>{link}</a>

        <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
          <span style={{ cursor: 'pointer' }}>
            <span id={`tip-${index}-D`}>
              <i
                className={`material-icons ${
                  copied ? 'text-success' : 'text-primary'
                }`}>
                file_copy
              </i>
            </span>
            <Tooltip
              open={tooltipOpen}
              target={`#tip-${index}-D`}
              toggle={() => setTooltipOpen(!tooltipOpen)}>
              Click to Copy
            </Tooltip>
          </span>
        </CopyToClipboard>
      </span>
      <p className="text-muted float-right">{format(new Date(date), 'Pp')}</p>
    </li>
  );
};

export default FeedItem;
