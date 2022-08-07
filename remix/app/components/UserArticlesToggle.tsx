import { NavLink } from '@remix-run/react';
import AuthRequired from './AuthRequired';

const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

const UserArticlesToggle = () => {
  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClass : defaultClass
            }
            to=""
            end
          >
            My Articles
          </NavLink>
        </li>

        <AuthRequired>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : defaultClass
              }
              to="favorites"
            >
              Favorited Articles
            </NavLink>
          </li>
        </AuthRequired>
      </ul>
    </div>
  );
};

export default UserArticlesToggle;
