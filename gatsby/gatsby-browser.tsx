import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

import { Layout } from './components/Layout';
import { FeedLayout } from './components/FeedLayout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => {
  console.log(props);
  if (['/', '/:tag', '/feed/'].includes(props.path)) {
    return (
      <Layout>
        <FeedLayout
          // @ts-ignore
          tags={props.serverData?.tags}
          // @ts-ignore
          selectedTag={props.serverData?.selectedTag}
          {...props}
        >
          {element}
        </FeedLayout>
      </Layout>
    );
  }

  return <Layout {...props}>{element}</Layout>;
};
