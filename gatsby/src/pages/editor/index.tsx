import React from 'react';
import { ArticleEditor } from '../../../components/AritcleEditor';
import { GetServerData, GetServerDataReturn } from 'gatsby';
import { getUser } from '../../../lib/session';

interface ArticleData {
  title?: string;
  body?: string;
  description?: string;
  tagList?: string[];
}

export const getServerData: GetServerData<any> = async (
  req
): GetServerDataReturn => {
  const user = await getUser(req);
  if (!user) {
    return {
      status: 301,
      headers: {
        Location: '/login',
      },
    };
  }

  return {
    props: {},
  };
};

const Editor = () => {
  return <ArticleEditor />;
};

export default Editor;
