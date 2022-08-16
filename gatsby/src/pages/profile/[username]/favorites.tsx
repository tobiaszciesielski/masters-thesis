import React from 'react';
import { ArticlesFeed } from '../../../../components/ArticlesFeed';
import { getProfile } from '../../../../services/profile';
import { getUserFeed } from '../../../../services/articles';
import { GetServerData } from 'gatsby';
import { getUser } from '../../../../lib/session';

export const getServerData: GetServerData<any> = async (req) => {
  const user = await getUser(req);
  if (!user) {
    return {
      status: 301,
      headers: {
        Location: '/login',
      },
    };
  }

  const username = req.params?.username as string;
  if (!username) {
    return {
      status: 301,
      headers: {
        Location: '/',
      },
    };
  }

  const [profile, { articles }] = await Promise.all([
    (await getProfile(user, username)).json(),
    (await getUserFeed(user, username)).json(),
  ]);
  if (!profile) {
    return {
      status: 301,
      headers: {
        Location: '/',
      },
    };
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
