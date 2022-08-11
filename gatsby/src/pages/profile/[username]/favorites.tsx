import React from 'react';
import { ArticlesFeed } from '../../../../components/ArticlesFeed';
import { getProfile } from '../../../../services/profile';
import { getUserFeed } from '../../../../services/articles';
import { GetServerData, navigate } from 'gatsby';
import { getUser } from '../../../../lib/session';

export const getServerData: GetServerData<any> = async (req) => {
  const user = await getUser(req);
  if (!user) {
    navigate('/login');
    return {};
  }

  const username = req.params?.username as string;
  if (!username) {
    navigate('/');
    return {};
  }

  const [profile, { articles }] = await Promise.all([
    (await getProfile(user, username)).json(),
    (await getUserFeed(user, username)).json(),
  ]);
  if (!profile) {
    navigate('/');
    return {};
  }

  return {
    props: {
      profile,
      articles,
      user: user,
    },
  };
};

const FavoritesArticles = (props: _PageProps<any>) => {
  return (
    <ArticlesFeed
      articlesFeed={props.serverData?.articles}
      user={props.serverData?.user}
    />
  );
};

export default FavoritesArticles;
