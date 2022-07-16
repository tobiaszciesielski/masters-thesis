import { NavLink } from '@remix-run/react';
import AuthRequired from '../AuthRequired/AuthRequired';

const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

const FeedToggle = () => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <AuthRequired>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : defaultClass
              }
              to="/feed"
            >
              Your Feed
            </NavLink>
          </li>
        </AuthRequired>

        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClass : defaultClass
            }
            to="/"
          >
            Global feed
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default FeedToggle;
