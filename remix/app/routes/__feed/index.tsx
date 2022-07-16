import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import API_BASE from '~/services/api';
import { ArticlesFeed } from '~/components/ArticleFeed/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';

export const loader: LoaderFunction = async () => {
  return json(await fetch(`${API_BASE}/articles`).then((res) => res.json()));
};

export default function GlobalFeed() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articles={articles} />;
}
