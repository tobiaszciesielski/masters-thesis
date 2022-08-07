import React from 'react';
import type { GetServerData } from 'gatsby';
import { FeedLayout } from '../../components/FeedLayout';
import { ArticlesFeed } from '../../components/ArticlesFeed';

interface RandomImage {
  message: string;
  status: any;
}

export const getServerData: GetServerData<RandomImage> = async ({}) => {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
    if (!res.ok) {
      throw new Error(`Response failed`);
    }

    return {
      props: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
    };
  }
};

export const Index = ({ serverData, ...props }: _PageProps<RandomImage>) => {
  return (
    <FeedLayout tags={[]}>
      <ArticlesFeed articlesFeed={[]} user={null} />
    </FeedLayout>
  );
};

export default Index;

// export { Head } from '../../components/Head';
