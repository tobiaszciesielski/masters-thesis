import React from 'react';
import { Article } from '../models/Article';

interface ArticleEditorProps {
  article?: Article;
}

export const ArticleEditor = ({ article }: ArticleEditorProps) => {
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form method="post">
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
