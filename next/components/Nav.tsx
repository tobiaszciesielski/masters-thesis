import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../context/user';

const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

export default function Nav() {
  const user = useUser();
  const router = useRouter();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link href="/" passHref>
          <a className="navbar-brand">conduit</a>
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link href="/">
              <a
                className={router.pathname === '/' ? activeClass : defaultClass}
              >
                Home
              </a>
            </Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <Link href="/editor/">
                  <a
                    className={
                      router.pathname === '/editor/'
                        ? activeClass
                        : defaultClass
                    }
                  >
                    <i className="ion-compose"></i>&nbsp;New Article
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/settings">
                  <a
                    className={
                      router.pathname === '/settings'
                        ? activeClass
                        : defaultClass
                    }
                  >
                    <i className="ion-gear-a"></i>&nbsp;Settings
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href={`/profile/${user?.username}`}>
                  <a
                    className={
                      router.pathname === `/profile/${user?.username}`
                        ? activeClass
                        : defaultClass
                    }
                  >
                    {user?.username}
                  </a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/login">
                  <a
                    className={
                      router.pathname === '/login' ? activeClass : defaultClass
                    }
                  >
                    Sign in
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register">
                  <a
                    className={
                      router.pathname === '/register'
                        ? activeClass
                        : defaultClass
                    }
                  >
                    Sign up
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
