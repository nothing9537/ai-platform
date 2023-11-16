/* eslint-disable react/no-unstable-nested-components */
import { type FC, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { BotAvatar } from '@/shared/ui/bot-avatar';

interface AIMessageCodeProps {
  content: string;
}

export const AIMessageCode: FC<AIMessageCodeProps> = memo(({ content }) => {
  return (
    <div className="p-8 w-full flex items-start gap-x-8 rounded-lg border border-black/10 dark:border-muted">
      <BotAvatar />
      <ReactMarkdown
        components={{
          pre: ({ node, ...props }) => (
            <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
              <pre {...props} />
            </div>
          ),
          code: ({ node, ...props }) => (
            <code className="bg-black/10 rounded-lg p-1" {...props} />
          ),
        }}
        className="text-sm overflow-hidden leading-7"
      >
        {content || ''}
      </ReactMarkdown>
    </div>
  );
});
