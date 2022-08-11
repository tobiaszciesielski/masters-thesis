import React from 'react';
import type { GetServerData } from 'gatsby';
import { ArticlesFeed } from '../../components/ArticlesFeed';
import { getUser } from '../../lib/session';
import { getGlobalFeed } from '../../services/articles';
import { getAllTags } from '../../services/tags';

export const getServerData: GetServerData<any> = async (req) => {
  const user = await getUser(req);

  const [{ articles }, { tags }] = await Promise.all([
    (await getGlobalFeed(user)).json(),
    (await getAllTags()).json(),
  ]);

  return {
    props: { user, articles, tags },
  };
};

export const Index = ({ serverData, ...props }: _PageProps<any>) => {
  return (
    <ArticlesFeed articlesFeed={serverData?.articles} user={serverData?.user} />
  );
};

export default Index;
