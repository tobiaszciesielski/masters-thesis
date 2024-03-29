import { NavLink } from '@remix-run/react';
import { useUser } from '~/context/user';

const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

export const Nav = () => {
  const user = useUser();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          conduit
        </NavLink>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : defaultClass
              }
              to="/"
            >
              Home
            </NavLink>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                  to="/editor/"
                >
                  <i className="ion-compose"></i>&nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                  to="/settings"
                >
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                  to={`/profile/${user?.username}`}
                >
                  {user?.username}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                  to="/login"
                >
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                  to="/register"
                >
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
