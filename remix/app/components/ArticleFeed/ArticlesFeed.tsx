import { redirect } from '@remix-run/node';
import { NavLink, useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useUser } from '~/context/user';

import type { Article } from '~/models/Article';
import { addToFavorites, removeFromFavorites } from '~/services/article';

import { TagList } from '../TagsList/TagList';

interface ArticleFeedProps {
  articlesFeed: Article[];
}

export const ArticlesFeed = ({ articlesFeed }: ArticleFeedProps) => {
  const [articles, setArticles] = useState(articlesFeed);
  const user = useUser();
  const navigate = useNavigate();

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

              <button
                onClick={() => toggleLike(article)}
                className={`btn btn-sm pull-xs-right ${
                  article.favorited ? 'btn-primary' : 'btn-outline-primary'
                }`}
              >
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
