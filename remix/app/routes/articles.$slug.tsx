import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { NavLink, useActionData, useLoaderData } from '@remix-run/react';
import { ArticleMeta } from '~/components/ArticleMeta/ArticleMeta';
import AuthRequired from '~/components/AuthRequired/AuthRequired';
import { TagList } from '~/components/TagsList/TagList';

import { useUser } from '~/context/user';
import { requireUserSession } from '~/lib/session-utils';

import type { Article } from '~/models/Article';
import type { Comment } from '~/models/Comment';

import { makeRequest } from '~/services/api';

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  const [articleResponse, commentsReponse] = await Promise.all([
    makeRequest(`/articles/${slug}`, 'GET', {}),
    makeRequest(`/articles/${slug}/comments`, 'GET', {}),
  ]);

  if (articleResponse.status === 404) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const { article } = await articleResponse.json();
  const { comments } = await commentsReponse.json();
  return json({ article, comments });
};

export const action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  const values = Object.fromEntries(formData) as { body: string };

  const authUser = await requireUserSession(request);

  const { slug } = params;

  const response = await makeRequest(
    `/articles/${slug}/comments`,
    'POST',
    {
      comment: values,
    },
    authUser?.token
  );
  if (response.status !== 200) {
    return json({ error: 'Please try again' });
  }
  const { comment } = await response.json();
  return json(comment);
};

export default function ArticleDetails() {
  const { article, comments } = useLoaderData<{
    article: Article;
    comments: Comment[];
  }>();
  const createdComment = useActionData<Comment>();
  console.log(createdComment);

  const user = useUser();

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          <ArticleMeta article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">{article.body}</div>
        </div>

        {!!article.tagList.length && <TagList tags={article.tagList} />}

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} />
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
