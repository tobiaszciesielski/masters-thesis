import { NavLink } from '@remix-run/react';
import type { Article } from '~/models/Article';
import { User } from '~/models/User';

export interface ArticleMetaProps {
  article: Article;
  user: User | null;
  onFollow: () => void;
  onUnfollow: () => void;
}

export const ArticleMeta = ({ article, user }: ArticleMetaProps) => {
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
      {article.author.username === user?.username ? (
        <>
          <NavLink
            className="btn btn-outline-secondary btn-sm"
            to={`/editor/${article.slug}`}
          >
            <i className="ion-edit"></i> Edit Article
          </NavLink>
          <button className="btn btn-outline-danger btn-sm">
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </>
      ) : (
        <>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round"></i>
            &nbsp; Follow {article.author.username}{' '}
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart"></i>
            &nbsp; Favorite Post{' '}
            <span className="counter">({article.favoritesCount})</span>
          </button>
        </>
      )}
    </div>
  );
};
