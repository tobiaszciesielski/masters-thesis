import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { getApiRouteUser, getUser } from '../../lib/session';
import { createArticle, updateArticle } from '../../services/article';

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const authUser = await getApiRouteUser(req);
  if (!authUser) {
    return {
      status: 301,
      headers: {
        Location: '/login',
      },
    };
  }
  let formData = await req.body;

  const tagList = formData.tags.split(' ');
  formData = { ...formData, tagList };

  const slug = req.query.slug as string;
  let response: globalThis.Response;

  if (slug) {
    response = await updateArticle(authUser, slug, formData);
  } else {
    response = await createArticle(authUser, formData);
  }

  if (response.status !== 200) {
    res.json({ error: 'Please try again' });
    res.end();

    return;
  }

  const { article } = await response.json();

  res.status(200);
  res.json(article);
  res.end();
}
