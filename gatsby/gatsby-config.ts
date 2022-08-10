import type { GatsbyConfig } from 'gatsby';

import './types/types.d';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `gatsby`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  flags: {
    DEV_SSR: true,
  },
};

export default config;
