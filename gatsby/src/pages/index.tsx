import React from 'react';

import type { GetServerData } from 'gatsby';

interface RandomImage {
  message: string;
  status: any;
}

const Index = ({ serverData }: _PageProps<RandomImage>) => {
  console.log(serverData);

  return (
    <main>
      <h1>SSR Page with Dogs</h1>
      <img src={serverData.message} alt="" />
    </main>
  );
};

export default Index;

export const getServerData: GetServerData<RandomImage> = async () => {
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
