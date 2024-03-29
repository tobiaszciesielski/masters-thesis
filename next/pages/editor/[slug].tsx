import { GetServerSideProps, NextPage } from 'next';
import { withIronSessionSsr } from 'iron-session/next';

import { ArticleEditor } from '../../components/AritcleEditor';
import { makeRequest } from '../../services/api';
import { sessionOptions } from '../../lib/session';

interface ArticleData {
  title?: string;
  body?: string;
  description?: string;
  tagList?: string[];
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, query }) => {
    if (!req.session.user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const slug = query.slug as string;
    if (!slug) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const response = await makeRequest(`/articles/${slug}`, 'GET', {});

    if (response.status !== 200) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const { article } = await response.json();

    return {
      props: { article, user: req.session.user },
    };
  },
  sessionOptions
);

const Editor: NextPage = (props: any) => {
  return <ArticleEditor article={props.article} />;
};

export default Editor;
