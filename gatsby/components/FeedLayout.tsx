import { useParams } from '@reach/router';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';
import FeedToggle from './FeedToggle';

interface FeedLayoutProps {
  children: React.ReactNode;
  tags: string[];
}

export function FeedLayout({ children, tags }: FeedLayoutProps) {
  const { tag } = useParams();

  const [selectedTag, setSelectedTag] = useState(tag);

  useEffect(() => {
    setSelectedTag(tag);
  }, [tag]);

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
                  <Link to={`${tag}`} key={i}>
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
