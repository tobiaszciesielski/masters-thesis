import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { Outlet, useLoaderData } from '@remix-run/react';
import API_BASE from '~/services/api';
import FeedToggle from '~/components/FeedToggle/FeedToggle';

export const loader: LoaderFunction = async () => {
  const tags = await fetch(`${API_BASE}/tags`).then((res) => res.json());

  return json(tags);
};

export default function FeedLayout() {
  const { tags } = useLoaderData();

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
            <FeedToggle></FeedToggle>

            <Outlet />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tags.map((tag: string, i: number) => (
                  <a key={i} href="" className="tag-pill tag-default">
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
