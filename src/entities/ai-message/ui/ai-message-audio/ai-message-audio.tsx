import { type FC, memo } from 'react';

interface AIMessageAudioProps {
  content: string;
}

export const AIMessageAudio: FC<AIMessageAudioProps> = memo(({ content }) => {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio controls className="w-full mt-8">
      <source src={content} />
    </audio>
  );
});
