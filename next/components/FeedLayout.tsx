import Link from 'next/link';
import { useState } from 'react';

interface FeedLayoutProps {
  children: React.ReactNode;
}

export default function FeedLayout({ children }: FeedLayoutProps) {
  const { tags } = { tags: ['abba', 'bba'] }; // todo
  const params = { tag: 'undefined' }; // todo
  const [selectedTag, setSelectedTag] = useState(params.tag);

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
            {/* <FeedToggle
              selectedTag={selectedTag}
              clearSelectedTag={() => {
                setSelectedTag(undefined);
              }}
            ></FeedToggle>
            */}
            {children}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags.map((tag: string, i: number) => (
                  <Link
                    href={`${tag}`}
                    key={i}
                    onClick={() => setSelectedTag(tag)}
                  >
                    <a className="tag-pill tag-default">{tag}</a>
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
