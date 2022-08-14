import { json, redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';

import { ArticlesFeed } from '~/components/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';
import { getToken } from '~/lib/session-utils';
import { getFeedByTag } from '~/services/articles';

export const loader: LoaderFunction = async ({ request, params }) => {
  const token = await getToken(request);
  if (!params.tag) {
    throw redirect('/');
  }

  const articlesResponse = await getFeedByTag(token, params.tag);
  const articles = await articlesResponse.json();
  console.log(articles);

  return json<ArticlesResponse>(articles);
};

export default function FilteredTag() {
  const articles = useLoaderData<ArticlesResponse>().articles;

  return <ArticlesFeed articlesFeed={articles} />;
}
