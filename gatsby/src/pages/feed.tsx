import React from 'react';
import { GetServerData, GetServerDataReturn, navigate } from 'gatsby';
import { ArticlesFeed } from '../../components/ArticlesFeed';
import { getUser } from '../../lib/session';
import { getFeedByTag } from '../../services/articles';
import { getAllTags } from '../../services/tags';

export const getServerData: GetServerData<any> = async (
  req
): GetServerDataReturn => {
  const user = await getUser(req);
  if (!user) {
    navigate('/login');
    return {}
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
  return (
    <ArticlesFeed articlesFeed={serverData?.articles} user={serverData?.user} />
  );
};

export default Index;
