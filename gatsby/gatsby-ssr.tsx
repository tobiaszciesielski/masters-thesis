import React, { useEffect } from 'react';
import type { GatsbySSR } from 'gatsby';
import { UserProvider } from './context/user';
import { Layout } from './components/Layout';
import path from 'path';
import { FeedLayout } from './components/FeedLayout';

const headComponents = [
  <title>Conduit</title>,
  <meta name="description" content="Generated by create next app" />,
  <link
    rel="stylesheet"
    type="text/css"
    href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
  />,
  <link
    rel="stylesheet"
    type="text/css"
    href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
  />,
  <link rel="stylesheet" href="//demo.productionready.io/main.css" />,
  <link rel="icon" href="/favicon.ico" />,
];

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props,
}) => {
  if (['/', '/:tag', '/feed/'].includes(props.location.pathname)) {
    return (
      <Layout>
        {/* @ts-ignore */}
        <FeedLayout tags={props.serverData.tags}>{element}</FeedLayout>
      </Layout>
    );
  }

  return <Layout>{element}</Layout>;
};

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return <UserProvider user={null}>{element}</UserProvider>;
};

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents(headComponents);
};
