import { json, redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';

import { ArticlesFeed } from '~/components/ArticlesFeed';
import type { ArticlesResponse } from '~/models/Article';
import { getUser } from '~/lib/session-utils';
import { getArticlesByAuthor } from '~/services/articles';

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUser(request);
  if (!params.username) {
    throw redirect('/');
  }

  const articlesResponse = await getArticlesByAuthor(user, params.username);
  const articles = await articlesResponse.json();

  return json(articles);
};

export default function UserArticles() {
  const { articles } = useLoaderData<ArticlesResponse>();

  return <ArticlesFeed articlesFeed={articles} />;
}
