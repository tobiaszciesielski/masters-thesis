import { NavLink } from '@remix-run/react';
import AuthRequired from '../AuthRequired/AuthRequired';

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
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : defaultClass
              }
              to="/feed"
              onClick={clearSelectedTag}
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
            onClick={clearSelectedTag}
          >
            Global feed
          </NavLink>
        </li>

        {selectedTag && (
          <li className="nav-item">
            <NavLink className={activeClass} to={`${selectedTag}`}>
              # {selectedTag}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
