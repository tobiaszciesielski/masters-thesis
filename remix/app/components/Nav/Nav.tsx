import { NavLink } from '@remix-run/react';

const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

export default function Nav() {
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
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : defaultClass
              }
              to="/"
            >
              <i className="ion-compose"></i>&nbsp;New Article
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : defaultClass
              }
              to="/"
            >
              <i className="ion-gear-a"></i>&nbsp;Settings
            </NavLink>
          </li>
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
        </ul>
      </div>
    </nav>
  );
}
