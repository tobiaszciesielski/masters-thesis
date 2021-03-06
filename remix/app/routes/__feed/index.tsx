import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { makeRequest } from '~/services/api';
import { ArticlesFeed } from '~/components/ArticleFeed/ArticlesFeed';
import type { Article, ArticlesResponse } from '~/models/Article';
import { useState } from 'react';
import { useUser } from '~/context/user';
import { addToFavorites, removeFromFavorites } from '~/services/article';
import { getUser } from '~/lib/session-utils';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const articlesResponse = await makeRequest(
    '/articles',
    'GET',
    {
      limit: 20,
      offset: 0,
    },
    user?.token
  );
  const articles = await articlesResponse.json();
  return json<ArticlesResponse>(articles);
};

export default function GlobalFeed() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articlesFeed={articles} />;
}
