import React from 'react';
import type { GetServerData, GetServerDataReturn } from 'gatsby';
import { ArticlesFeed } from '../../components/ArticlesFeed';
import { getUser } from '../../lib/session';
import { getFeedByTag } from '../../services/articles';
import { getAllTags } from '../../services/tags';

export const getServerData: GetServerData<any> = async (
  req
): GetServerDataReturn => {
  const user = await getUser(req);
  if (!user) {
    return {
      headers: {
        Location: '/login',
      },
    };
  }

  const tagParam = req.params?.tag as string;

  const [{ articles }, { tags }] = await Promise.all([
    (await getFeedByTag(user, tagParam)).json(),
    (await getAllTags()).json(),
  ]);

  return {
    props: { user, articles, tags },
  };
};

export const Index = ({ serverData, ...props }: _PageProps<any>) => {
  const { user, articles } = serverData;

  return <ArticlesFeed articlesFeed={articles} user={user} />;
};

export default Index;
