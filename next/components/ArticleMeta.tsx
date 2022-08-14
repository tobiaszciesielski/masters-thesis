import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Article } from '../models/Article';
import { User } from '../models/User';
import { makeRequest } from '../services/api';
import AuthRequired from './AuthRequired';

export interface ArticleMetaProps {
  article: Article;
  user: User | null;
}

export const ArticleMeta = ({ article, user }: ArticleMetaProps) => {
  const router = useRouter();

  const deleteArticle = async () => {
    const response = await makeRequest(
      `/articles/${article.slug}`,
      'DELETE',
      {},
      user?.token
    );

    if (response.status === 200) {
      router.push('/');
    }
  };

  return (
    <div className="article-meta">
      <Link href={`/profile/${article.author.username}`} passHref>
        <a>
          <Image width={32} height={32} src={article.author.image} alt="" />
        </a>
      </Link>
      <div className="info">
        <Link href={`/profile/${article.author.username}`}>
          <a className="author">{article.author.username}</a>
        </Link>
        <span className="date">{article.createdAt}</span>
      </div>
      <AuthRequired>
        {article.author.username === user?.username ? (
          <>
            <Link href={`/editor/${article.slug}`}>
              <a className="btn btn-outline-secondary btn-sm">
                <i className="ion-edit"></i> Edit Article
              </a>
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
      </AuthRequired>
    </div>
  );
};
