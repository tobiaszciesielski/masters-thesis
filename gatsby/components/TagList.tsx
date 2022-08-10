import React from 'react';

export interface TagListProps {
  tags: string[];
}

export const TagList = ({ tags }: TagListProps) => {
  return (
    <ul className="tag-list">
      {tags?.map((tag: string, i: number) => (
        <li
          key={i}
          className="tag-default tag-pill tag-outline ng-binding ng-scope"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};
