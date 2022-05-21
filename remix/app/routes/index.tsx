import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import API_BASE from '~/services/api';

export const loader: LoaderFunction = async () => {
  const [{ articles }, { tags }] = await Promise.all([
    fetch(`${API_BASE}/articles`).then((res) => res.json()),
    fetch(`${API_BASE}/tags`).then((res) => res.json()),
  ]);

  return json({ articles, tags });
};

export default function Index() {
  const { articles, tags } = useLoaderData();

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
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link disabled" href="">
                    Your Feed
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>

            {articles.map((article: any) => (
              <div key={article.slug} className="article-preview">
                <div className="article-meta">
                  <a href="profile.html">
                    <img src={article.author.image} />
                  </a>
                  <div className="info">
                    <a href="" className="author">
                      {article.author.username}
                    </a>
                    <span className="date">{article.createdAt}</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {article.favoritesCount}
                  </button>
                </div>
                <a href="" className="preview-link">
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>

                  {!!article.tagList.length && (
                    <ul className="tag-list">
                      {article.tagList.map((tag: string, i: number) => (
                        <li
                          key={i}
                          className="tag-default tag-pill tag-outline ng-binding ng-scope"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </a>
              </div>
            ))}
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
