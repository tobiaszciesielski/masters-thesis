import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

import { Layout } from './components/Layout';
import { FeedLayout } from './components/FeedLayout';
import { ProfileLayout } from './components/ProfileLayout';
import { UserProvider } from './context/user';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => {
  if (
    ['/profile/:username', '/profile/:username/favorites'].includes(props.path)
  ) {
    return (
      <Layout>
        <ProfileLayout
          // @ts-ignore
          userProfile={props.serverData?.profile}
          {...props}
        >
          {element}
        </ProfileLayout>
      </Layout>
    );
  }

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

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => {
  return <UserProvider user={null}>{element}</UserProvider>;
};
