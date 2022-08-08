import { Link, navigate } from 'gatsby';
import React, { useEffect, useState } from 'react';

import { User } from '../models/User';
import { removeFromFavorites, addToFavorites } from '../services/article';
import { TagList } from './TagList';

import { Article } from '../models/Article';

interface ArticleFeedProps {
  articlesFeed: Article[];
  user: User | null;
}

export const ArticlesFeed = ({ articlesFeed, user }: ArticleFeedProps) => {
  const [articles, setArticles] = useState(articlesFeed);

  const toggleLike = async (likedArticle: Article) => {
    if (!user) {
      navigate('register');
    }

    let response;
    if (likedArticle.favorited) {
      response = await removeFromFavorites(likedArticle, user);
    } else {
      response = await addToFavorites(likedArticle, user);
    }

    if (response.status !== 200) {
      return;
    }
    const { article: responseArticle } = await response.json();

    setArticles(
      articles.map((article) =>
        article.slug === likedArticle.slug ? responseArticle : article
      )
    );
  };

  useEffect(() => {
    setArticles(articlesFeed);
  }, [articlesFeed]);

  return (
    <>
      {articles?.length ? (
        articles.map((article: Article) => (
          <div key={article.slug} className="article-preview">
            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profile/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}
                </Link>
                <span className="date">{article.createdAt}</span>
              </div>

              <button
                onClick={() => toggleLike(article)}
                className={`btn btn-sm pull-xs-right ${
                  article.favorited ? 'btn-primary' : 'btn-outline-primary'
                }`}
              >
                <i className="ion-heart"></i> {article.favoritesCount}
              </button>
            </div>

            <Link to={`/articles/${article.slug}`} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
            </Link>

            {!!article.tagList.length && <TagList tags={article.tagList} />}
          </div>
        ))
      ) : (
        <div className="article-preview">No articles found</div>
      )}
    </>
  );
};
