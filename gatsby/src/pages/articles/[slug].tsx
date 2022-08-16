import React, { useState } from 'react';
import { makeRequest } from '../../../services/api';

import { GetServerData } from 'gatsby';
import { useParams } from '@reach/router';
import { Link } from 'gatsby';

import { ArticleMeta } from '../../../components/ArticleMeta';
import { AuthRequired } from '../../../components/AuthRequired';
import { useUser } from '../../../context/user';
import { Article } from '../../../models/Article';
import { Comment } from '../../../models/Comment';
import { TagList } from '../../../components/TagList';
import { addComment } from '../../../services/article';

interface ArticleDetailsProps {
  article: Article;
  comments: Comment[];
}

export const getServerData: GetServerData<any> = async (req) => {
  const slug = req.params?.slug as string;
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
};

const ArticleDetails = (props: _PageProps<ArticleDetailsProps>) => {
  const params = useParams();
  const [comments, setComments] = useState(props.serverData?.comments);

  const user = useUser();

  const deleteComment = async (commentToDelete: Comment) => {
    const response = await makeRequest(
      `/articles/${params.slug}/comments/${commentToDelete.id}`,
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

  const addArticleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget) as any;
    const commentBody = Object.fromEntries(formData);
    const slug = params.slug as string;
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
          <h1>{props.serverData?.article.title}</h1>

          <ArticleMeta user={user} article={props.serverData?.article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">{props.serverData?.article.body}</div>
        </div>

        {!!props.serverData?.article.tagList.length && (
          <TagList tags={props.serverData?.article.tagList} />
        )}

        <hr />

        <div className="article-actions">
          <ArticleMeta user={user} article={props.serverData?.article} />
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
                  <Link
                    className="comment-author"
                    to={`profile/${user?.username}`}
                  >
                    {user?.username}
                  </Link>
                </div>
              </form>

              {!!comments?.length &&
                comments.map((comment) => (
                  <div key={comment.id} className="card">
                    <div className="card-block">
                      <p className="card-text">{comment.body}</p>
                    </div>
                    <div className="card-footer">
                      <Link
                        className="comment-author"
                        to={`profile/${comment.author.username}`}
                      >
                        <img
                          src={comment.author.image}
                          className="comment-author-img"
                          alt=""
                        />
                      </Link>
                      &nbsp;
                      <Link
                        className="comment-author"
                        to={`profile/${comment.author.username}`}
                      >
                        {comment.author.username}
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
