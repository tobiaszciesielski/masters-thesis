import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { makeRequest } from '~/services/api';
import { ArticlesFeed } from '~/components/ArticleFeed/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';
import { requireUserSession } from '~/lib/session-utils';

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUserSession(request);

  const { username } = params;

  return json(
    await makeRequest(
      `/articles/feed?author=${username}`,
      'GET',
      {},
      user?.token
    ).then((res) => res.json())
  );
};

export default function FavoritesArticles() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articles={articles} />;
}
