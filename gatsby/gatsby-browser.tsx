import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

import { Layout } from './components/Layout';
import { FeedLayout } from './components/FeedLayout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => {
  if (['/', '/:tag', '/feed/'].includes(props.path)) {
    return (
      <Layout>
        {/* @ts-ignore */}
        <FeedLayout tags={props.serverData.tags}>{element}</FeedLayout>
      </Layout>
    );
  }

  return <Layout>{element}</Layout>;
};
