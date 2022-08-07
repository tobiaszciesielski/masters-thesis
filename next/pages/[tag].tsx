import { GetServerSideProps } from 'next';
import { ArticlesFeed } from '../components/ArticlesFeed';
import FeedLayout from '../components/FeedLayout';
import { getFeedByTag } from '../services/articles';
import { getAllTags } from '../services/tags';
import { withIronSessionSsr } from 'iron-session/next';

import { NextPageWithLayout } from './_app';
import { sessionOptions } from '../lib/session';


export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, query }) => {
    if (!query.tag) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const [{ articles }, { tags }] = await Promise.all([
      (await getFeedByTag(req.session.user, query.tag as string)).json(),
      (await getAllTags()).json(),
    ]);

    return {
      props: { tags, articles },
    };
  },
  sessionOptions
);

const FilteredTag: NextPageWithLayout = (props: any) => {
  return <ArticlesFeed articlesFeed={props.articles} user={props.user} />;
};

FilteredTag.getLayout = function getLayout(page) {
  return <FeedLayout tags={page.props.tags}>{page}</FeedLayout>;
};

export default FilteredTag;
