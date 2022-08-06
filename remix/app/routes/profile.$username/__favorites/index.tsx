import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { makeRequest } from '~/services/api';
import { ArticlesFeed } from '~/components/ArticleFeed/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';
import { getUser } from '~/lib/session-utils';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { username } = params;
  const user = await getUser(request);

  return json(
    await makeRequest(
      `/articles?author=${username}`,
      'GET',
      {},
      user?.token
    ).then((res) => res.json())
  );
};

export default function UserArticles() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articlesFeed={articles} />;
}
