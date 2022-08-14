import React from 'react';
import { getUser } from '../../../lib/session';
import { GetServerData, GetServerDataReturn, navigate } from 'gatsby';
import { makeRequest } from '../../../services/api';
import { ArticleEditor } from '../../../components/AritcleEditor';

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
    navigate('/');
    return {};
  }

  const slug = req.params?.slug as string;
  if (!slug) {
    navigate('/');
    return {};
  }

  const response = await makeRequest(`/articles/${slug}`, 'GET', {});

  if (response.status !== 200) {
    navigate('/');
    return {};
  }

  const { article } = await response.json();

  return {
    props: { article, user },
  };
};

const Editor = (props: _PageProps<any>) => {
  return <ArticleEditor article={props.serverData?.article} />;
};

export default Editor;
