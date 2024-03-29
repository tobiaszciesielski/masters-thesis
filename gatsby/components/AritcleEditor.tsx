import { navigate } from 'gatsby';
import React from 'react';
import { useUser } from '../context/user';
import { Article } from '../models/Article';
import { makeRequest } from '../services/api';

interface ArticleEditorProps {
  article?: Article;
}

export const ArticleEditor = (props: ArticleEditorProps) => {
  const user = useUser();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget) as any;
    const values = Object.fromEntries(formData);
    const response = await makeRequest(
      '/editor',
      'POST',
      values,
      user?.token,
      true
    );

    if (response.status === 200) {
      const article = await response.json();
      navigate(`/articles/${article.slug}`);
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={submit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    required
                    defaultValue={props.article?.title}
                    name="title"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    required
                    defaultValue={props.article?.description}
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    required
                    defaultValue={props.article?.body}
                    name="body"
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={props.article?.tagList.reduce(
                      (prev, tag) => `${prev} ${tag}`,
                      ''
                    )}
                    name="tags"
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary">
                  {props.article ? 'Edit' : 'Publish'} Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
