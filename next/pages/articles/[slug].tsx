import { GetServerSideProps, NextPage } from 'next';

import { withIronSessionSsr } from 'iron-session/next';

import { makeRequest } from '../../services/api';
import { Article } from '../../models/Article';
import { useUser } from '../../context/user';
import { useState } from 'react';
import { Comment } from '../../models/Comment';
import { ArticleMeta } from '../../components/ArticleMeta';
import { TagList } from '../../components/TagList';
import AuthRequired from '../../components/AuthRequired';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { sessionOptions } from '../../lib/session';

interface ArticleDetailsProps {
  article: Article;
  comments: Comment[];
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, query }) => {
    const slug = query.slug as string;
    if (!slug) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const [articleResponse, commentsResponse] = await Promise.all([
      makeRequest(`/articles/${slug}`, 'GET', {}),
      makeRequest(`/articles/${slug}/comments`, 'GET', {}),
    ]);

    if (articleResponse.status === 404) {
      throw new Response('Not Found', {
        status: 404,
      });
    }

    const { article } = await articleResponse.json();
    const { comments } = await commentsResponse.json();

    return { props: { article, comments } };
  },
  sessionOptions
);

const ArticleDetails: NextPage<ArticleDetailsProps> = ({
  article,
  comments: articleComments,
}) => {
  const router = useRouter();
  const [comments, setComments] = useState(articleComments);

  const user = useUser();

  const deleteComment = async (commentToDelete: Comment) => {
    const response = await makeRequest(
      `/articles/${router.query.slug}/comments/${commentToDelete.id}`,
      'DELETE',
      {},
      user?.token
    );

    if (response.status !== 200) {
      return;
    }

    setComments(
      comments.filter((comment) => comment.id !== commentToDelete.id)
    );
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <ArticleMeta user={user} article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">{article.body}</div>
        </div>

        {!!article.tagList.length && <TagList tags={article.tagList} />}

        <hr />

        <div className="article-actions">
          <ArticleMeta user={user} article={article} />
        </div>

        <AuthRequired>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form method="post" className="card comment-form">
                <div className="card-block">
                  <textarea
                    name="body"
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                  ></textarea>
                </div>
                <div className="card-footer">
                  <Image
                    // @ts-ignore
                    src={user?.image}
                    width={32}
                    height={32}
                    className="comment-author-img"
                    alt=""
                  />
                  <button className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                  &nbsp;
                  <Link href={`profile/${user?.username}`}>
                    <a className="comment-author">{user?.username}</a>
                  </Link>
                </div>
              </form>

              {!!comments.length &&
                comments.map((comment) => (
                  <div key={comment.id} className="card">
                    <div className="card-block">
                      <p className="card-text">{comment.body}</p>
                    </div>
                    <div className="card-footer">
                      <Link href={`profile/${comment.author.username}`}>
                        <a className="comment-author">
                          <Image
                            width={32}
                            height={32}
                            src={comment.author.image}
                            className="comment-author-img"
                            alt=""
                          />
                        </a>
                      </Link>
                      &nbsp;
                      <Link href={`profile/${comment.author.username}`}>
                        <a className="comment-author">
                          {comment.author.username}
                        </a>
                      </Link>
                      <span className="date-posted">{comment.createdAt}</span>
                      {user?.username === comment.author.username && (
                        <div className="mod-options">
                          <i
                            onClick={() => deleteComment(comment)}
                            className="ion-trash-a"
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </AuthRequired>
      </div>
    </div>
  );
};

export default ArticleDetails;
