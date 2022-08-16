import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthRequired } from './AuthRequired';


const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

interface UserArticlesToggleProps {
  profileName: string;
}

export const UserArticlesToggle = ({
  profileName,
}: UserArticlesToggleProps) => {
  const router = useRouter();

  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            href={{
              pathname: '/profile/[username]',
              query: { username: profileName },
            }}
          >
            <a
              className={
                router.asPath === `/profile/${profileName}`
                  ? activeClass
                  : defaultClass
              }
            >
              My Articles
            </a>
          </Link>
        </li>

        <AuthRequired>
          <li className="nav-item">
            <Link
              href={{
                pathname: '/profile/[username]/favorites',
                query: { username: profileName },
              }}
            >
              <a
                className={
                  router.asPath === `/profile/${profileName}/favorites`
                    ? activeClass
                    : defaultClass
                }
              >
                Favorited Articles
              </a>
            </Link>
          </li>
        </AuthRequired>
      </ul>
    </div>
  );
};
