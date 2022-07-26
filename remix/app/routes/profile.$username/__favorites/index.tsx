import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { makeRequest } from '~/services/api';
import { ArticlesFeed } from '~/components/ArticleFeed/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';

export const loader: LoaderFunction = async ({ params }) => {
  const { username } = params;

  return json(
    await makeRequest(`/articles?author=${username}`, 'GET', {}).then((res) =>
      res.json()
    )
  );
};

export default function UserArticles() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articlesFeed={articles} />;
}
