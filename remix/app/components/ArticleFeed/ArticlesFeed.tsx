import { NavLink } from '@remix-run/react';
import type { Article } from '~/models/Article';

interface ArticleFeedProps {
  articles: Article[];
}

export const ArticlesFeed = ({ articles }: ArticleFeedProps) => {
  return (
    <>
      {articles?.length ? (
        articles.map((article: Article) => (
          <div key={article.slug} className="article-preview">
            <div className="article-meta">
              <a href="profile.html">
                <img src={article.author.image} alt="" />
              </a>
              <div className="info">
                <NavLink
                  to={`/profile/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}
                </NavLink>
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
        ))
      ) : (
        <div className="article-preview">No articles found</div>
      )}
    </>
  );
};
