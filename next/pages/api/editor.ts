import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { createArticle, updateArticle } from '../../services/article';

export default withIronSessionApiRoute(async (req, res) => {
  if (!req.session.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let formData = await req.body;

  const tagList = formData.tags.split(' ');
  formData = { ...formData, tagList };

  const slug = req.query.slug as string;
  let response: globalThis.Response;

  if (slug) {
    response = await updateArticle(req.session.user, slug, formData);
  } else {
    response = await createArticle(req.session.user, formData);
  }

  if (response.status !== 200) {
    res.json({ error: 'Please try again' });
    res.end();

    return;
  }

  const { article } = await response.json();

  return {
    article,
    redirect: {
      destination: `/articles/${article.slug}`,
      permanent: false,
    },
  };
}, sessionOptions);
