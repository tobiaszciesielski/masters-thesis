import { Link } from 'gatsby';
import React from 'react';
import { useUser } from '../context/user';

const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

export default function Nav() {
  const user = useUser();
  console.log(user)

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className={defaultClass} activeClassName={activeClass} to="/">
              Home
            </Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <Link
                  className={defaultClass}
                  activeClassName={activeClass}
                  to="/editor/"
                >
                  <i className="ion-compose"></i>&nbsp;New Article
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={defaultClass}
                  activeClassName={activeClass}
                  to="/settings"
                >
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={defaultClass}
                  activeClassName={activeClass}
                  to={`/profile/${user?.username}`}
                >
                  {user?.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  className={defaultClass}
                  activeClassName={activeClass}
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={defaultClass}
                  activeClassName={activeClass}
                  to="/register"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
