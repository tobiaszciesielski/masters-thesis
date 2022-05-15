export const PROFILE_SELECT = {
  username: true,
  bio: true,
  image: true,
  id: true,
};

export const USER_SELECT = {
  email: true,
  username: true,
  bio: true,
  image: true,
};

export const DETAILED_USER_SELECT = {
  email: true,
  username: true,
  bio: true,
  image: true,
  id: true,
  password: true,
};

export const ARTICLE_INCLUDE = {
  author: {
    select: USER_SELECT,
  },
  _count: {
    select: {
      favoritedBy: true,
    },
  },
  tagList: { select: { name: true } },
  favoritedBy: true,
};
