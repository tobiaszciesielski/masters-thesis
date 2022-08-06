import { GetServerSideProps } from 'next';

import FeedLayout from '../components/FeedLayout';
import { getAllTags } from '../services/tags';
import { NextPageWithLayout } from './_app';

import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../services/session';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const response = await getAllTags();
  const { tags } = await response.json();

  return {
    props: { tags },
  };
};

const GlobalFeed: NextPageWithLayout = (props) => {
  return <div>GlobalFeed</div>;
};

GlobalFeed.getLayout = function getLayout(page) {
  return <FeedLayout tags={page.props.tags}>{page}</FeedLayout>;
};

export default GlobalFeed;
