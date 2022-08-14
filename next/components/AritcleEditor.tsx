import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from '../context/user';
import { Article } from '../models/Article';
import { makeRequest } from '../services/api';

interface ArticleEditorProps {
  article?: Article;
}

export const ArticleEditor = ({ article }: ArticleEditorProps) => {
  const user = useUser();
  const router = useRouter();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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
      router.push(`/articles/${article.slug}`);
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
                    defaultValue={article?.title}
                    name="title"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    required
                    defaultValue={article?.description}
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    required
                    defaultValue={article?.body}
                    name="body"
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    defaultValue={article?.tagList.reduce(
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
                  {article ? 'Edit' : 'Publish'} Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
