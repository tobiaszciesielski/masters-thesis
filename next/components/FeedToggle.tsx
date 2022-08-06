import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthRequired from './AuthRequired';

const defaultClass = 'nav-link';
const activeClass = `${defaultClass} active`;

interface FeedToggleProps {
  selectedTag?: string;
  clearSelectedTag: () => void;
}

const FeedToggle = ({ selectedTag, clearSelectedTag }: FeedToggleProps) => {
  const router = useRouter();

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <AuthRequired>
          <li className="nav-item">
            <Link href="/feed">
              <a
                className={
                  router.pathname === '/feed' ? activeClass : defaultClass
                }
                onClick={clearSelectedTag}
              >
                Your Feed
              </a>
            </Link>
          </li>
        </AuthRequired>

        <li className="nav-item">
          <Link href="/">
            <a
              className={router.pathname === '/' ? activeClass : defaultClass}
              onClick={clearSelectedTag}
            >
              Global feed
            </a>
          </Link>
        </li>

        {selectedTag && (
          <li className="nav-item">
            <Link href={`${selectedTag}`}>
              <a className={activeClass}># {selectedTag}</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
