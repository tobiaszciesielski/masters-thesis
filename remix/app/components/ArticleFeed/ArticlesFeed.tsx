import { NavLink } from '@remix-run/react';
import type { Article } from '~/models/Article';
import { TagList } from '../TagsList/TagList';

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
              <NavLink to={`/profile/${article.author.username}`}>
                <img src={article.author.image} alt="" />
              </NavLink>
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

            <NavLink to={`/articles/${article.slug}`} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
            </NavLink>

            {!!article.tagList.length && <TagList tags={article.tagList} />}
          </div>
        ))
      ) : (
        <div className="article-preview">No articles found</div>
      )}
    </>
  );
};
