import { Link } from 'gatsby';

import React from 'react';

import { AuthRequired } from './AuthRequired';

const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

interface UserArticlesToggleProps {
  profileName: string;
}

export const UserArticlesToggle = ({
  profileName,
}: UserArticlesToggleProps) => {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            to={`/profile/${profileName}`}
            className={defaultClass}
            activeClassName={activeClass}
          >
            My Articles
          </Link>
        </li>

        <AuthRequired>
          <li className="nav-item">
            <Link
              to={`/profile/${profileName}/favorites`}
              className={defaultClass}
              activeClassName={activeClass}
            >
              Favorited Articles
            </Link>
          </li>
        </AuthRequired>
      </ul>
    </div>
  );
};
