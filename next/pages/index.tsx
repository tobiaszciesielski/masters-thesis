import { ReactElement } from 'react';
import FeedLayout from '../components/FeedLayout';

import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return <div>Global Feed</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <FeedLayout>{page}</FeedLayout>;
};

export default Home;
