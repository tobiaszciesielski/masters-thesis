import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useUser } from '../context/user';
import FeedToggle from './FeedToggle';

interface FeedLayoutProps {
  children: React.ReactNode;
  tags?: string[];
  selectedTag?: string;
}

export function FeedLayout({
  children,
  tags,
  selectedTag: tagParam,
}: FeedLayoutProps) {
  const user = useUser();
  const [selectedTag, setSelectedTag] = useState(tagParam);

  useEffect(() => {
    setSelectedTag(tagParam);
  }, [tagParam]);

  return (
    <div className="home-page">
      {!user && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}

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
                {tags?.map((tag: string, i: number) => (
                  <Link
                    to={`/${tag}`}
                    key={i}
                    className="tag-pill tag-default"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
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
