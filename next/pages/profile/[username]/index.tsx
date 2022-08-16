import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../../_app';
import { withIronSessionSsr } from 'iron-session/next';

import { ArticlesFeed } from '../../../components/ArticlesFeed';
import { getProfile } from '../../../services/profile';
import { getArticlesByAuthor } from '../../../services/articles';
import { sessionOptions } from '../../../lib/session';
import { ProfileLayout } from '../../../components/ProfileLayout';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, query }) => {
    const username = query.username as string;
    if (!username) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const authUser = req.session.user || null;

    const [profile, { articles }] = await Promise.all([
      (await getProfile(authUser, username)).json(),
      (await getArticlesByAuthor(authUser, username)).json(),
    ]);

    return {
      props: {
        profile,
        articles,
        user: authUser,
      },
    };
  },
  sessionOptions
);

const ProfileDetails: NextPageWithLayout = (props: any) => {
  return <ArticlesFeed articlesFeed={props.articles} user={props.user} />;
};

ProfileDetails.getLayout = function getLayout(page) {
  return <ProfileLayout userProfile={page.props.profile}>{page}</ProfileLayout>;
};

export default ProfileDetails;
