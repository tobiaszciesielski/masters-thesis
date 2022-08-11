import React from 'react';

import { Article } from '../models/Article';
import { User } from '../models/User';
import { makeRequest } from '../services/api';
import { Link, navigate } from 'gatsby';
import { AuthRequired } from './AuthRequired';

export interface ArticleMetaProps {
  article: Article;
  user: User | null;
}

export const ArticleMeta = (props: ArticleMetaProps) => {
  const deleteArticle = async () => {
    const response = await makeRequest(
      `/articles/${props.article?.slug}`,
      'DELETE',
      {},
      props.user?.token
    );

    if (response.status === 200) {
      navigate('/');
    }
  };

  return (
    <div className="article-meta">
      <Link to={`/profile/${props.article?.author.username}`}>
        <img src={props.article?.author.image} alt="" />
      </Link>
      <div className="info">
        <Link
          className="author"
          to={`/profile/${props.article?.author.username}`}
        >
          {props.article?.author.username}
        </Link>
        <span className="date">{props.article?.createdAt}</span>
      </div>
      <AuthRequired>
        {props.article?.author.username === props.user?.username ? (
          <>
            <Link
              className="btn btn-outline-secondary btn-sm"
              to={`/editor/${props.article?.slug}`}
            >
              <i className="ion-edit"></i> Edit Article
            </Link>
            &nbsp;&nbsp;
            <button
              onClick={deleteArticle}
              className="btn btn-outline-danger btn-sm"
            >
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {props.article?.author.username}{' '}
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post{' '}
              <span className="counter">({props.article?.favoritesCount})</span>
            </button>
          </>
        )}
      </AuthRequired>
    </div>
  );
};
