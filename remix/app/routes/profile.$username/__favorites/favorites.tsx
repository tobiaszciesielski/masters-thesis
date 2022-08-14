import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { ArticlesFeed } from '~/components/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';
import { requireUserSession } from '~/lib/session-utils';
import { getUserFeed } from '~/services/articles';

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await requireUserSession(request);

  const { username } = params;

  const articlesResponse = await getUserFeed(user, username);
  const articles = await articlesResponse.json();

  return json(articles);
};

export default function FavoritesArticles() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articlesFeed={articles} />;
}
