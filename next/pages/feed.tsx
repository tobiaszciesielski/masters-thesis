import { GetServerSideProps } from 'next';
import FeedLayout from '../components/FeedLayout';
import { getAllTags } from '../services/tags';

import { NextPageWithLayout } from './_app';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const response = await getAllTags();
  const { tags } = await response.json();

  return {
    props: { tags },
  };
};

const Feed: NextPageWithLayout = (props) => {
  return <div>Feed</div>;
};

Feed.getLayout = function getLayout(page) {
  return <FeedLayout tags={page.props.tags}>{page}</FeedLayout>;
};

export default Feed;
