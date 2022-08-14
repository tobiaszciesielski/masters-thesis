import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ArticlesFeed } from '~/components/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';
import { getUser } from '~/lib/session-utils';
import { getGlobalFeed } from '~/services/articles';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  const articlesResponse = await getGlobalFeed(user);
  const articles = await articlesResponse.json();

  return json<ArticlesResponse>(articles);
};

export default function GlobalFeed() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articlesFeed={articles} />;
}
