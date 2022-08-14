import { GetServerSideProps } from 'next';
import { withIronSessionSsr } from 'iron-session/next';

import FeedLayout from '../components/FeedLayout';
import { getAllTags } from '../services/tags';
import { NextPageWithLayout } from './_app';
import { getGlobalFeed } from '../services/articles';
import { ArticlesFeed } from '../components/ArticlesFeed';
import { sessionOptions } from '../lib/session';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req }) => {
    const user = req.session.user || null;

    const [{ articles }, { tags }] = await Promise.all([
      (await getGlobalFeed(user)).json(),
      (await getAllTags()).json(),
    ]);

    return {
      props: {
        tags,
        articles,
        user: user,
      },
    };
  },
  sessionOptions
);

const GlobalFeed: NextPageWithLayout = (props: any) => {
  return <ArticlesFeed articlesFeed={props.articles} user={props.user} />;
};

GlobalFeed.getLayout = function getLayout(page) {
  return <FeedLayout tags={page.props.tags}>{page}</FeedLayout>;
};

export default GlobalFeed;
