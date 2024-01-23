import { FC } from 'react';

type Props = {
  title: string;
  comment: string;
};

export const Comment: FC<Props> = ({ title, comment }) => {
  return (
    <div>
      <div>{title}</div>
      <div>
        <blockquote>
          <i>{comment}</i>
        </blockquote>
      </div>
    </div>
  );
};
