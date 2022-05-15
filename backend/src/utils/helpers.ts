export const createArticleSlug = (title: string, userId: number) => {
  return title.toLocaleLowerCase().replaceAll(' ', '-') + `-${userId}`;
};
