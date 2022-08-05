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

const FilteredTag: NextPageWithLayout = () => {
  return <div>Tag</div>;
};

FilteredTag.getLayout = function getLayout(page) {
  return <FeedLayout tags={page.props.tags}>{page}</FeedLayout>;
};

export default FilteredTag;
