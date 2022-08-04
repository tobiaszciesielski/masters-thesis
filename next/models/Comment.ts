import type { User } from './User';

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: User;
}
