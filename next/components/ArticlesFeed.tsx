import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Article } from '../models/Article';
import { User } from '../models/User';
import { addToFavorites, removeFromFavorites } from '../services/article';
import { TagList } from './TagList';

interface ArticleFeedProps {
  articlesFeed: Article[];
  user: User | null;
}

export const ArticlesFeed = ({ articlesFeed, user }: ArticleFeedProps) => {
  const [articles, setArticles] = useState(articlesFeed);
  const router = useRouter();

  const toggleLike = async (likedArticle: Article) => {
    if (!user) {
      router.push('register');
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
              <Link
                href={{
                  pathname: '/profile/[username]',
                  query: { username: article.author.username },
                }}
              >
                <a>
                  <Image
                    width={32}
                    height={32}
                    src={article.author.image}
                    alt=""
                  />
                </a>
              </Link>
              <div className="info">
                <Link
                  href={{
                    pathname: '/profile/[username]',
                    query: { username: article.author.username },
                  }}
                >
                  <a className="author">{article.author.username}</a>
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

            <Link href={`/articles/${article.slug}`}>
              <a className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
              </a>
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
