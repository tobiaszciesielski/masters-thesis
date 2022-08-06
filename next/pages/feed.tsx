import { GetServerSideProps } from 'next';
import FeedLayout from '../components/FeedLayout';
import { getAllTags } from '../services/tags';

import { NextPageWithLayout } from './_app';

import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../services/session';
import { User } from '../models/User';
import { ArticlesFeed } from '../components/ArticlesFeed';
import { getUserFeed } from '../services/articles';

interface FeedProps {
  tags: string[];
  user: User | null;
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    if (!req.session.user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const [feedsResponse, tagsResponse] = await Promise.all([
      getUserFeed(req.session.user),
      getAllTags(),
    ]);

    const [{ articles }, { tags }] = await Promise.all([
      feedsResponse.json(),
      tagsResponse.json(),
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
