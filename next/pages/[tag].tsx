import FeedLayout from '../components/FeedLayout';
import { NextPageWithLayout } from './_app';

const FilteredTag: NextPageWithLayout = () => {
  return <div>Tag</div>;
};

FilteredTag.getLayout = function getLayout(page) {
  return <FeedLayout>{page}</FeedLayout>;
};

export default FilteredTag;
