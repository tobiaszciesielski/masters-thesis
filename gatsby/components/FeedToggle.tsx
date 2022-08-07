import React from 'react';
import AuthRequired from './AuthRequired';

import { Link } from 'gatsby';

const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

interface FeedToggleProps {
  selectedTag?: string;
  clearSelectedTag: () => void;
}

const FeedToggle = ({ selectedTag, clearSelectedTag }: FeedToggleProps) => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <AuthRequired>
          <li className="nav-item">
            <Link
              className={defaultClass}
              activeClassName={activeClass}
              to="/feed"
              onClick={clearSelectedTag}
            >
              Your Feed
            </Link>
          </li>
        </AuthRequired>

        <li className="nav-item">
          <Link
            className={defaultClass}
            activeClassName={activeClass}
            to="/"
            onClick={clearSelectedTag}
          >
            Global feed
          </Link>
        </li>

        {selectedTag && (
          <li className="nav-item">
            <Link
              className={defaultClass}
              activeClassName={activeClass}
              to={`${selectedTag}`}
            >
              # {selectedTag}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
