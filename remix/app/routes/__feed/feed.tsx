import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { makeRequest } from '~/services/api';

import { requireUserSession } from '~/lib/session-utils';
import { ArticlesFeed } from '~/components/ArticleFeed/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request);

  const articlesResponse = await makeRequest(
    '/articles/feed?limit=20&offset=0',
    'GET',
    {},
    user?.token
  );
  const articles = await articlesResponse.json();

  return json<ArticlesResponse>(articles);
};

export default function UserFeed() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articles={articles} />;
}
