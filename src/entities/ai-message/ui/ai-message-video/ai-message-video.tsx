import { type FC, memo } from 'react';

interface AIMessageVideoProps {
  content: string;
}

export const AIMessageVideo: FC<AIMessageVideoProps> = memo(({ content }) => {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video controls className="w-full mt-8 aspect-video rounded-lg border bg-black">
      <source src={content} />
    </video>
  );
});
