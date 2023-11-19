import { type FC, memo, useCallback } from 'react';
import Image from 'next/image';

import { Download } from 'lucide-react';
import { Card, CardFooter } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

interface AIMessageImageProps {
  content: string;
}

export const AIMessageImage: FC<AIMessageImageProps> = memo(({ content }) => {
  const onDownload = useCallback(() => {
    window.open(content);
  }, [content]);

  return (
    <Card className="rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image
          alt={content}
          src={content}
          fill
        />
      </div>
      <CardFooter className="p-2">
        <Button variant="secondary" className="w-full" onClick={onDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
});
