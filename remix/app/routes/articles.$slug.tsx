import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { NavLink, useLoaderData, useParams } from '@remix-run/react';
import { useState } from 'react';
import { ArticleMeta } from '~/components/ArticleMeta';
import { AuthRequired } from '~/components/AuthRequired';
import { TagList } from '~/components/TagList';
import { useUser } from '~/context/user';
import type { Article } from '~/models/Article';
import type { Comment } from '~/models/Comment';
import { makeRequest } from '~/services/api';
import { addComment, deleteComment } from '~/services/article';

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

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
  return json({ article, comments });
};

export default function ArticleDetails() {
  const articleData = useLoaderData<{
    article: Article;
    comments: Comment[];
  }>();
  const [comments, setComments] = useState(articleData.comments);
  const params = useParams();
  const user = useUser();

  const deleteArticleComment = async (commentToDelete: Comment) => {
    const { slug } = params as any;
    const response = await deleteComment(user?.token, slug, commentToDelete.id);

    if (response.status !== 200) {
      return;
    }

    setComments(
      comments.filter((comment) => comment.id !== commentToDelete.id)
    );
  };

  const addArticleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const commentBody = Object.fromEntries(formData);
    const { slug } = params as any;
    const response = await addComment(user?.token, slug, commentBody);
    if (response.status !== 200) {
      return;
    }
    const { comment } = await response.json();

    setComments([comment, ...comments]);
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{articleData.article.title}</h1>

          <ArticleMeta user={user} article={articleData.article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">{articleData.article.body}</div>
        </div>

        {!!articleData.article.tagList.length && (
          <TagList tags={articleData.article.tagList} />
        )}

        <hr />

        <div className="article-actions">
          <ArticleMeta user={user} article={articleData.article} />
        </div>

        <AuthRequired>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form onSubmit={addArticleComment} className="card comment-form">
                <div className="card-block">
                  <textarea
                    name="body"
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img
                    src={user?.image}
                    className="comment-author-img"
                    alt=""
                  />
                  <button className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                  &nbsp;
                  <NavLink
                    to={`profile/${user?.username}`}
                    className="comment-author"
                  >
                    {user?.username}
                  </NavLink>
                </div>
              </form>

              {!!comments.length &&
                comments.map((comment) => (
                  <div key={comment.id} className="card">
                    <div className="card-block">
                      <p className="card-text">{comment.body}</p>
                    </div>
                    <div className="card-footer">
                      <NavLink
                        to={`profile/${comment.author.username}`}
                        className="comment-author"
                      >
                        <img
                          src={comment.author.image}
                          className="comment-author-img"
                          alt=""
                        />
                      </NavLink>
                      &nbsp;
                      <NavLink
                        to={`profile/${comment.author.username}`}
                        className="comment-author"
                      >
                        {comment.author.username}
                      </NavLink>
                      <span className="date-posted">{comment.createdAt}</span>
                      {user?.username === comment.author.username && (
                        <div className="mod-options">
                          <i
                            onClick={() => deleteArticleComment(comment)}
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
}
