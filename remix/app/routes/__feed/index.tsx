import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { makeRequest } from '~/services/api';
import { ArticlesFeed } from '~/components/ArticleFeed/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';

export const loader: LoaderFunction = async () => {
  const articlesResponse = await makeRequest('/articles', 'GET', {
    limit: 20,
    offset: 0,
  });
  const articles = await articlesResponse.json();
  return json<ArticlesResponse>(articles);
};

export default function GlobalFeed() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articles={articles} />;
}
