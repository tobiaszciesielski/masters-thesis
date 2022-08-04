import FeedLayout from '../components/FeedLayout';

import { NextPageWithLayout } from './_app';

const Feed: NextPageWithLayout = () => {
  return <div>Feed</div>;
};

Feed.getLayout = function getLayout(page) {
  return <FeedLayout>{page}</FeedLayout>;
};

export default Feed;
