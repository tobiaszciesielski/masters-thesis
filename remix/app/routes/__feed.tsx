import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { NavLink, Outlet, useLoaderData, useParams } from '@remix-run/react';
import FeedToggle from '~/components/FeedToggle';
import { useEffect, useState } from 'react';
import { getAllTags } from '~/services/tags';
import { useUser } from '~/context/user';

export const loader: LoaderFunction = async () => {
  const response = await getAllTags();
  const tags = await response.json();

  return json(tags);
};

export default function FeedLayout() {
  const user = useUser();
  const { tags } = useLoaderData();
  const params = useParams();
  const [selectedTag, setSelectedTag] = useState(params.tag);

  useEffect(() => {
    setSelectedTag(params.tag);
  }, [params.tag]);

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

            <Outlet />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags.map((tag: string, i: number) => (
                  <NavLink
                    to={`${tag}`}
                    key={i}
                    className="tag-pill tag-default"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
