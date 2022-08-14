import React from 'react';
import { ArticlesFeed } from '../../../../components/ArticlesFeed';
import { getProfile } from '../../../../services/profile';
import { getArticlesByAuthor } from '../../../../services/articles';
import { GetServerData } from 'gatsby';
import { getUser } from '../../../../lib/session';

export const getServerData: GetServerData<any> = async (req) => {
  const username = req.params?.username as string;

  const authUser = await getUser(req);

  const [profile, { articles }] = await Promise.all([
    (await getProfile(authUser, username)).json(),
    (await getArticlesByAuthor(authUser, username)).json(),
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
      user: authUser,
    },
  };
};

const ProfileDetails = (props: _PageProps<any>) => {
  return (
    <ArticlesFeed
      articlesFeed={props.serverData?.articles}
      user={props.serverData?.user}
    />
  );
};

export default ProfileDetails;
