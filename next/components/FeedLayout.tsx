import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import FeedToggle from './FeedToggle';

interface FeedLayoutProps {
  children: React.ReactNode;
  tags: string[];
}

export default function FeedLayout({ children, tags }: FeedLayoutProps) {
  const router = useRouter();
  const tagParam = router.query.tag as string | undefined;
  const [selectedTag, setSelectedTag] = useState(tagParam);

  useEffect(() => {
    setSelectedTag(tagParam);
  }, [tagParam]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle
              selectedTag={selectedTag}
              clearSelectedTag={() => {
                setSelectedTag(undefined);
              }}
            ></FeedToggle>
            {children}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags.map((tag: string, i: number) => (
                  <Link href={`${tag}`} key={i}>
                    <a
                      className="tag-pill tag-default"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
