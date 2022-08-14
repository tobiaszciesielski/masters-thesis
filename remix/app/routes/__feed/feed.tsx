import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';

import { requireUserSession } from '~/lib/session-utils';
import { ArticlesFeed } from '~/components/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';
import { getUserFeed } from '~/services/articles';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUserSession(request);

  const articlesResponse = await getUserFeed(user);
  const articles = await articlesResponse.json();

  return json<ArticlesResponse>(articles);
};

export default function UserFeed() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articlesFeed={articles} />;
}
