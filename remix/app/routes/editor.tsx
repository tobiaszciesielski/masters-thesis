import { json, redirect } from '@remix-run/node';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { makeRequest } from '~/services/api';
import { requireUserSession } from '~/lib/session-utils';
import { useActionData } from '@remix-run/react';

interface ArticleData {
  title?: string;
  body?: string;
  description?: string;
  tagList?: string[];
}
export const loader: LoaderFunction = async ({ request }) => {
  await requireUserSession(request);
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let values = Object.fromEntries(formData) as ArticleData;

  // @ts-ignore
  const tagList = values.tags.split(' ');
  values = { ...values, tagList };

  const user = await requireUserSession(request);

  const response = await makeRequest(
    '/articles',
    'POST',
    { article: values },
    user?.token
  );

  if (response.status !== 200) {
    return json({ error: 'Please try again' });
  }

  // TODO redirect to newly created article
  return redirect('/');
};

export default function Editor() {
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
                    name="title"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    required
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    required
                    name="body"
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="tags"
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
