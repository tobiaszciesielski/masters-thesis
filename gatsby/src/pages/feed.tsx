import React from 'react';
import { GetServerData, GetServerDataReturn } from 'gatsby';
import { ArticlesFeed } from '../../components/ArticlesFeed';
import { getUser } from '../../lib/session';
import { getUserFeed } from '../../services/articles';
import { getAllTags } from '../../services/tags';

export const getServerData: GetServerData<any> = async (
  req
): GetServerDataReturn => {
  const user = await getUser(req);
  if (!user) {
    return {
      status: 301,
      headers: {
        Location: '/login',
      },
    };
  }

  const [{ articles }, { tags }] = await Promise.all([
    (await getUserFeed(user)).json(),
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
