import { json, redirect } from '@remix-run/node';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { makeRequest } from '~/services/api';
import { requireUserSession } from '~/lib/session-utils';
import type { Article } from '~/models/Article';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { getUserByToken } from '~/services/auth';

interface ArticleData {
  title?: string;
  body?: string;
  description?: string;
  tagList?: string[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const token = await requireUserSession(request);
  const user = await getUserByToken(token);

  const slug = params['*'];
  let article: Article | undefined = undefined;

  if (slug) {
    const response = await makeRequest(`/articles/${slug}`, 'GET', {});

    if (response.status === 200) {
      article = (await response.json()).article;

      if (user?.username !== article?.author.username) {
        return redirect('/');
      }
    } else {
      return redirect('/editor');
    }
  }

  return json({ article });
};

export const action: ActionFunction = async ({ request, params }) => {
  const token = await requireUserSession(request);

  let formData = await request.formData();
  let values = Object.fromEntries(formData) as ArticleData;

  // @ts-ignore
  const tagList = values.tags.split(' ');
  values = { ...values, tagList };

  const slug = params['*'];
  let response: globalThis.Response;

  if (slug) {
    response = await makeRequest(
      `/articles/${slug}`,
      'PUT',
      { article: values },
      token
    );
  } else {
    response = await makeRequest(
      '/articles',
      'POST',
      { article: values },
      token
    );
  }

  if (response.status !== 200) {
    return json({ error: 'Please try again' });
  }

  const { article } = await response.json();

  return redirect(`/articles/${article.slug}`);
};

export default function Editor() {
  const { article } = useLoaderData<{ article?: Article }>();
  const fetcher = useFetcher();

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <fetcher.Form method="post">
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
            </fetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}
