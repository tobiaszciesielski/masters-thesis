import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

import { Layout } from './components/Layout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => {
  console.log();
  return <Layout>{element}</Layout>;
};
