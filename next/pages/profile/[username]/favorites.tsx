import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../../_app';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../../../services/session';
import { ArticlesFeed } from '../../../components/ArticlesFeed';
import ProfileLayout from '../../../components/ProfileLayout';
import { getProfile } from '../../../services/profile';
import { getUserFeed } from '../../../services/articles';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, query }) => {
    if (!req.session.user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const username = query.username as string;
    if (!username) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const [profile, { articles }] = await Promise.all([
      (await getProfile(req.session.user, username)).json(),
      (await getUserFeed(req.session.user, username)).json(),
    ]);

    return {
      props: {
        profile,
        articles,
        user: req.session.user,
      },
    };
  },
  sessionOptions
);

const FavoritesArticles: NextPageWithLayout = (props: any) => {
  return <ArticlesFeed articlesFeed={props.articles} user={props.user} />;
};

FavoritesArticles.getLayout = function getLayout(page) {
  return <ProfileLayout userProfile={page.props.profile}>{page}</ProfileLayout>;
};

export default FavoritesArticles;
