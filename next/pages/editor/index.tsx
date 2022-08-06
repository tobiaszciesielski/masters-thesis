import { GetServerSideProps, NextPage } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '../../services/session';
import ArticleEditor from '../../components/AritcleEditor';

interface ArticleData {
  title?: string;
  body?: string;
  description?: string;
  tagList?: string[];
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    if (!req.session.user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  },
  sessionOptions
);

const Editor: NextPage = () => {
  return <ArticleEditor />;
};

export default Editor;
