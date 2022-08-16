import React from 'react';
import { GetServerData, GetServerDataReturn } from 'gatsby';
import { ArticlesFeed } from '../../components/ArticlesFeed';
import { getUser } from '../../lib/session';
import { getFeedByTag } from '../../services/articles';
import { getAllTags } from '../../services/tags';

export const getServerData: GetServerData<any> = async (
  req
): GetServerDataReturn => {
  const tagParam = req.params?.tag as string;
  if (!tagParam) {
    return {
      status: 301,
      headers: {
        Location: '/',
      },
    };
  }

  const user = await getUser(req);

  const [{ articles }, { tags }] = await Promise.all([
    (await getFeedByTag(user, tagParam)).json(),
    (await getAllTags()).json(),
  ]);

  return {
    props: { user, articles, tags, selectedTag: tagParam },
  };
};

export const FilteredTag = ({ serverData, ...props }: _PageProps<any>) => {
  return (
    <ArticlesFeed articlesFeed={serverData?.articles} user={serverData?.user} />
  );
};

export default FilteredTag;
