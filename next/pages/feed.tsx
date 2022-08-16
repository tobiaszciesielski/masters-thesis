import { GetServerSideProps } from 'next';
import { getAllTags } from '../services/tags';
import { NextPageWithLayout } from './_app';
import { withIronSessionSsr } from 'iron-session/next';
import { ArticlesFeed } from '../components/ArticlesFeed';
import { getUserFeed } from '../services/articles';
import { sessionOptions } from '../lib/session';
import { FeedLayout } from '../components/FeedLayout';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req }) => {
    if (!req.session.user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const [{ articles }, { tags }] = await Promise.all([
      (await getUserFeed(req.session.user)).json(),
      (await getAllTags()).json(),
    ]);

    return {
      props: {
        tags,
        articles,
        user: req.session.user,
      },
    };
  },
  sessionOptions
);

const Feed: NextPageWithLayout = (props: any) => {
  return <ArticlesFeed articlesFeed={props.articles} user={props.user} />;
};

Feed.getLayout = function getLayout(page) {
  return <FeedLayout tags={page.props.tags}>{page}</FeedLayout>;
};

export default Feed;
