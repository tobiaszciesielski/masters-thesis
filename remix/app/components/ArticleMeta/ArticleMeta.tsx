import { NavLink } from '@remix-run/react';
import type { Article } from '~/models/Article';

export interface ArticleMetaProps {
  article: Article;
}

export const ArticleMeta = ({ article }: ArticleMetaProps) => {
  return (
    <div className="article-meta">
      <NavLink to={`/profile/${article.author.username}`}>
        <img src={article.author.image} alt="" />
      </NavLink>
      <div className="info">
        <NavLink to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </NavLink>
        <span className="date">{article.createdAt}</span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; Follow {article.author.username}{' '}
        <span className="counter">(TODO)</span>
      </button>
      &nbsp;&nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp; Favorite Post{' '}
        <span className="counter">({article.favoritesCount})</span>
      </button>
    </div>
  );
};
